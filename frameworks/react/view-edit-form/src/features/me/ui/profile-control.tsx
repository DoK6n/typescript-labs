import { useReducer } from 'react'
import ProfileEdit from './profile-edit'
import ProfileView from './profile-view'
import { ProfileInput } from '../../../entities/api'

export interface ProfileInputActions {
  setProfile: (profile: Partial<ProfileInput>) => void
}

export default function ProfileControl() {
  const [isEdit, toggleEdit] = useReducer(state => !state, false)

  const handleSave = () => {
    toggleEdit()
    alert('저장되었습니다.')
  }

  return (
    <section>
      {isEdit ? (
        <ProfileEdit onCancel={toggleEdit} onSave={handleSave} />
      ) : (
        <ProfileView onEdit={toggleEdit} />
      )}
    </section>
  )
}
