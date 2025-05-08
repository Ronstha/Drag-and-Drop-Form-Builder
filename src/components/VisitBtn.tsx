"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
  const [mount, setMount] = useState(false)
  useEffect(() => { setMount(true) }, [])
  if (!mount) return null;
  const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <Button onClick={() => { window.open(shareLink, "_blank") }} className='w-[200px]'>
      Visit

    </Button>
  )
}

export default VisitBtn