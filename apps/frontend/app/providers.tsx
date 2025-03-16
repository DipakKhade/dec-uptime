
import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"

export const Providers = ({children}:{
    children:ReactNode
}) =>{
    return <>
        <ClerkProvider>
            {children}
        </ClerkProvider>
    </>
}