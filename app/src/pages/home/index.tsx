import Input from '@/components/ui/input'

import './index.css'

import { useState } from 'react'

export default function Home() {
  const [credentials, setCredentials] = useState({
    email: '',
    pwd: ''
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
        </div>

        <div className="home-form-footer center">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  )
}
