"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ImShare } from 'react-icons/im'
import { Input } from './ui/input'
import { toast } from 'sonner'

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mount, setMount] = useState(false)
  useEffect(() => { setMount(true) }, [])
  if (!mount) return null;
  const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div className='flex flex-grow gap-4 items-center'>
      <Input readOnly value={shareLink}/>
      <Button onClick={()=>{
        navigator.clipboard.writeText(shareLink);
        toast.success("Link Copied to Clipboard")
      }} className='max-w-[250px]'>
        <ImShare className='mr-2 h-4 w-4'/>
        Share Link
        </Button> 

    </div>
  )
}

export default FormLinkShare