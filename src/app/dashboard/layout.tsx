"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../components/auth/store/authStore";
import RequiredLogin from "../required-login/page";
import EditForm from "./forms/edit";
import AddForm from "./forms/add";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import { useFormStore } from "./store/formStore";

export default function LayoutDashboard({children} : {children: React.ReactNode}) {
    
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const form = useFormStore((s) => s.form);

    useLockBodyScroll(!!form)

    useEffect(() => {
        if(!isAuthenticated) {
            router.push("/required-login")
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) return <RequiredLogin />

    return(
        <>
            <EditForm />
            <AddForm />
            {children}
        </>
    )
}