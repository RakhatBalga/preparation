import { DeleteDoctorButton } from '../../../features/delete-doctor/ui/DeleteDoctorButton'
import type { Doctor } from '../../../entities/doctor/model/types'
import { getDoctorInitials } from '../model/getDoctorInitials'

type DoctorsTableProps = {
  doctors: Doctor[]
  isMutating: boolean
  onEditDoctor: (doctor: Doctor) => void
  onRequestDelete: (doctorId: number) => void
  onSelectDoctor: (doctor: Doctor) => void
}

export function DoctorsTable({
  doctors,
  isMutating,
  onEditDoctor,
  onRequestDelete,
  onSelectDoctor,
}: DoctorsTableProps) {
  return (
    <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">Doctors Table</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Primary data view for current API records.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">
          {doctors.length} rows
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead className="bg-slate-50/80">
            <tr className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Specialization</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {doctors.length === 0 ? (
              <tr>
                <td
                  className="px-6 py-12 text-center text-sm font-medium text-slate-500"
                  colSpan={5}
                >
                  No doctors to display. Try refreshing or creating a new doctor.
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr
                  className="transition hover:bg-indigo-50/40"
                  key={doctor.id}
                >
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">
                    #{doctor.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-700 ring-1 ring-indigo-100">
                        {getDoctorInitials(doctor.name)}
                      </span>
                      <button
                        className="font-bold text-slate-900 transition hover:text-indigo-700"
                        type="button"
                        onClick={() => onSelectDoctor(doctor)}
                      >
                        {doctor.name}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                      {doctor.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        type="button"
                        onClick={() => onSelectDoctor(doctor)}
                      >
                        View
                      </button>
                      <button
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                        type="button"
                        onClick={() => onEditDoctor(doctor)}
                      >
                        Edit
                      </button>
                      <DeleteDoctorButton
                        doctorId={doctor.id}
                        isDisabled={isMutating}
                        onDelete={onRequestDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
