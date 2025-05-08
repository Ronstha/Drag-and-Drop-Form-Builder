"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage=({error}:{error:Error})=>{
    useEffect(()=>{
        console.log(error)
    },[error])
    return <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h2 className="text-destructive text-4xl">Something went wrong!!</h2>
        <Button asChild>
            <Link href={"/"}>
            Go Back to Home
            </Link>
        </Button>
    </div>

}
export default ErrorPage;