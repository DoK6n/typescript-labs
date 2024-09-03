import ProfileUI from './profile-ui'
import { useGetProfileQuery } from '../../../entities/api'

export default function ProfileView() {
  const { profile } = useGetProfileQuery('1')

  return (
    <ProfileUI
      name={<span>{profile.name}</span>}
      age={<span>{profile.age}</span>}
      gender={<span>{profile.gender}</span>}
      email={<span>{profile.email}</span>}
      skills={<span>{profile.skills}</span>}
      yearsOfExperience={<span>{profile.yearsOfExperience}</span>}
      position={<span>{profile.position}</span>}
      point={<span>{profile.point}</span>}
      createdAt={<span>{profile.createdAt}</span>}
      updatedAt={<span>{profile.updatedAt}</span>}
    />
  )
}
