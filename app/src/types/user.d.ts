export type User = {
  email: string
  first_name: string
  last_name: string
  birth_date: string
  privilege: string
  account_status: 'pending' | 'approved'
  token: string
}
