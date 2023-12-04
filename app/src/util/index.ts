import { User } from '@/types/user'
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
