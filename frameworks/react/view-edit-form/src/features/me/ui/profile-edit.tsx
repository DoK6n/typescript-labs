import ProfileUI from './profile-ui'
import { useProfileEdit } from '../lib'

interface ProfileEditProps {
  onCancel: () => void
  onSave: () => void
}

export default function ProfileEdit({ onCancel, onSave }: ProfileEditProps) {
  const { input, actions, handleSave } = useProfileEdit(onSave)

  return (
    <>
      <section>
        <button onClick={onCancel}>취소</button>
        <button onClick={handleSave(input)}>저장</button>
      </section>
      <hr />
      <ProfileUI
        name={
          <input value={input.name} onChange={e => actions.setProfile({ name: e.target.value })} />
        }
        age={
          <input
            type='number'
            value={input.age}
            onChange={e => actions.setProfile({ age: parseInt(e.target.value) || 0 })}
          />
        }
        gender={
          <input
            value={input.gender}
            onChange={e => actions.setProfile({ gender: e.target.value })}
          />
        }
        email={
          <input
            type='email'
            value={input.email}
            onChange={e => actions.setProfile({ email: e.target.value })}
          />
        }
        skills={
          <input
            value={input.skills}
            onChange={e => actions.setProfile({ skills: e.target.value })}
          />
        }
        yearsOfExperience={
          <input
            type='number'
            value={input.yearsOfExperience}
            onChange={e => actions.setProfile({ yearsOfExperience: parseInt(e.target.value) || 0 })}
          />
        }
        position={
          <input
            value={input.position}
            onChange={e => actions.setProfile({ position: e.target.value })}
          />
        }
      />
    </>
  )
}
