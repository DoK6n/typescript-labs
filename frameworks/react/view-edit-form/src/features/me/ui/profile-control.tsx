import { useEffect, useMemo, useReducer, useState } from 'react'
import ProfileEdit from './profile-edit'
import ProfileView from './profile-view'
import { ProfileInput, useGetProfileQuery, useUpdateProfileMutation } from '../../../entities/api'
import { useSWRConfig } from 'swr'

export interface ProfileInputActions {
  setProfile: (profile: Partial<ProfileInput>) => void
}

export default function ProfileControl() {
  const { mutate: globalMutate } = useSWRConfig()
  const [isEdit, toggleEdit] = useReducer(state => !state, false)

  const { profile } = useGetProfileQuery('1')
  const [profileInput, setProfileInput] = useState<ProfileInput>(profile)
  const profileInputActions = useMemo<ProfileInputActions>(
    () => ({
      setProfile: (profile: Partial<ProfileInput>) => {
        setProfileInput(prev => ({ ...prev, ...profile }))
      },
    }),
    [],
  )

  const { updateProfileTrigger } = useUpdateProfileMutation()

  const handleSave = async (input: ProfileInput) => {
    await updateProfileTrigger(input, {
      onSuccess: async () => {
        await globalMutate(key => Array.isArray(key) && key[0] === `/profile`)
      },
    })
    toggleEdit()
  }

  useEffect(() => {
    setProfileInput(profile)
  }, [profile, isEdit])

  return (
    <>
      <section>
        <button onClick={toggleEdit}>{isEdit ? '취소' : '수정'}</button>
        {isEdit && <button onClick={() => handleSave(profileInput)}>저장</button>}
      </section>
      <hr />
      <section>
        {isEdit ? (
          <ProfileEdit input={profileInput} actions={profileInputActions} />
        ) : (
          <ProfileView />
        )}
      </section>
    </>
  )
}
