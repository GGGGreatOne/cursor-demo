'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function BBB() {
  const params = useParams<{ aaa?: string; bbb?: string }>() || {}
  return (
    <div>
      {params.bbb} / {params.aaa}
    </div>
  )
}
