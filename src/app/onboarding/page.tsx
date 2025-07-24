'use client'
import React, { useState } from 'react'
import Login from '../../components/Login'
import SuccessCard from '../../components/Login/SuccessCard'
import WaitlistCard from '../../components/Login/WaitlistCard'
import { Typography } from '@mui/material'

export default function Onboarding() {
  const [step, setStep] = useState(0)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#444'
      }}
    >
      <Typography sx={{ fontSize: 40, fontWeight: 700, lineHeight: '120%', mb: 24 }}>Get Access</Typography>
      {step === 0 && <Login onSuccess={() => setStep(1)} />}
      {step === 1 && <SuccessCard onContinue={() => setStep(2)} />}
      {step === 2 && <WaitlistCard onContinue={() => setStep(0)} />}
    </div>
  )
}
