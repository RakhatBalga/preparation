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
