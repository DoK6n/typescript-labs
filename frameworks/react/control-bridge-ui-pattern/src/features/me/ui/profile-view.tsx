import ProfileUI from './profile-ui'
import { useGetProfileQuery } from '../../../entities/api'

interface ProfileViewProps {
  onEdit: () => void
}

export default function ProfileView({ onEdit }: ProfileViewProps) {
  const { profile } = useGetProfileQuery('1')

  return (
    <>
      <section>
        <button onClick={onEdit}>수정</button>
      </section>
      <hr />
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
    </>
  )
}
