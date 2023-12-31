import { useEffect, useState } from 'react'
import { User } from '@/types/user'
import { updateUserProfile } from '@/util'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

import './index.css'

import { useNavigate } from 'react-router-dom'

type Props = {
  user: User | null
}

export default function UserProfile({ user }: Props) {
  const navigate = useNavigate()
  const [modelIsOpen, setModelIsOpen] = useState(false)
  const [userProfileToUpdate, setUserProfileToUpdate] = useState<User | null>(user)

  const userMetaData: { title: string; value: string }[] = [
    { title: 'First Name', value: 'first_name' },
    { title: 'Last Name', value: 'last_name' },
    { title: 'Email', value: 'email' },
    { title: 'Birth Date', value: 'birth_date' }
  ]

  function handleModel() {
    setModelIsOpen(!modelIsOpen)
  }

  async function handleUpdateProfile() {
    await updateUserProfile({
      first_name: userProfileToUpdate?.first_name as string,
      last_name: userProfileToUpdate?.last_name as string,
      birth_date: userProfileToUpdate?.birth_date as string,
      token: userProfileToUpdate?.token as string
    })

    navigate(0)

    handleModel()
  }

  useEffect(() => {
    setUserProfileToUpdate(user)
  }, [user])

  return (
    <>
      {user?.account_status === 'pending' && (
        <div className="not-approved-yet">⚠️ Your account has not been approved yet.</div>
      )}

      {user?.privilege === 'doctor' && (
        <div className="hello-sign">🥼 Hello Dr. {user?.first_name}!</div>
      )}

      {user?.privilege === 'admin' && (
        <div className="hello-sign">👩‍💻 Hello Mr. {user?.first_name}!</div>
      )}

      <section className="profile">
        <div className="profile-img-div">
          {/* <img src="" alt={`${user?.first_name} ${user?.last_name} profile`} /> */}
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
                <div className="dialog-body">
                  {userMetaData?.map((attribute, index) => {
                    if (attribute.value !== 'email') {
                      return (
                        <Input
                          key={index}
                          className="profile-meta-data-attribute"
                          type={'text'}
                          label={attribute.title}
                          placeholder={attribute.title}
                          value={(userProfileToUpdate as any)?.[attribute.value]}
                          setFunc={(val) => {
                            if (userProfileToUpdate !== null) {
                              setUserProfileToUpdate({
                                ...userProfileToUpdate,
                                [attribute.value]: val
                              })
                            }
                          }}
                        />
                      )
                    }
                  })}
                </div>

                <div className="dialog-footer">
                  <Button type="important" className="action-btn" onClick={handleModel}>
                    Cancel
                  </Button>

                  <Button
                    type="normal"
                    className="action-btn"
                    onClick={handleUpdateProfile}
                  >
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
