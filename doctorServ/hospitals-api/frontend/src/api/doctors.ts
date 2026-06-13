export type Doctor = {
  id: number
  name: string
  specialization: string
}

export type DoctorInput = {
  name: string
  specialization: string
}

export type DoctorPatchInput = {
  name?: string
  specialization?: string
}

export type DoctorCountResponse = {
  count: number
}

export type DoctorDeleteResponse = {
  message: string
  doctor: Doctor
}

const API_URL = 'http://127.0.0.1:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const message =
      errorBody?.detail ?? `Request failed with status ${response.status}`

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return response.json() as Promise<T>
}

export function getDoctors() {
  return request<Doctor[]>('/doctors')
}

export function getDoctorsCount() {
  return request<DoctorCountResponse>('/doctors/count')
}

export function searchDoctors(specialization: string) {
  const params = new URLSearchParams({ specialization })
  return request<Doctor[]>(`/doctors/search?${params.toString()}`)
}

export function createDoctor(doctor: DoctorInput) {
  return request<Doctor>('/doctors', {
    method: 'POST',
    body: JSON.stringify(doctor),
  })
}

export function updateDoctor(doctorId: number, doctor: DoctorInput) {
  return request<Doctor>(`/doctors/${doctorId}`, {
    method: 'PUT',
    body: JSON.stringify(doctor),
  })
}

export function patchDoctor(doctorId: number, doctor: DoctorPatchInput) {
  return request<Doctor>(`/doctors/${doctorId}`, {
    method: 'PATCH',
    body: JSON.stringify(doctor),
  })
}

export function deleteDoctor(doctorId: number) {
  return request<DoctorDeleteResponse>(`/doctors/${doctorId}`, {
    method: 'DELETE',
  })
}
