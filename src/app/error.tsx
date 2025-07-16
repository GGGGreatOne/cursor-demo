'use client'
import * as Sentry from '@sentry/nextjs'
import React from 'react'

export default function GlobalError({ error }: { error: Error }) {
  React.useEffect(() => {
    if (error) {
      Sentry.captureException(error)
    }
  }, [error])
  return <div>发生错误: {error.message}</div>
}
