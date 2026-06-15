import type { FormEvent } from 'react'
import type { DoctorInput } from '../../../entities/doctor/model/types'

const inputClass =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'

const labelClass = 'text-sm font-semibold text-slate-700'

type UpdateDoctorFormProps = {
  doctorId: number
  form: DoctorInput
  isDisabled: boolean
  onDoctorIdChange: (doctorId: number) => void
  onChange: (form: DoctorInput) => void
  onSubmit: () => Promise<void>
}

export function UpdateDoctorForm({
  doctorId,
  form,
  isDisabled,
  onDoctorIdChange,
  onChange,
  onSubmit,
}: UpdateDoctorFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={labelClass} htmlFor="put-id">
            Doctor ID
          </label>
          <input
            className={inputClass}
            id="put-id"
            min="1"
            type="number"
            value={doctorId}
            onChange={(event) => onDoctorIdChange(Number(event.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor="put-name">
            Name
          </label>
          <input
            className={inputClass}
            id="put-name"
            value={form.name}
            onChange={(event) => onChange({ ...form, name: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor="put-specialization">
            Specialization
          </label>
          <input
            className={inputClass}
            id="put-specialization"
            value={form.specialization}
            onChange={(event) =>
              onChange({ ...form, specialization: event.target.value })
            }
          />
        </div>
      </div>
      <p className="text-xs leading-5 text-slate-500">
        PUT requires the full doctor payload: name and specialization.
      </p>
      <button
        className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        disabled={isDisabled}
        type="submit"
      >
        Save full update
      </button>
    </form>
  )
}
