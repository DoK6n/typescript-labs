import css from './profile-ui.module.css'

interface ProfileUIProps {
  name: React.ReactNode
  age: React.ReactNode
  gender: React.ReactNode
  email: React.ReactNode
  skills: React.ReactNode
  yearsOfExperience: React.ReactNode
  position: React.ReactNode
  point?: React.ReactNode
  createdAt?: React.ReactNode
  updatedAt?: React.ReactNode
}

export default function ProfileUI({
  name,
  age,
  gender,
  email,
  skills,
  yearsOfExperience,
  position,
  point,
  createdAt,
  updatedAt,
}: ProfileUIProps) {
  return (
    <div className={css.container}>
      <table>
        <colgroup>
          <col width='10%' />
          <col width='5%' />
          <col width='5%' />
          <col width='10%' />
          <col width='15%' />
          <col width='5%' />
          <col width='10%' />
          {point && <col width='10%' />}
          {createdAt && <col width='10%' />}
          {updatedAt && <col width='10%' />}
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>성별</th>
            <th>이메일</th>
            <th>기술스택</th>
            <th>연차</th>
            <th>포지션</th>
            {point && <th>포인트</th>}
            {createdAt && <th>생성일</th>}
            {updatedAt && <th>수정일</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{email}</td>
            <td>{skills}</td>
            <td>{yearsOfExperience}</td>
            <td>{position}</td>
            {point && <td>{point}</td>}
            {createdAt && <td>{createdAt}</td>}
            {updatedAt && <td>{updatedAt}</td>}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
