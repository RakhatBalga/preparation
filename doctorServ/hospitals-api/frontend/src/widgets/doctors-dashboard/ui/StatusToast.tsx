type StatusToastProps = {
  message: string
  onDismiss: () => void
}

export function StatusToast({ message, onDismiss }: StatusToastProps) {
  if (!message) {
    return null
  }

  return (
    <div className="fixed right-4 top-4 z-40 w-[calc(100%-32px)] max-w-sm rounded-2xl border border-emerald-100 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.16)] sm:right-6 sm:top-6">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-950">Success</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{message}</p>
        </div>
        <button
          className="rounded-full px-2 py-1 text-sm font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100"
          type="button"
          onClick={onDismiss}
        >
          Close
        </button>
      </div>
    </div>
  )
}
