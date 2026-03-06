"use client"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../components/auth/store/authStore"
import { useEffect } from "react";

export default function RequiredLogin() {

    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if(isAuthenticated) {
            router.push("/dashboard")
        }
    }, [router, isAuthenticated])

    return (
        <section className="max-w-screen h-screen flex flex-col items-center justify-center">
            <p className="text-gray-700 font-inter text-center">To access the admin dashboard, you need to login as a demo user.</p>
        </section>
    )
}