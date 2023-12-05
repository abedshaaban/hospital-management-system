import { User } from '@/types/user'

import Button from '@/components/ui/button'

import './index.css'

import { useState } from 'react'

type Props = {
  user: User | null
}

export default function UserProfile({ user }: Props) {
  const [modelIsOpen, setModelIsOpen] = useState(false)

  const userMetaData: { title: string; value: string }[] = [
    { title: 'First Name', value: 'first_name' },
    { title: 'Last Name', value: 'last_name' },
    { title: 'Email', value: 'email' },
    { title: 'Birth Date', value: 'birth_date' }
  ]

  function handleModel() {
    setModelIsOpen(!modelIsOpen)
  }

  return (
    <>
      {user?.account_status === 'pending' && (
        <div className="not-approved-yet">⚠️ Your account has not been approved yet.</div>
      )}

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

          <br />

          <Button type="normal" className="action-btn" onClick={handleModel}>
            Update Profile
          </Button>

          <dialog open={modelIsOpen}>
            <div className="dialog-div">
              <div>
                <div className="dialog-footer">
                  <Button type="important" className="action-btn" onClick={handleModel}>
                    Cancel
                  </Button>

                  <Button type="normal" className="action-btn" onClick={handleModel}>
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </section>
    </>
  )
}
