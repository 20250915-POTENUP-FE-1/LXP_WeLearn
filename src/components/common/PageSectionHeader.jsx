import React from 'react';

const PageSectionHeader = ({ title, subTitle }) => {
  return (
    <section className="page-title min-w-7xl py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-base text-gray-600">{subTitle}</p>
      </div>
    </section>
  );
};

export default PageSectionHeader;
