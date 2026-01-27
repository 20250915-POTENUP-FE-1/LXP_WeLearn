import { ToastContainer, TypeOptions } from 'react-toastify'
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react'

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      // 컨테이너 z-index/간격 (필요시)
      className="z-9999"
      // 토스트 박스
      // toastClassName={(ctx) =>
      //   clsx(
      //     ctx?.defaultClassName, // ← 기본 동작 유지(필수)
      //     baseToastClass,
      //     contextClass[ctx?.type || 'default'],
      //   )
      // }
      // 토스트 내부(텍스트) 레이아웃 보정
      // bodyClassName={(ctx: ToastFnContext | undefined) =>
      //   clsx(ctx?.defaultClassName, 'flex items-center gap-2')
      // }
      // 프로그레스바: 기본 CSS가 없으므로 직접 스타일 부여
      // progressClassName={(ctx) =>
      //   clsx(
      //     ctx?.defaultClassName,
      //     'h-1 rounded-b-md opacity-90 transition-all duration-300 ease-linear', // ← width 전환
      //     {
      //       'bg-red-200': ctx?.type === 'error',
      //       'bg-green-200': ctx?.type === 'success',
      //       'bg-black': ctx?.type === 'info',
      //       'bg-amber-200': ctx?.type === 'warning',
      //       'bg-indigo-200': !ctx?.type || ctx?.type === 'default',
      //     },
      //   )
      // }
      // icon={({ type }) => iconByType(type)}
    />
  )
}

/** 타입별 배경/텍스트/보더 */
const contextClass = {
  success: 'bg-blue-600 text-white border-blue-300',
  error: 'bg-red-600 text-white border-red-300',
  info: 'bg-white text-black border-black',
  warning: 'bg-orange-400 text-black border-amber-200',
  default: 'bg-indigo-600 text-white border-indigo-300',
}

/** 공통 베이스 */
const baseToastClass = 'min-w-56 gap-2 border rounded-md flex items-center p-5 shadow-lg'

/** 타입별 아이콘 */
const iconByType = (type: TypeOptions) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="size-5 text-green-200" />
    case 'error':
      return <XCircle className="size-5 text-red-200" />
    case 'warning':
      return <AlertTriangle className="size-5 text-amber-200" />
    default:
      return <Info className="size-5 text-black" />
  }
}
