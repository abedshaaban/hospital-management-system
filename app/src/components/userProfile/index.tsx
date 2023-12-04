import { User } from '@/types/user'

import './index.css'

type Props = {
  user: User | null
}

export default function UserProfile({ user }: Props) {
  const userMetaData: { title: string; value: string }[] = [
    { title: 'First Name', value: 'first_name' },
    { title: 'Last Name', value: 'last_name' },
    { title: 'Email', value: 'email' },
    { title: 'Birth Date', value: 'birth_date' }
  ]

  return (
    <section className="profile">
      <div className="profile-img-div">
        <img src="" alt={`${user?.first_name} ${user?.last_name} profile`} />
      </div>

      <div className="profile-meta-data">
        {userMetaData?.map((attribute, index) => {
          return (
            <div key={index} className="profile-meta-data-attribute">
              <label>{attribute.title}:</label>
              <span>{(user as any)?.[attribute.value]}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
