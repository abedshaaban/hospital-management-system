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
