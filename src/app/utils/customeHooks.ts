import { useEffect, useState } from "react"

export const useHasMounted = () => {
    const [hasMouted,setHasMounted] = useState<boolean>(false)
    useEffect(() => {
setHasMounted(true)
    },[])
    return hasMouted
}
