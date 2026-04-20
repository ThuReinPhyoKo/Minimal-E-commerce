import { useState, useEffect } from "react";

export const useStoreReady = () => {
    const [ ready, setReady ] = useState(false);
    useEffect(() => {
        setReady(true)
    }, [])
    return ready;
}