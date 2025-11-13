import { useCallback, useEffect, useRef, useState } from 'react';
import { getLectureInfitService } from '../../services/lecture/getLectureInfitService.js';

export function useInfiniteLecture({
  category,
  sort,
  pageSize = 20,
  root = null,
  rootMargin = '600px',
  threshold = 0,
  withCount = false,
}) {
  const [items, setItems] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(undefined);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  const paramsRef = useRef({ category, sort });
  const isFirstLoadRef = useRef(true); // 첫 로드 추적

  // 카테고리/정렬 바뀌면 리셋
  useEffect(() => {
    paramsRef.current = { category, sort };
    setItems([]);
    setLastDoc(null);
    setHasMore(true);
    setError(null);
    setTotal(undefined);
    isFirstLoadRef.current = true; // 리셋 시 첫 로드 플래그도 초기화
  }, [category, sort]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const res = await getLectureInfitService({
        category: paramsRef.current.category,
        sort: paramsRef.current.sort,
        limitCount: pageSize,
        startAfterDoc: lastDoc,
        withCount: lastDoc ? false : withCount,
      });

      // race 방지
      if (paramsRef.current.category !== category || paramsRef.current.sort !== sort) {
        return;
      }

      setItems((prev) => {
        const seen = new Set(prev.map((x) => x.lectureId));
        const next = res.lectures.filter((x) => !seen.has(x.lectureId));
        return prev.concat(next);
      });

      if (withCount && res.total !== undefined && total === undefined) {
        setTotal(res.total);
      }

      setLastDoc(res.lastDoc);
      setHasMore(res.hasMore);
    } catch (e) {
      console.error('getLectureInfitService 에러:', e); //  에러 로깅 추가
      setError(e);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [category, sort, pageSize, lastDoc, hasMore, withCount, total]);

  // ✅ 첫 로드만 실행
  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      loadMore();
    }
  }, [category, sort]); //  loadMore 제거

  //  IntersectionObserver - loadMore를 의존성에서 제거하고 ref 사용
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    // ✅ loadMore를 직접 참조하지 않고 조건만 체크
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current && hasMore) {
          // ✅ loadMore를 직접 호출
          loadMore();
        }
      },
      { root, rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [root, rootMargin, threshold, hasMore, loadMore]); // isLoading 대신 hasMore 사용

  const retry = useCallback(() => {
    if (!loadingRef.current) {
      loadMore();
    }
  }, [loadMore]);

  return { items, isLoading, error, hasMore, setItems, loadMore, retry, total, sentinelRef };
}
