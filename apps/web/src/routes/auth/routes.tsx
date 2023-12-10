import { Route, Routes } from 'react-router-dom'
import { Callback } from './callback'
import { Login } from './login'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={'/auth/login'} element={<Login />} />
      <Route path={'/auth/callback'} element={<Callback />} />
    </Routes>
  )
}
