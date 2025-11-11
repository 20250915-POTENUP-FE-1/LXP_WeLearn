import React from 'react';

const PageSectionHeader = ({ title, subTitle }) => {
  return (
    <section className="page-title w-full py-6 sm:py-8 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 sm:text-left lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">{title}</h1>
        <p className="text-sm text-gray-600 sm:text-base md:text-lg">{subTitle}</p>
      </div>
    </section>
  );
};

export default PageSectionHeader;
