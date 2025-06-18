import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PublicRoute({ children, redirectTo = '/dashboard' }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (user) {
    // User is already logged in, redirect to dashboard
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
