import { useCallback, useEffect, useRef, useState } from 'react';

export function useInfiniteList({
  category,
  sort,
  fetcher,
  pageSize = 20,
  root = null,
  rootMargin = '600px',
  threshold = 0,
  withCount = false,
  enabled = false,
}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreState, setHasMoreState] = useState(true); // UI 표시용

  const sentinelRef = useRef(null);

  // 최신 값 저장용 ref들 (Observer 콜백에서 사용)
  const fetcherRef = useRef(fetcher);
  const paramsRef = useRef({ category, sort, pageSize, withCount });
  const lastDocRef = useRef(null);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const didInitRef = useRef(false);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);
  useEffect(() => {
    paramsRef.current = { category, sort, pageSize, withCount };
  }, [category, sort, pageSize, withCount]);

  // 카테고리/정렬 바뀌면 초기화
  useEffect(() => {
    if (!enabled) return;
    setItems([]);
    setError(null);
    setTotal(undefined);
    setHasMoreState(true);
    lastDocRef.current = null;
    hasMoreRef.current = true;
  }, [enabled, category, sort]);

  const loadMore = useCallback(async () => {
    if (!enabled) return;
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const { category, sort, pageSize, withCount } = paramsRef.current;
      const res = await fetcherRef.current({
        category,
        sort,
        limitCount: pageSize,
        startAfterDoc: lastDocRef.current,
        withCount: lastDocRef.current ? false : withCount,
      });

      setItems((prev) => {
        const seen = new Set(prev.map((x) => x.lectureId ?? x.id));
        const next = (res.lectures ?? res.items ?? []).filter(
          (x) => !seen.has(x.lectureId ?? x.id),
        );
        return prev.concat(next);
      });

      if (res.total !== undefined && total === undefined) setTotal(res.total);

      lastDocRef.current = res.lastDoc ?? lastDocRef.current;
      hasMoreRef.current = !!res.hasMore;
      setHasMoreState(!!res.hasMore);
    } catch (e) {
      setError(e);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [enabled, total]); // ✅ 최소 의존성

  // 개발모드 StrictMode의 초기 2회 호출 방지
  useEffect(() => {
    if (!enabled) return;
    if (didInitRef.current) return;
    didInitRef.current = true;
    loadMore();
  }, [enabled, loadMore]);

  // IntersectionObserver — 재등록 최소화(상태 의존 X, ref들로 가드)
  useEffect(() => {
    if (!enabled) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loadingRef.current || !hasMoreRef.current) return;
        loadMore();
      },
      { root, rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [enabled, root, rootMargin, threshold, loadMore]);

  const retry = useCallback(() => {
    if (!isLoading) loadMore();
  }, [isLoading, loadMore]);

  return {
    items,
    isLoading,
    error,
    hasMore: hasMoreState,
    total,
    sentinelRef,
    loadMore,
    retry,
    setItems,
  };
}
