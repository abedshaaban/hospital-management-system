import Input from '@/components/ui/input'

import './index.css'

import { useState } from 'react'

export default function Home() {
  const [credentials, setCredentials] = useState({
    email: '',
    pwd: '',
    first_name: '',
    last_name: ''
  })

  const [signIn, setSignIn] = useState(false)

  function handleFormChange() {
    setSignIn(!signIn)
  }

  return (
    <div className="home">
      <form className="home-form">
        <div className="home-form-header flex-row">
          <h2
            className={`${signIn && 'home-form-header-not-active'}`}
            onClick={handleFormChange}
          >
            Register
          </h2>
          <h2
            className={`${!signIn && 'home-form-header-not-active'}`}
            onClick={handleFormChange}
          >
            Sign in
          </h2>
        </div>

        <div className="home-form-body flex-col">
          {signIn ? (
            <>
              <Input
                type={'email'}
                label={'Email:'}
                placeholder={'mohamad@gmail.com'}
                value={credentials.email}
                setFunc={(val) => {
                  setCredentials({ ...credentials, email: val })
                }}
                required
              />

              <Input
                type={'password'}
                label={'Password:'}
                placeholder={'*********'}
                value={credentials.pwd}
                setFunc={(val) => {
                  setCredentials({ ...credentials, pwd: val })
                }}
                required
              />
            </>
          ) : (
            <>
              <div className="flex-row home-form-body-two-inputs">
                <Input
                  type={'text'}
                  label={'First name:'}
                  placeholder={'Mohamad'}
                  value={credentials.first_name}
                  setFunc={(val) => {
                    setCredentials({ ...credentials, first_name: val })
                  }}
                  required
                />

                <Input
                  type={'text'}
                  label={'Last name:'}
                  placeholder={'Shaaban'}
                  value={credentials.last_name}
                  setFunc={(val) => {
                    setCredentials({ ...credentials, last_name: val })
                  }}
                  required
                />
              </div>

              <Input
                type={'email'}
                label={'Email:'}
                placeholder={'mohamad@gmail.com'}
                value={credentials.email}
                setFunc={(val) => {
                  setCredentials({ ...credentials, email: val })
                }}
                required
              />

              <Input
                type={'password'}
                label={'Password:'}
                placeholder={'*********'}
                value={credentials.pwd}
                setFunc={(val) => {
                  setCredentials({ ...credentials, pwd: val })
                }}
                required
              />
            </>
          )}
        </div>

        <div className="home-form-footer center">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  )
}
