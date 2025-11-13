import React from 'react';
const STATUS_STYLES = {
  active: {
    text: '수강 중',
    className: 'bg-indigo-50 text-indigo-700',
  },
  completed: {
    text: '수료',
    className: 'bg-green-50 text-green-700',
  },
  cancelled: {
    text: '취소됨',
    className: 'bg-red-50 text-red-700',
  },
  expired: {
    text: '만료됨',
    className: 'bg-gray-50 text-gray-600',
  },
  paused: {
    text: '일시 중지',
    className: 'bg-yellow-50 text-yellow-700',
  },
};

const StatusTag = ({ status }) => {
  const statusInfo = STATUS_STYLES[status] ?? {
    text: status ?? '',
    className: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusInfo.className}`}>
      {statusInfo.text}
    </span>
  );
};

export default StatusTag;
