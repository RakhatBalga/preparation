import type { FormEvent } from 'react'
import type { PatchField } from '../model/types'

const inputClass =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'

const labelClass = 'text-sm font-semibold text-slate-700'

type PatchDoctorFormProps = {
  doctorId: number
  field: PatchField
  value: string
  isDisabled: boolean
  onDoctorIdChange: (doctorId: number) => void
  onFieldChange: (field: PatchField) => void
  onValueChange: (value: string) => void
  onSubmit: () => Promise<void>
}

export function PatchDoctorForm({
  doctorId,
  field,
  value,
  isDisabled,
  onDoctorIdChange,
  onFieldChange,
  onValueChange,
  onSubmit,
}: PatchDoctorFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={labelClass} htmlFor="patch-id">
            Doctor ID
          </label>
          <input
            className={inputClass}
            id="patch-id"
            min="1"
            type="number"
            value={doctorId}
            onChange={(event) => onDoctorIdChange(Number(event.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor="patch-field">
            Field
          </label>
          <select
            className={inputClass}
            id="patch-field"
            value={field}
            onChange={(event) => onFieldChange(event.target.value as PatchField)}
          >
            <option value="specialization">specialization</option>
            <option value="name">name</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor="patch-value">
            New value
          </label>
          <input
            className={inputClass}
            id="patch-value"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            placeholder={field === 'name' ? 'Dr. Aida Karimova' : 'Cardiology'}
          />
        </div>
      </div>
      <p className="text-xs leading-5 text-slate-500">
        PATCH changes only the selected field and keeps the rest untouched.
      </p>
      <button
        className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        disabled={isDisabled}
        type="submit"
      >
        Apply patch
      </button>
    </form>
  )
}
