import type { FormEvent } from 'react'

type DoctorSearchProps = {
  value: string
  onChange: (value: string) => void
  onRefresh: () => Promise<void>
  onSubmit: () => Promise<void>
}

export function DoctorSearch({
  value,
  onChange,
  onRefresh,
  onSubmit,
}: DoctorSearchProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)]"
      onSubmit={handleSubmit}
    >
      <label
        className="mb-2 block text-sm font-semibold text-slate-700"
        htmlFor="search"
      >
        Search specialization
      </label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <input
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          id="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Oncology"
        />
        <button
          className="h-11 rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100"
          type="submit"
        >
          Search
        </button>
        <button
          type="button"
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          onClick={() => {
            void onRefresh()
          }}
        >
          Refresh
        </button>
      </div>
    </form>
  )
}
