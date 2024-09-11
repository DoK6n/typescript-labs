import { useEffect, useMemo, useReducer, useState } from 'react'
import {
  ProfileInput,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../../../entities/api'
import { useSWRConfig } from 'swr'

export function Profile() {
  const [isEdit, toggleEdit] = useReducer(state => !state, false)
  const { profile } = useGetProfileQuery('1')

  const { mutate: globalMutate } = useSWRConfig()
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
        alert('저장되었습니다.')
      },
    })
  }

  return (
    <div>
      <section>
        {isEdit ? (
          <>
            <button onClick={toggleEdit}>취소</button>
            <button onClick={handleSave(input)}>저장</button>
          </>
        ) : (
          <button onClick={toggleEdit}>수정</button>
        )}
      </section>
      <hr />

      <div>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>나이</th>
              <th>성별</th>
              <th>이메일</th>
              <th>기술스택</th>
              <th>연차</th>
              <th>포지션</th>
              {isEdit && <th>포인트</th>}
              {isEdit && <th>생성일</th>}
              {isEdit && <th>수정일</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              {isEdit ? (
                <input
                  value={input.name}
                  onChange={e => actions.setProfile({ name: e.target.value })}
                />
              ) : (
                <td>{profile.name}</td>
              )}
              {isEdit ? (
                <input
                  type='number'
                  value={input.age}
                  onChange={e => actions.setProfile({ age: parseInt(e.target.value) || 0 })}
                />
              ) : (
                <td>{profile.age}</td>
              )}

              {isEdit ? (
                <input
                  value={input.gender}
                  onChange={e => actions.setProfile({ gender: e.target.value })}
                />
              ) : (
                <td>{profile.gender}</td>
              )}
              {isEdit ? (
                <input
                  type='email'
                  value={input.email}
                  onChange={e => actions.setProfile({ email: e.target.value })}
                />
              ) : (
                <td>{profile.email}</td>
              )}
              {isEdit ? (
                <input
                  value={input.skills}
                  onChange={e => actions.setProfile({ skills: e.target.value })}
                />
              ) : (
                <td>{profile.skills}</td>
              )}
              {isEdit ? (
                <input
                  type='number'
                  value={input.yearsOfExperience}
                  onChange={e =>
                    actions.setProfile({ yearsOfExperience: parseInt(e.target.value) || 0 })
                  }
                />
              ) : (
                <td>{profile.yearsOfExperience}</td>
              )}
              {isEdit ? (
                <input
                  value={input.position}
                  onChange={e => actions.setProfile({ position: e.target.value })}
                />
              ) : (
                <td>{profile.position}</td>
              )}
              {isEdit && <td>{profile.point}</td>}
              {isEdit && <td>{profile.createdAt}</td>}
              {isEdit && <td>{profile.updatedAt}</td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
