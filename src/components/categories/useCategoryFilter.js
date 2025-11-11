import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useCategoryFilters(defaults = { category: 'all', sort: 'latest' }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL → 상태 초기화
  const [filters, setFilters] = useState(() => ({
    category: searchParams.get('category') || defaults.category,
    sort: searchParams.get('sort') || defaults.sort,
  }));

  // 상태 → URL 반영
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (filters.category) next.set('category', filters.category);
    else next.delete('category');

    if (filters.sort) next.set('sort', filters.sort);
    else next.delete('sort');

    setSearchParams(next, { replace: true });
    // 의도적으로 searchParams를 의존성에서 제외(루프 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.sort, setSearchParams]);

  // URL 변화(뒤로가기 등) → 상태 갱신
  useEffect(() => {
    const urlFilters = {
      category: searchParams.get('category') || defaults.category,
      sort: searchParams.get('sort') || defaults.sort,
    };
    setFilters((prev) =>
      prev.category === urlFilters.category && prev.sort === urlFilters.sort ? prev : urlFilters,
    );
  }, [searchParams, defaults.category, defaults.sort]);

  // 외부에서 쓰기 편한 API
  const actions = useMemo(
    () => ({
      setFilters,
      setCategory: (category) => setFilters((prev) => ({ ...prev, category })),
      setSort: (sort) => setFilters((prev) => ({ ...prev, sort })),
      setSortOption: (
        partial, // 기존 컴포넌트 호환용
      ) =>
        setFilters((prev) => ({
          ...prev,
          ...(typeof partial === 'function' ? partial(prev) : partial),
        })),
    }),
    [],
  );

  return { filters, ...actions };
}
