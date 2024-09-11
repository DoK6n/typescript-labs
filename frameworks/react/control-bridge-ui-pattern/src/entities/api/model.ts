export interface Profile {
  id: string
  name: string
  age: number
  gender: string
  email: string
  skills: string
  yearsOfExperience: number
  position: string
}

export interface ProfileOutput extends Profile {
  point: number
  createdAt: string
  updatedAt?: string
}

export interface ProfileInput extends Partial<Profile> {
  id: string
}
