export type User = {
  email: string
  first_name: string
  last_name: string
  birth_date: string
  privilege: 'patient' | 'doctor' | 'admin'
  account_status: 'pending' | 'approved'
  token: string
}

export type UserProfile = {
  first_name: string
  last_name: string
  birth_date: string
  token: string
}
