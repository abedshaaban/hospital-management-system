import { User, UserProfile } from '@/types/user'
import axios from 'axios'

export async function getUserByToken(token: string) {
  let user: User | null = null

  const res = await axios.post(
    'http://localhost/hospital-management-system/api/user/refresh-token.php',
    {
      token: token
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )

  if (res?.data?.status) {
    user = res?.data?.data
  }

  return user
}

export function removeJWTToken() {
  if (window.localStorage) {
    window.localStorage.removeItem('cookie')
  } else {
    console.log('no window on client side.')
  }
}

export async function updateUserProfile({
  first_name,
  last_name,
  email,
  birth_date,
  token
}: UserProfile) {
  const res = await axios.post(
    'http://localhost/hospital-management-system/api/user/update-user-profile.php',
    {
      first_name,
      last_name,
      email,
      birth_date,
      token
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )

  console.log(res)
}
