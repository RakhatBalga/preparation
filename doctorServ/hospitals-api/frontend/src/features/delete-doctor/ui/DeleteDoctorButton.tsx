type DeleteDoctorButtonProps = {
  doctorId: number
  isDisabled?: boolean
  onDelete: (doctorId: number) => void
}

export function DeleteDoctorButton({
  doctorId,
  isDisabled = false,
  onDelete,
}: DeleteDoctorButtonProps) {
  return (
    <button
      type="button"
      className="rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 active:translate-y-0 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:translate-y-0 disabled:hover:bg-white focus:outline-none focus:ring-4 focus:ring-rose-100"
      disabled={isDisabled}
      onClick={() => {
        onDelete(doctorId)
      }}
    >
      Delete
    </button>
  )
}
