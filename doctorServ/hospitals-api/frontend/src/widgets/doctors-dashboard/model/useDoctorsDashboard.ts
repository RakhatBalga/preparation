import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createDoctor,
  deleteDoctor,
  getDoctors,
  getDoctorsCount,
  patchDoctor,
  searchDoctors,
  updateDoctor,
} from '../../../entities/doctor/api/doctorApi'
import type { Doctor, DoctorInput } from '../../../entities/doctor/model/types'
import type { PatchField } from '../../../features/patch-doctor/model/types'

const emptyDoctorForm: DoctorInput = {
  name: '',
  specialization: '',
}

export type UpdateMode = 'full' | 'partial'

export function useDoctorsDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [doctorCount, setDoctorCount] = useState(0)
  const [selectedDoctorId, setSelectedDoctorId] = useState(1)
  const [searchSpecialization, setSearchSpecialization] = useState('')
  const [createForm, setCreateForm] = useState<DoctorInput>(emptyDoctorForm)
  const [updateForm, setUpdateForm] = useState<DoctorInput>(emptyDoctorForm)
  const [patchField, setPatchField] = useState<PatchField>('specialization')
  const [patchValue, setPatchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isMutating, setIsMutating] = useState(false)
  const [updateMode, setUpdateMode] = useState<UpdateMode>('full')
  const [status, setStatus] = useState('Ready')
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [lastAction, setLastAction] = useState('Loaded dashboard')
  const [doctorPendingDelete, setDoctorPendingDelete] = useState<Doctor | null>(
    null,
  )
  const selectedDoctorIdRef = useRef(selectedDoctorId)

  const selectedDoctor =
    doctors.find((doctor) => doctor.id === selectedDoctorId) ?? null

  const createFormIsValid =
    createForm.name.trim().length >= 2 &&
    createForm.specialization.trim().length >= 2

  const updateFormIsValid =
    selectedDoctorId > 0 &&
    updateForm.name.trim().length >= 2 &&
    updateForm.specialization.trim().length >= 2

  const patchFormIsValid = selectedDoctorId > 0 && patchValue.trim().length >= 2

  const applyDashboardData = useCallback(
    (doctorsList: Doctor[], count: number) => {
      setDoctors(doctorsList)
      setDoctorCount(count)

      if (doctorsList.length === 0) {
        return
      }

      const nextSelectedDoctor =
        doctorsList.find(
          (doctor) => doctor.id === selectedDoctorIdRef.current,
        ) ?? doctorsList[0]

      selectedDoctorIdRef.current = nextSelectedDoctor.id
      setSelectedDoctorId(nextSelectedDoctor.id)
      setUpdateForm({
        name: nextSelectedDoctor.name,
        specialization: nextSelectedDoctor.specialization,
      })
    },
    [],
  )

  const loadDashboard = useCallback(async () => {
    setError('')
    setIsLoading(true)

    try {
      const [doctorsList, countResponse] = await Promise.all([
        getDoctors(),
        getDoctorsCount(),
      ])

      applyDashboardData(doctorsList, countResponse.count)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong',
      )
    } finally {
      setIsLoading(false)
    }
  }, [applyDashboardData])

  useEffect(() => {
    let isActive = true

    Promise.all([getDoctors(), getDoctorsCount()])
      .then(([doctorsList, countResponse]) => {
        if (!isActive) {
          return
        }

        applyDashboardData(doctorsList, countResponse.count)
      })
      .catch((requestError) => {
        if (!isActive) {
          return
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Something went wrong',
        )
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [applyDashboardData])

  function selectDoctor(doctor: Doctor) {
    selectedDoctorIdRef.current = doctor.id
    setSelectedDoctorId(doctor.id)
    setUpdateForm({
      name: doctor.name,
      specialization: doctor.specialization,
    })
  }

  function selectDoctorId(doctorId: number) {
    selectedDoctorIdRef.current = doctorId
    setSelectedDoctorId(doctorId)

    const doctor = doctors.find((currentDoctor) => currentDoctor.id === doctorId)

    if (doctor) {
      setUpdateForm({
        name: doctor.name,
        specialization: doctor.specialization,
      })
    }
  }

  async function searchDoctorList() {
    const specialization = searchSpecialization.trim()

    if (!specialization) {
      await loadDashboard()
      setStatus('Showing all doctors')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const result = await searchDoctors(specialization)
      setDoctors(result)

      if (result.length > 0) {
        selectDoctor(result[0])
      }

      setStatus(`Found ${result.length} doctor${result.length === 1 ? '' : 's'}`)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Search request failed',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function createNewDoctor() {
    setError('')
    setIsMutating(true)

    try {
      const createdDoctor = await createDoctor({
        name: createForm.name.trim(),
        specialization: createForm.specialization.trim(),
      })

      setCreateForm(emptyDoctorForm)
      selectedDoctorIdRef.current = createdDoctor.id
      setStatus(`Created ${createdDoctor.name}`)
      setToast(`Created ${createdDoctor.name}`)
      setLastAction(`Created ${createdDoctor.name}`)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Create request failed',
      )
    } finally {
      setIsMutating(false)
    }
  }

  async function saveFullUpdate() {
    setError('')
    setIsMutating(true)

    try {
      const updatedDoctor = await updateDoctor(selectedDoctorId, {
        name: updateForm.name.trim(),
        specialization: updateForm.specialization.trim(),
      })

      setStatus(`Updated ${updatedDoctor.name} with PUT`)
      setToast(`Saved full update for ${updatedDoctor.name}`)
      setLastAction(`PUT updated ${updatedDoctor.name}`)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Update request failed',
      )
    } finally {
      setIsMutating(false)
    }
  }

  async function applyPatchUpdate() {
    setError('')
    setIsMutating(true)

    const nextValue = patchValue.trim()
    const payload =
      patchField === 'name'
        ? { name: nextValue }
        : { specialization: nextValue }

    try {
      const patchedDoctor = await patchDoctor(selectedDoctorId, payload)

      setPatchValue('')
      setStatus(`Patched ${patchField} for ${patchedDoctor.name}`)
      setToast(`Patched ${patchField} for ${patchedDoctor.name}`)
      setLastAction(`PATCH updated ${patchField} for ${patchedDoctor.name}`)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Patch request failed',
      )
    } finally {
      setIsMutating(false)
    }
  }

  function requestDeleteDoctor(doctorId: number) {
    const doctor = doctors.find((currentDoctor) => currentDoctor.id === doctorId)

    if (doctor) {
      setDoctorPendingDelete(doctor)
    }
  }

  function clearDeleteConfirmation() {
    setDoctorPendingDelete(null)
  }

  async function confirmDeleteDoctor() {
    if (!doctorPendingDelete) {
      return
    }

    setError('')
    setIsMutating(true)

    try {
      const response = await deleteDoctor(doctorPendingDelete.id)

      setStatus(response.message)
      setToast(`Deleted ${response.doctor.name}`)
      setLastAction(`Deleted ${response.doctor.name}`)
      setDoctorPendingDelete(null)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Delete request failed',
      )
    } finally {
      setIsMutating(false)
    }
  }

  function clearToast() {
    setToast('')
  }

  return {
    doctors,
    doctorCount,
    selectedDoctor,
    selectedDoctorId,
    searchSpecialization,
    createForm,
    updateForm,
    patchField,
    patchValue,
    isLoading,
    isMutating,
    updateMode,
    status,
    error,
    toast,
    lastAction,
    doctorPendingDelete,
    createFormIsValid,
    updateFormIsValid,
    patchFormIsValid,
    setSearchSpecialization,
    setCreateForm,
    setUpdateForm,
    setPatchField,
    setPatchValue,
    setUpdateMode,
    loadDashboard,
    selectDoctor,
    selectDoctorId,
    searchDoctorList,
    createNewDoctor,
    saveFullUpdate,
    applyPatchUpdate,
    requestDeleteDoctor,
    clearDeleteConfirmation,
    confirmDeleteDoctor,
    clearToast,
  }
}
