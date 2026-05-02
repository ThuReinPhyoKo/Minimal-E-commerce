// import { useLayoutEffect } from "react";

// export default function useLockBodyScroll(isOpen: boolean) {

//     useLayoutEffect(() => {
//         if(!isOpen) return;

//         if (typeof window === "undefined") return;

//         const originalStyle = window.getComputedStyle(document.body).overflow;
//         document.body.style.overflow = 'hidden';
           
//         return () => {
//             document.body.style.overflow = originalStyle;
//         };
//     }, [isOpen]);
// }

// import { useLayoutEffect } from "react";

// export default function useLockBodyScroll(isOpen: boolean) {
//     useLayoutEffect(() => {
//         if (typeof window === "undefined") return;

//         if (isOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }

//         return () => {
//             document.body.style.overflow = ''; 
//         };
//     }, [isOpen]);
// }

// import { useLayoutEffect } from "react";

// export default function useLockBodyScroll(isOpen: boolean) {
//     useLayoutEffect(() => {
//         // 1. Safety check for SSR
//         if (typeof window === "undefined") return;

//         // 2. If isOpen is false, we don't want to do anything 
//         // to the body yet, because other components might 
//         // need it locked.
//         if (!isOpen) return;

//         // 3. Lock the body
//         const originalOverflow = document.body.style.overflow;
//         document.body.style.overflow = 'hidden';

//         // 4. Cleanup: ONLY restore when THIS specific 
//         // component instance closes or unmounts.
//         return () => {
//             document.body.style.overflow = originalOverflow === 'hidden' ? '' : originalOverflow;
//         };
//     }, [isOpen]);
// }

import { useLayoutEffect } from "react";

export default function useLockBodyScroll(isOpen: boolean) {
    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        const lock = () => {
            document.body.style.setProperty('overflow', 'hidden', 'important');
        };

        const unlock = () => {
            document.body.style.removeProperty('overflow');
        };

        if (isOpen) {
            // We use requestAnimationFrame to ensure this happens 
            // AFTER the browser paints the modal/drawer
            requestAnimationFrame(() => {
                lock();
            });
        } else {
            unlock();
        }

        return () => {
            unlock();
        };
    }, [isOpen]);
}