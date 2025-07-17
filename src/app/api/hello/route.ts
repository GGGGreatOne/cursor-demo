import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('req', req)
  return NextResponse.json({ name: 'John Doe' })
}
