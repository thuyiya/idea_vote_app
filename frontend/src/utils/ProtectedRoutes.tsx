import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');

    return token?.length ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes