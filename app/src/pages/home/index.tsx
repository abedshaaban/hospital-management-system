import axios from 'axios'

import Input from '@/components/ui/input'

import './index.css'

import { FormEvent, useState } from 'react'

export default function Home() {
  const [credentials, setCredentials] = useState({
    email: '',
    pwd: '',
    first_name: '',
    last_name: '',
    birth_date: ''
  })

  const [signIn, setSignIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  function handleFormChange() {
    setSignIn(!signIn)
  }

  function resetForm() {
    setCredentials({ email: '', pwd: '', first_name: '', last_name: '', birth_date: '' })
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let res

    if (signIn) {
      res = await axios.post(
        'http://localhost/hospital-management-system/api/signin.php',
        {
          email: credentials.email,
          password: credentials.pwd
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
    } else {
      res = await axios.post(
        'http://localhost/hospital-management-system/api/signup.php',
        {
          email: credentials.email,
          password: credentials.pwd,
          first_name: credentials.last_name,
          last_name: credentials.last_name,
          birth_date: credentials.birth_date
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      setSignIn(true)
    }

    resetForm()

    if (!res?.data?.status) {
      // handle error
      setErrorMsg(res?.data?.error)
    }

    console.log(res?.data)
  }

  return (
    <div className="home">
      <form onSubmit={handleFormSubmit} className="home-form">
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
          <div style={{ color: 'red' }} className="flex-row center">
            {errorMsg}
          </div>
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
                min={8}
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
                min={8}
              />

              <Input
                type={'date'}
                label={'Birth date:'}
                placeholder={'YYYY-MM-DD'}
                value={credentials.birth_date}
                setFunc={(val) => {
                  setCredentials({ ...credentials, birth_date: val })
                }}
                required
              />
            </>
          )}
        </div>

        <div className="home-form-footer center">
          <button type="submit">{signIn ? 'Sign in' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}
