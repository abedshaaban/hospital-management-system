import Home from '@/pages/home'
import Admin from '@/pages/u/admin'
import Doctor from '@/pages/u/doctor'
import Patient from '@/pages/u/patient'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/u/patient" element={<Patient />} />
        <Route path="/u/doctor" element={<Doctor />} />
        <Route path="/u/admin" element={<Admin />} />
        <Route path="*" element={<>404 page not found</>} />
      </Routes>
    </BrowserRouter>
  )
}
