import { useSWRConfig } from 'swr'
import { ProfileInput, useGetProfileQuery, useUpdateProfileMutation } from '../../../entities/api'
import ProfileUI from './profile-ui'
import { useEffect, useMemo, useState } from 'react'
import { useRenderCount } from '../../../shared/lib'

interface ProfileEditProps {
  onCancel: () => void
  onSave: () => void
}

export default function ProfileEdit({ onCancel, onSave }: ProfileEditProps) {
  const { mutate: globalMutate } = useSWRConfig()
  const renderCount = useRenderCount()
  const { profile } = useGetProfileQuery('1')
  const { updateProfileTrigger } = useUpdateProfileMutation()
  const [input, setInput] = useState<ProfileInput>(profile)
  const actions = useMemo(
    () => ({
      setProfile: (profile: Partial<ProfileInput>) => {
        setInput(prev => ({ ...prev, ...profile }))
      },
    }),
    [],
  )

  useEffect(() => {
    setInput(profile)
  }, [profile])

  const handleSave = (input: ProfileInput) => async () => {
    await updateProfileTrigger(input, {
      onSuccess: async () => {
        await globalMutate(key => Array.isArray(key) && key[0] === `/profile`)
        onSave()
      },
    })
  }

  return (
    <>
      <section>
        <span>edit render count: {renderCount}</span>
      </section>
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
