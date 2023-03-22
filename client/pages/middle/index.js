import React from "react";
import { useAuth } from '../../src/context/AuthContext'
import { useRouter } from "next/navigation";
function Page() {
    const { user } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return router.push("/admin")
}

export default Page;