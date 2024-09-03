import useSWRMutation from 'swr/mutation'
import { api } from './profile'

export const useUpdateProfileMutation = () => {
  const { trigger, ...swrMutationResponse } = useSWRMutation('/profile', api.updateProfile)

  return {
    updateProfileTrigger: trigger,
    ...swrMutationResponse,
  }
}
