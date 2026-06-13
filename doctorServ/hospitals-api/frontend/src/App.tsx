import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  createDoctor,
  deleteDoctor,
  getDoctors,
  getDoctorsCount,
  patchDoctor,
  searchDoctors,
  updateDoctor,
} from './api/doctors'
import type { Doctor, DoctorInput } from './api/doctors'
import './App.css'

const emptyDoctorForm: DoctorInput = {
  name: '',
  specialization: '',
}

type PatchField = 'name' | 'specialization'

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [doctorCount, setDoctorCount] = useState(0)
  const [selectedDoctorId, setSelectedDoctorId] = useState(1)
  const [searchSpecialization, setSearchSpecialization] = useState('')
  const [createForm, setCreateForm] = useState<DoctorInput>(emptyDoctorForm)
  const [updateForm, setUpdateForm] = useState<DoctorInput>(emptyDoctorForm)
  const [patchField, setPatchField] = useState<PatchField>('specialization')
  const [patchValue, setPatchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('Ready')
  const [error, setError] = useState('')
  const selectedDoctorIdRef = useRef(selectedDoctorId)

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

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      const createdDoctor = await createDoctor({
        name: createForm.name.trim(),
        specialization: createForm.specialization.trim(),
      })

      setCreateForm(emptyDoctorForm)
      selectedDoctorIdRef.current = createdDoctor.id
      setStatus(`Created ${createdDoctor.name}`)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Create request failed',
      )
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      const updatedDoctor = await updateDoctor(selectedDoctorId, {
        name: updateForm.name.trim(),
        specialization: updateForm.specialization.trim(),
      })

      setStatus(`Updated ${updatedDoctor.name} with PUT`)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Update request failed',
      )
    }
  }

  async function handlePatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const nextValue = patchValue.trim()
    const payload =
      patchField === 'name'
        ? { name: nextValue }
        : { specialization: nextValue }

    try {
      const patchedDoctor = await patchDoctor(selectedDoctorId, payload)

      setPatchValue('')
      setStatus(`Patched ${patchField} for ${patchedDoctor.name}`)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Patch request failed',
      )
    }
  }

  async function handleDelete(doctorId: number) {
    setError('')

    try {
      const response = await deleteDoctor(doctorId)

      setStatus(response.message)
      await loadDashboard()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Delete request failed',
      )
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Hospitals API</p>
          <h1>Doctors</h1>
        </div>
        <div className="stats">
          <span className="stat-label">Count endpoint</span>
          <strong>{doctorCount}</strong>
        </div>
      </header>

      <section className="workspace">
        <aside className="sidebar">
          <form className="search-box" onSubmit={handleSearch}>
            <label htmlFor="search">Search specialization</label>
            <div className="input-row">
              <input
                id="search"
                value={searchSpecialization}
                onChange={(event) => setSearchSpecialization(event.target.value)}
                placeholder="Oncology"
              />
              <button type="submit">Search</button>
            </div>
          </form>

          <div className="doctor-list" aria-live="polite">
            <div className="list-heading">
              <h2>Directory</h2>
              <button type="button" className="ghost-button" onClick={loadDashboard}>
                Refresh
              </button>
            </div>

            {isLoading ? (
              <p className="muted">Loading doctors...</p>
            ) : doctors.length === 0 ? (
              <p className="muted">No doctors found.</p>
            ) : (
              doctors.map((doctor) => (
                <article
                  className={
                    doctor.id === selectedDoctorId
                      ? 'doctor-item selected'
                      : 'doctor-item'
                  }
                  key={doctor.id}
                >
                  <button
                    type="button"
                    onClick={() => selectDoctor(doctor)}
                  >
                    <span className="doctor-name">{doctor.name}</span>
                    <span className="doctor-meta">
                      #{doctor.id} - {doctor.specialization}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </article>
              ))
            )}
          </div>
        </aside>

        <section className="main-panel">
          <div className="status-row">
            <span>{status}</span>
            {error ? <strong>{error}</strong> : null}
          </div>

          <section className="form-grid">
            <form className="tool-panel" onSubmit={handleCreate}>
              <div className="panel-title">
                <p className="eyebrow">POST</p>
                <h2>Create doctor</h2>
              </div>
              <label htmlFor="create-name">Name</label>
              <input
                id="create-name"
                value={createForm.name}
                onChange={(event) =>
                  setCreateForm((form) => ({
                    ...form,
                    name: event.target.value,
                  }))
                }
                placeholder="Dr. Sara Novak"
              />
              <label htmlFor="create-specialization">Specialization</label>
              <input
                id="create-specialization"
                value={createForm.specialization}
                onChange={(event) =>
                  setCreateForm((form) => ({
                    ...form,
                    specialization: event.target.value,
                  }))
                }
                placeholder="Neurology"
              />
              <button type="submit">Create</button>
            </form>

            <form className="tool-panel" onSubmit={handleUpdate}>
              <div className="panel-title">
                <p className="eyebrow">PUT</p>
                <h2>Full update</h2>
              </div>
              <label htmlFor="put-id">Doctor id</label>
              <input
                id="put-id"
                min="1"
                type="number"
                value={selectedDoctorId}
                onChange={(event) =>
                  selectDoctorId(Number(event.target.value))
                }
              />
              <label htmlFor="put-name">Name</label>
              <input
                id="put-name"
                value={updateForm.name}
                onChange={(event) =>
                  setUpdateForm((form) => ({
                    ...form,
                    name: event.target.value,
                  }))
                }
              />
              <label htmlFor="put-specialization">Specialization</label>
              <input
                id="put-specialization"
                value={updateForm.specialization}
                onChange={(event) =>
                  setUpdateForm((form) => ({
                    ...form,
                    specialization: event.target.value,
                  }))
                }
              />
              <button type="submit">Save full update</button>
            </form>

            <form className="tool-panel" onSubmit={handlePatch}>
              <div className="panel-title">
                <p className="eyebrow">PATCH</p>
                <h2>Partial update</h2>
              </div>
              <label htmlFor="patch-id">Doctor id</label>
              <input
                id="patch-id"
                min="1"
                type="number"
                value={selectedDoctorId}
                onChange={(event) =>
                  selectDoctorId(Number(event.target.value))
                }
              />
              <label htmlFor="patch-field">Field</label>
              <select
                id="patch-field"
                value={patchField}
                onChange={(event) => setPatchField(event.target.value as PatchField)}
              >
                <option value="specialization">specialization</option>
                <option value="name">name</option>
              </select>
              <label htmlFor="patch-value">New value</label>
              <input
                id="patch-value"
                value={patchValue}
                onChange={(event) => setPatchValue(event.target.value)}
                placeholder={
                  patchField === 'name' ? 'Dr. Aida Karimova' : 'Cardiology'
                }
              />
              <button type="submit">Apply patch</button>
            </form>
          </section>
        </section>
      </section>
    </main>
  )
}

export default App
