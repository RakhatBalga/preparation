import { PatchDoctorForm } from '../../../features/patch-doctor/ui/PatchDoctorForm'
import { UpdateDoctorForm } from '../../../features/update-doctor/ui/UpdateDoctorForm'
import type { DoctorInput } from '../../../entities/doctor/model/types'
import type { PatchField } from '../../../features/patch-doctor/model/types'
import type { UpdateMode } from '../model/useDoctorsDashboard'

type UpdateDoctorPanelProps = {
  doctorId: number
  updateForm: DoctorInput
  patchField: PatchField
  patchValue: string
  updateMode: UpdateMode
  isFullUpdateDisabled: boolean
  isPatchDisabled: boolean
  onDoctorIdChange: (doctorId: number) => void
  onUpdateFormChange: (form: DoctorInput) => void
  onPatchFieldChange: (field: PatchField) => void
  onPatchValueChange: (value: string) => void
  onUpdateModeChange: (mode: UpdateMode) => void
  onFullUpdateSubmit: () => Promise<void>
  onPatchSubmit: () => Promise<void>
}

export function UpdateDoctorPanel({
  doctorId,
  updateForm,
  patchField,
  patchValue,
  updateMode,
  isFullUpdateDisabled,
  isPatchDisabled,
  onDoctorIdChange,
  onUpdateFormChange,
  onPatchFieldChange,
  onPatchValueChange,
  onUpdateModeChange,
  onFullUpdateSubmit,
  onPatchSubmit,
}: UpdateDoctorPanelProps) {
  return (
    <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Update doctor</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Choose a full PUT update or a targeted PATCH change.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          <button
            className={
              updateMode === 'full'
                ? 'rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-blue-100'
                : 'rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-800'
            }
            type="button"
            onClick={() => onUpdateModeChange('full')}
          >
            <span className="mr-1 rounded-full bg-blue-50 px-2 py-0.5 text-blue-700 ring-1 ring-blue-100">
              PUT
            </span>
            Full update
          </button>
          <button
            className={
              updateMode === 'partial'
                ? 'rounded-full bg-white px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-violet-100'
                : 'rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-800'
            }
            type="button"
            onClick={() => onUpdateModeChange('partial')}
          >
            <span className="mr-1 rounded-full bg-violet-50 px-2 py-0.5 text-violet-700 ring-1 ring-violet-100">
              PATCH
            </span>
            Partial update
          </button>
        </div>
      </div>

      {updateMode === 'full' ? (
        <UpdateDoctorForm
          doctorId={doctorId}
          form={updateForm}
          isDisabled={isFullUpdateDisabled}
          onDoctorIdChange={onDoctorIdChange}
          onChange={onUpdateFormChange}
          onSubmit={onFullUpdateSubmit}
        />
      ) : (
        <PatchDoctorForm
          doctorId={doctorId}
          field={patchField}
          value={patchValue}
          isDisabled={isPatchDisabled}
          onDoctorIdChange={onDoctorIdChange}
          onFieldChange={onPatchFieldChange}
          onValueChange={onPatchValueChange}
          onSubmit={onPatchSubmit}
        />
      )}
    </section>
  )
}
