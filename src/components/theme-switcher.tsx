"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsList } from "./ui/tabs"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react"


export const ThemeSwitcher=()=>{
    const {theme,setTheme}=useTheme()   
    const [mounted,setMounted]=useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted) return null    
    return <Tabs defaultValue={theme}>
        <TabsList className="border">
            <TabsTrigger value="light" onClick={()=>setTheme('light')}><SunIcon className="h-[1.2rem] w-[1.2rem]"/></TabsTrigger>
            <TabsTrigger value="dark" onClick={()=>setTheme('dark')}><MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0"/></TabsTrigger>
            <TabsTrigger value="system" onClick={()=>setTheme('system')}><ComputerIcon className="h-[1.2rem] w-[1.2rem]"/></TabsTrigger>
        </TabsList>
    </Tabs>

}