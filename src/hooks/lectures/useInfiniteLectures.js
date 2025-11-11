import { useCallback, useEffect, useRef, useState } from 'react';
import { getLectureInfitService } from '../../services/lecture/getLectureInfitService.js';

export function useInfiniteLectures({
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
  const loadingRef = useRef(false); // 중복 로딩 방지
  const paramsRef = useRef({ category, sort }); // 의도치 않은 race 방지용

  // 카테고리/정렬 바뀌면 리셋
  useEffect(() => {
    paramsRef.current = { category, sort };
    setItems([]);
    setLastDoc(null);
    setHasMore(true);
    setError(null);
    setTotal(undefined);
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
        withCount: lastDoc ? false : withCount, // 첫 페이지에서만 카운트 (옵션)
      });

      // race 방지: 응답 시점에 파라미터가 변했는지 체크(선택)
      if (paramsRef.current.category !== category || paramsRef.current.sort !== sort) {
        // 바뀐 경우 이 응답은 무시
        return;
      }

      setItems((prev) => {
        // Firestore는 중복 거의 없지만 안전하게 id로 dedupe
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
      setError(e);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [category, sort, pageSize, lastDoc, hasMore, withCount, total]);

  // 첫 로드 + 센티넬 관찰
  useEffect(() => {
    // 첫 페이지 로드
    loadMore();
  }, [category, sort]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          loadMore();
        }
      },
      { root, rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [root, rootMargin, threshold, isLoading, hasMore, loadMore]);

  const retry = useCallback(() => {
    if (!isLoading) {
      loadMore();
    }
  }, [isLoading, loadMore]);

  return { items, isLoading, error, hasMore, loadMore, retry, total, sentinelRef };
}
