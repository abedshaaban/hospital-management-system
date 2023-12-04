import { useEffect, useState } from 'react'
import store from '@/provider/store'
import { User } from '@/types/user'

import './index.css'

import UserProfile from '@/components/userProfile'

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
      <UserProfile user={user} />
    </div>
  )
}
