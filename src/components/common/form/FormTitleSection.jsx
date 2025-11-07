import React from 'react';

const FormTitleSection = (props) => {
  const { title, subTitle } = props;
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-base text-gray-600">{subTitle}</p>
    </div>
  );
};

export default FormTitleSection;
