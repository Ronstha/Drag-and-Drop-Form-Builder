import Logo from "@/components/Logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ReactNode } from "react";


function Layout({children}:{children:ReactNode}){
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="flex flex-row justify-between items-center px-4 py-2 border-b border-border h-[60px]">
                <Logo/>
                <div className="flex gap-4 items-center">
                <ThemeSwitcher/>

                </div>
            </nav>
            <main className="flex w-full flex-grow h-full items-center justify-center">{children}</main>
        </div>
    )
}

export default Layout