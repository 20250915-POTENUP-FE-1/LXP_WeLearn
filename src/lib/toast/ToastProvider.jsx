import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="light"
      toastClassName={toastClassName}
      progressClassName={progressClassName}
      icon={({ type }) => iconByType(type)}
    />
  );
}

/** 타입별 배경/텍스트/보더 */
const contextClass = {
  success: 'bg-blue-600 text-white border-blue-300',
  error: 'bg-red-600 text-white border-red-300',
  info: 'bg-white text-black border-black',
  warning: 'bg-orange-400 text-black border-amber-200',
  default: 'bg-indigo-600 text-white border-indigo-300',
};

/** 공통 베이스 클래스 */
const baseToastClass = 'min-w-56 gap-2 border rounded-md flex items-center p-5 shadow-lg';

/** 토스트 박스 클래스 (ToastContainer.toastClassName에 그대로 전달) */
const toastClassName = (ctx) => classNames(baseToastClass, contextClass[ctx?.type || 'default']);

/** 진행바 클래스 (ToastContainer.progressClassName에 전달) */
const progressClassName = (ctx) =>
  classNames('Toastify__progress-bar', {
    'bg-red-200': ctx?.type === 'error',
    'bg-green-200': ctx?.type === 'success',
    'bg-black': ctx?.type === 'info',
    'bg-amber-200': ctx?.type === 'warning',
  });

/** 타입별 아이콘 (ToastContainer.icon에 함수로 전달) */
const iconByType = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="size-5 text-green-200" />;
    case 'error':
      return <XCircle className="size-5 text-red-200" />;
    case 'warning':
      return <AlertTriangle className="size-5 text-amber-200" />;
    default:
      return <Info className="size-5 text-black" />;
  }
};
