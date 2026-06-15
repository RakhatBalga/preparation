import { CreateDoctorForm } from '../../../features/create-doctor/ui/CreateDoctorForm'
import type { Doctor } from '../../../entities/doctor/model/types'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { DoctorDirectory } from './DoctorDirectory'
import { DoctorSearch } from '../../../features/search-doctors/ui/DoctorSearch'
import { DoctorsTable } from './DoctorsTable'
import { SelectedDoctorDetails } from './SelectedDoctorDetails'
import { StatusToast } from './StatusToast'
import { UpdateDoctorPanel } from './UpdateDoctorPanel'
import { useDoctorsDashboard } from '../model/useDoctorsDashboard'

export function DoctorsDashboard() {
  const dashboard = useDoctorsDashboard()
  const apiIsReady = !dashboard.error

  function editDoctor(doctor: Doctor) {
    dashboard.selectDoctor(doctor)
    dashboard.setUpdateMode('full')
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <StatusToast message={dashboard.toast} onDismiss={dashboard.clearToast} />
      <ConfirmDeleteModal
        doctor={dashboard.doctorPendingDelete}
        isDeleting={dashboard.isMutating}
        onCancel={dashboard.clearDeleteConfirmation}
        onConfirm={dashboard.confirmDeleteDoctor}
      />

      <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_22px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">
                Hospitals API
              </span>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Doctors Management
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Manage doctors, specializations and CRUD operations
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[560px]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <span className="text-xs font-semibold text-slate-500">
                  Total Doctors
                </span>
                <strong className="mt-2 block text-2xl font-black text-slate-950">
                  {dashboard.doctors.length}
                </strong>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <span className="text-xs font-semibold text-slate-500">
                  API Status
                </span>
                <strong
                  className={
                    apiIsReady
                      ? 'mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100'
                      : 'mt-3 inline-flex rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-100'
                  }
                >
                  {apiIsReady ? 'Ready' : 'Issue'}
                </strong>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <span className="text-xs font-semibold text-slate-500">
                  Count Endpoint
                </span>
                <strong className="mt-2 block text-2xl font-black text-indigo-700">
                  {dashboard.doctorCount}
                </strong>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-4">
            <DoctorSearch
              value={dashboard.searchSpecialization}
              onChange={dashboard.setSearchSpecialization}
              onRefresh={dashboard.loadDashboard}
              onSubmit={dashboard.searchDoctorList}
            />

            <DoctorDirectory
              doctors={dashboard.doctors}
              selectedDoctorId={dashboard.selectedDoctorId}
              isLoading={dashboard.isLoading}
              isMutating={dashboard.isMutating}
              onSelectDoctor={dashboard.selectDoctor}
              onRequestDelete={dashboard.requestDeleteDoctor}
            />
          </aside>

          <section className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-3 rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={
                    apiIsReady
                      ? 'inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100'
                      : 'inline-flex rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-100'
                  }
                >
                  {apiIsReady ? 'API Ready' : 'API Error'}
                </span>
                <span className="text-sm font-medium leading-6 text-slate-500">
                  {dashboard.status}
                </span>
              </div>
              {dashboard.error ? (
                <strong className="rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-100">
                  {dashboard.error}
                </strong>
              ) : (
                <span className="text-sm font-medium text-slate-400">
                  Last action: {dashboard.lastAction}
                </span>
              )}
            </div>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="grid gap-6 2xl:grid-cols-[minmax(320px,0.85fr)_minmax(420px,1.15fr)]">
                <CreateDoctorForm
                  form={dashboard.createForm}
                  isDisabled={
                    dashboard.isMutating || !dashboard.createFormIsValid
                  }
                  onChange={dashboard.setCreateForm}
                  onSubmit={dashboard.createNewDoctor}
                />

                <UpdateDoctorPanel
                  doctorId={dashboard.selectedDoctorId}
                  updateForm={dashboard.updateForm}
                  patchField={dashboard.patchField}
                  patchValue={dashboard.patchValue}
                  updateMode={dashboard.updateMode}
                  isFullUpdateDisabled={
                    dashboard.isMutating || !dashboard.updateFormIsValid
                  }
                  isPatchDisabled={
                    dashboard.isMutating || !dashboard.patchFormIsValid
                  }
                  onDoctorIdChange={dashboard.selectDoctorId}
                  onUpdateFormChange={dashboard.setUpdateForm}
                  onPatchFieldChange={dashboard.setPatchField}
                  onPatchValueChange={dashboard.setPatchValue}
                  onUpdateModeChange={dashboard.setUpdateMode}
                  onFullUpdateSubmit={dashboard.saveFullUpdate}
                  onPatchSubmit={dashboard.applyPatchUpdate}
                />
              </div>

              <SelectedDoctorDetails
                doctor={dashboard.selectedDoctor}
                lastAction={dashboard.lastAction}
              />
            </section>

            <DoctorsTable
              doctors={dashboard.doctors}
              isMutating={dashboard.isMutating}
              onEditDoctor={editDoctor}
              onRequestDelete={dashboard.requestDeleteDoctor}
              onSelectDoctor={dashboard.selectDoctor}
            />
          </section>
        </section>
      </div>
    </main>
  )
}
