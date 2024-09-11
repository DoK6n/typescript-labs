import { useSWRConfig } from 'swr'
import {
  ProfileInput,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../../../entities/api'
import { useEffect, useMemo, useState } from 'react'

export const useProfileEdit = (onSave: () => void) => {
  const { mutate: globalMutate } = useSWRConfig()
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

  return { input, actions, handleSave }
}
