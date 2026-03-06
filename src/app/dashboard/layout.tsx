"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../components/auth/store/authStore";
import RequiredLogin from "../required-login/page";

export default function LayoutDashboard({children} : {children: React.ReactNode}) {
    
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if(!isAuthenticated) {
            router.push("/required-login")
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) return <RequiredLogin />
    
    return(
        <>
            {children}
        </>
    )
}