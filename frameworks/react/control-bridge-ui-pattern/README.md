# Control Bridge UI 패턴

Container/Presentational 패턴과 Hook을 활용한 새로운 리액트 패턴을 소개합니다.

우선 Container/Presentational에서 Container는 비즈니스 로직을 작성하고 Presentational에 데이터를 전달하는 역할을 합니다. Presentational는 Container에서 전달받은 데이터를 화면에 렌더링 하는 UI 컴포넌트 역할을 합니다. 이로 인해 비즈니스 로직과 UI 로직을 분리할 수 있고 재사용성을 높일 수 있습니다.

그리고 이 패턴을 Hooks에서는 Custom Hook을 이용하여 비즈니스 로직을 분리하는 방식으로 대체할 수 있습니다.

저는 이 두 패턴을 전부 활용할 수 있는 방법으로 새로운 패턴을 만들어 내었습니다.

바로 Control Bridge UI 패턴입니다.
우선 이 패턴은 특정 UI 구조에서 유용하게 활용할 수 있는데요.
주로 같은 레이아웃 구조에서 수정모드/읽기모드가 있는 화면에서 사용할 수 있습니다.

예를 들어 보겠습니다.

프로필을 읽고 수정하는 화면을 예로 들겠습니다.

```tsx
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
```

