import { useLayoutEffect } from "react";

export default function useLockBodyScroll(isOpen: boolean) {

    useLayoutEffect(() => {
        if(!isOpen) return;

        if (typeof window === "undefined") return;

        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
           
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);
}