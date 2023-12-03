import { configureStore } from '@reduxjs/toolkit'

import selfUserReducer from './selftUserSlice'

const store = configureStore({
  reducer: {
    selfUser: selfUserReducer
  }
})

export default store
