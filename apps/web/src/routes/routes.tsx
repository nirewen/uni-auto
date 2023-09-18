import { Route, Routes } from 'react-router-dom'
import { Login } from './login'
import { Register } from './register'

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
    </Routes>
  )
}
