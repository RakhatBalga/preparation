import type { FormEvent } from 'react'
import type { DoctorInput } from '../../../entities/doctor/model/types'

const inputClass =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'

const labelClass = 'text-sm font-semibold text-slate-700'

type CreateDoctorFormProps = {
  form: DoctorInput
  isDisabled: boolean
  onChange: (form: DoctorInput) => void
  onSubmit: () => Promise<void>
}

export function CreateDoctorForm({
  form,
  isDisabled,
  onChange,
  onSubmit,
}: CreateDoctorFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form
      className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
            POST
          </span>
          <h2 className="mt-3 text-lg font-bold text-slate-950">
            Create doctor
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Add a new doctor to the in-memory directory.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={labelClass} htmlFor="create-name">
            Name
          </label>
          <input
            className={inputClass}
            id="create-name"
            value={form.name}
            onChange={(event) => onChange({ ...form, name: event.target.value })}
            placeholder="Dr. Sara Novak"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor="create-specialization">
            Specialization
          </label>
          <input
            className={inputClass}
            id="create-specialization"
            value={form.specialization}
            onChange={(event) =>
              onChange({ ...form, specialization: event.target.value })
            }
            placeholder="Neurology"
          />
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        Name and specialization must contain at least 2 characters.
      </p>
      <button
        className="mt-5 h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        disabled={isDisabled}
        type="submit"
      >
        Create doctor
      </button>
    </form>
  )
}
