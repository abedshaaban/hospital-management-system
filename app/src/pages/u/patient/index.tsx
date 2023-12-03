import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './index.css'

import { User } from '@/types/user'

export default function Patient() {
  const [user, _setUser] = useState<User | null>(
    useSelector((state: any) => state.selfUser.user)
  )

  useEffect(() => {
    console.log('User from Redux store:', user)
  }, [])

  return <>{user && <div>patient: {user?.first_name}</div>}</>
}
