import { useEffect } from 'react'
import Auth from '@/components/auth'
import Header from '@/components/header'
import Home from '@/pages/home'
import Admin from '@/pages/u/admin'
import Doctor from '@/pages/u/doctor'
import Patient from '@/pages/u/patient'
import { setSelfUser } from '@/provider/selftUserSlice'
import { User } from '@/types/user'
import { getUserByToken } from '@/util'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  const user: User | null = useSelector((state: any) => state.selfUser.user)
  const dispatch = useDispatch()

  const setUser = async (t: string) => {
    const userData = await getUserByToken(t)

    dispatch(setSelfUser(userData))
  }

  useEffect(() => {
    const token = window?.localStorage?.getItem('cookie')

    if (user === null && token) {
      const runSetUser = async () => {
        await setUser(token)
      }

      runSetUser()
    }
  }, [user])

  return (
    <BrowserRouter>
      {user && <Header />}

      <Routes>
        {user === null ? (
          <Route path="*" element={<Auth />} />
        ) : (
          <>
            <Route path="/" index element={<Home />} />
            <Route
              path="/u/patient"
              element={user.privilege === 'patient' && <Patient />}
            />
            <Route
              path="/u/doctor"
              element={
                user.privilege === 'doctor' ? <Doctor /> : <>You are not authorized.</>
              }
            />
            <Route
              path="/u/admin"
              element={
                user.privilege === 'admin' ? <Admin /> : <>You are not authorized.</>
              }
            />
            <Route path="*" element={<>404 page not found</>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}
