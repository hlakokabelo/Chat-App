import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

export default function SignedInLayout() {
 
 
    const { authUser } = useAuthStore();
    return (authUser ? <Outlet /> : <Navigate to={'/signup'} />)
}
