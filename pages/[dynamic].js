import React from 'react'
import { useRouter } from "next/router"
import head from "next/head"

const DynamicRouter = () => {

    const router = useRouter()
    const query = router.query.dynamic
    return (
        <div>
            <head>
                <title>
                    {query}
                </title>
            </head>
            Hii there I am dynamic route {query}
        </div>
    )
}

export default DynamicRouter
