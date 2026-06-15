import type { Doctor } from '../../../entities/doctor/model/types'
import { getDoctorInitials } from '../model/getDoctorInitials'

type SelectedDoctorDetailsProps = {
  doctor: Doctor | null
  lastAction: string
}

export function SelectedDoctorDetails({
  doctor,
  lastAction,
}: SelectedDoctorDetailsProps) {
  return (
    <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Selected Doctor Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Focused record for quick updates.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
          Active
        </span>
      </div>

      {doctor ? (
        <div className="mt-6 space-y-5">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-base font-black text-white shadow-md shadow-indigo-100">
              {getDoctorInitials(doctor.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-slate-950">
                {doctor.name}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Doctor ID #{doctor.id}
              </p>
            </div>
          </div>

          <dl className="grid gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold text-slate-500">Name</dt>
              <dd className="mt-1 text-sm font-bold text-slate-900">
                {doctor.name}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold text-slate-500">
                Specialization
              </dt>
              <dd className="mt-2">
                <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                  {doctor.specialization}
                </span>
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-xs font-semibold text-slate-500">
                Last action
              </dt>
              <dd className="mt-1 text-sm font-bold text-slate-900">
                {lastAction}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No doctor selected
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Select a doctor from the directory to view details.
          </p>
        </div>
      )}
    </section>
  )
}
