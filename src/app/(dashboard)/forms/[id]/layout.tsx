import { ReactNode } from "react"

const Layout=({children}:{children:ReactNode})=>{
    return <div className="flex w-full flex-col flex-grow mx-10">{children}</div>
}
export default Layout