import { Button } from '@/components/ui/Button'

interface EditCommentFormProps {
  action: (formData: FormData) => void
  defaultValue: string
  onCancel: () => void
  children?: React.ReactNode // hidden inputs slot
}

export default function EditCommentForm({
  action,
  defaultValue,
  onCancel,
  children,
}: EditCommentFormProps) {
  return (
    <form className="my-2 flex flex-col gap-2" action={action}>
      {/* hidden inputs */}
      {children}

      <input
        type="text"
        name="comment"
        defaultValue={defaultValue}
        autoComplete="off"
        placeholder="답글을 입력하세요..."
        className="w-full rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
      />

      <div className="flex justify-end gap-1">
        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" variant="accent" className="rounded-full">
          등록
        </Button>
      </div>
    </form>
  )
}
