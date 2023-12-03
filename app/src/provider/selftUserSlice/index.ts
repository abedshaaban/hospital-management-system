import type { User } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null
}

export const selfUserSlice = createSlice({
  name: 'selfUser',
  initialState,
  reducers: {
    setSelfUser: (state, action: PayloadAction<User | null>) => {
      if (window.localStorage && action.payload?.token) {
        window.localStorage.setItem('cookie', action.payload?.token)
      }

      state.user = action.payload
    },

    getSelfUser: (state) => {
      return state.user
    },

    logoutSelfUser: (state) => {
      state.user = null
    }
  }
})

export const { setSelfUser, getSelfUser, logoutSelfUser } = selfUserSlice.actions
export default selfUserSlice.reducer
