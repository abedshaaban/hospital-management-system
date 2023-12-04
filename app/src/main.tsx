import React from 'react'
import App from '@/App.tsx'
import store from '@/provider/store'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
