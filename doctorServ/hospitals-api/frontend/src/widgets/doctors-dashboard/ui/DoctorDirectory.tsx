import { DeleteDoctorButton } from '../../../features/delete-doctor/ui/DeleteDoctorButton'
import type { Doctor } from '../../../entities/doctor/model/types'
import { getDoctorInitials } from '../model/getDoctorInitials'

type DoctorDirectoryProps = {
  doctors: Doctor[]
  selectedDoctorId: number
  isLoading: boolean
  isMutating: boolean
  onSelectDoctor: (doctor: Doctor) => void
  onRequestDelete: (doctorId: number) => void
}

export function DoctorDirectory({
  doctors,
  selectedDoctorId,
  isLoading,
  isMutating,
  onSelectDoctor,
  onRequestDelete,
}: DoctorDirectoryProps) {
  return (
    <section className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-950">Directory</h2>
          <p className="mt-1 text-sm text-slate-500">
            Navigation and quick actions
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
          {doctors.length}
        </span>
      </div>

      <div className="space-y-2" aria-live="polite">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div
                className="h-20 animate-pulse rounded-2xl bg-slate-100"
                key={item}
              />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No doctors found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try another specialization or refresh.
            </p>
          </div>
        ) : (
          doctors.map((doctor) => {
            const isSelected = doctor.id === selectedDoctorId

            return (
              <article
                className={
                  isSelected
                    ? 'relative rounded-2xl border border-indigo-200 bg-indigo-50/80 p-3 shadow-sm'
                    : 'relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-slate-50 hover:shadow-md'
                }
                key={doctor.id}
              >
                {isSelected ? (
                  <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-indigo-500" />
                ) : null}
                <div className="flex items-start gap-3 pl-1">
                  <button
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    type="button"
                    onClick={() => onSelectDoctor(doctor)}
                  >
                    <span
                      className={
                        isSelected
                          ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xs font-black text-white shadow-md shadow-indigo-100'
                          : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xs font-black text-slate-600'
                      }
                    >
                      {getDoctorInitials(doctor.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-slate-950">
                        {doctor.name}
                      </span>
                      <span className="mt-1 block text-xs font-medium text-slate-500">
                        ID #{doctor.id}
                      </span>
                      <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 ring-1 ring-blue-100">
                        {doctor.specialization}
                      </span>
                    </span>
                  </button>
                  <DeleteDoctorButton
                    doctorId={doctor.id}
                    isDisabled={isMutating}
                    onDelete={onRequestDelete}
                  />
                </div>
              </article>
            )
          })
        )}
      </div>
    </section>
  )
}
