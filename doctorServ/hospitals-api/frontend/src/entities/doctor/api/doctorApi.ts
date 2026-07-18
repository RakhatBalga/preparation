import { request } from '../../../shared/api/http'
import type {
  Doctor,
  DoctorCountResponse,
  DoctorDeleteResponse,
  DoctorInput,
  DoctorPatchInput,
} from '../model/types'

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
