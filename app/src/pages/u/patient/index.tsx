import { useEffect, useState } from 'react'
import store from '@/provider/store'
import { useSelector } from 'react-redux'

import './index.css'

import { User } from '@/types/user'

export default function Patient() {
  const { selfUser } = store.getState()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (selfUser?.user !== null) {
      setUser(selfUser?.user)
    }
  }, [selfUser.user])

  return (
    <div>
      patient: {user?.first_name}, {user?.last_name} - {user?.email}
    </div>
  )
}
