import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import CategoryBox from '../ui/CategoryBox.jsx';
import SortOption from '../ui/SortOption.jsx';

function Categories({ direction = 'auto' }) {
  const [sortOptions, setSortOption] = useState({
    category: 'all',
    sort: 'latest',
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    sortOptions.category
      ? newParams.set('category', sortOptions.category)
      : newParams.delete('category');
    sortOptions.sort ? newParams.set('sort', sortOptions.sort) : newParams.delete('sort');
    setSearchParams(newParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOptions]);

  // direction에 따른 유틸 클래스
  const stackClass = (() => {
    switch (direction) {
      case 'row':
        return 'flex-row items-center justify-between';
      case 'column':
        return 'flex-col gap-4';
      case 'auto':
      default:
        // 기본(모바일): 세로, sm 이상: 가로 정렬
        return 'flex-col gap-4 sm:flex-row sm:items-center sm:justify-between';
    }
  })();

  // 각 박스 폭 (가로일 땐 좌우로, 세로일 땐 풀폭)
  const itemClass = classNames(
    'w-full',
    direction === 'row' ? 'sm:w-auto' : '',
    direction === 'auto' ? 'sm:w-auto' : '',
  );

  return (
    <section className="filter-section py-4">
      <div className="filter-section__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={classNames('flex', stackClass)}>
          <div className={itemClass}>
            <CategoryBox sortOptions={sortOptions} setSortOption={setSortOption} />
          </div>
          <div className={itemClass}>
            <SortOption sortOptions={sortOptions} setSortOption={setSortOption} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
