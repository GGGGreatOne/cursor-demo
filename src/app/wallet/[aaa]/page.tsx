'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function AAA() {
  const params = useParams<{ aaa?: string }>() || {}
  return <div>{params.aaa}</div>
}
