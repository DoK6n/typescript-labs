import { format } from 'date-fns'
import { ProfileInput, ProfileOutput } from './model'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const getProfileFetcher = async (id: string): Promise<ProfileOutput> => {
  const fakeProfile: ProfileOutput = {
    id,
    name: '홍길동',
    age: 30,
    gender: '남성',
    email: 'hong@example.com',
    skills: 'JavaScript, React, TypeScript',
    yearsOfExperience: 5,
    position: '프론트엔드 개발자',
    point: 100,
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    updatedAt: format(new Date(), 'yyyy-MM-dd'),
  }
  await delay(500)
  return fakeProfile
}

export const updateProfileFetcher = async (
  _: string,
  { arg }: { arg: ProfileInput },
): Promise<void> => {
  await delay(500)
  console.log('update profile input :', arg)
}

export const api = {
  getProfile: getProfileFetcher,
  updateProfile: updateProfileFetcher,
}
