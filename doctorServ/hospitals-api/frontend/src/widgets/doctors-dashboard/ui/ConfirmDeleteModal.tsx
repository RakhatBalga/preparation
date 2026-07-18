import type { Doctor } from '../../../entities/doctor/model/types'

type ConfirmDeleteModalProps = {
  doctor: Doctor | null
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => Promise<void>
}

export function ConfirmDeleteModal({
  doctor,
  isDeleting,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!doctor) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_24px_90px_rgba(15,23,42,0.24)]">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-lg font-black text-rose-600 ring-1 ring-rose-100">
            !
          </span>
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Delete doctor?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will remove <strong>{doctor.name}</strong> from the current
              in-memory doctors list.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
            disabled={isDeleting}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="h-11 rounded-xl bg-rose-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-rose-100"
            disabled={isDeleting}
            type="button"
            onClick={() => {
              void onConfirm()
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete doctor'}
          </button>
        </div>
      </div>
    </div>
  )
}
