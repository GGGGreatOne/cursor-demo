import { Box, Typography, Button, styled } from '@mui/material'
import { useState } from 'react'

const PanelContainer = styled(Box)(() => ({
  background: '#fff',
  borderRadius: 16,
  padding: '24px 16px 4px',
  width: 490,
  display: 'flex',
  flexDirection: 'column',
  gap: 16
}))

const TabAprRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8
}))

const StyledTab = styled(Button)<{ active?: boolean }>(({ active }) => ({
  background: active
    ? 'linear-gradient(180deg, rgba(255, 197, 61, 0.10) 0%, rgba(255, 197, 61, 0.00) 100%)'
    : 'transparent',
  color: active ? '#915930' : '#646464',
  fontFamily: 'Bai Jamjuree',
  fontWeight: 600,
  fontSize: 20,
  textTransform: 'uppercase',
  borderRadius: '16px 16px 0 0',
  minWidth: 0,
  padding: '18px 70px',
  lineHeight: 1.4,
  boxShadow: 'none',
  border: 'none',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    background: 'linear-gradient(180deg, rgba(255, 197, 61, 0.10) 0%, rgba(255, 197, 61, 0.00) 100%)',
    boxShadow: 'none'
  }
}))

const AprCard = styled(Box)(() => ({
  background: '#FCFCFC',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: 6,
  width: 90,
  marginBottom: 8,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}))

const AprTitle = styled(Box)(() => ({
  background: '#E0E0E0',
  borderRadius: '6px 6px 0 0',
  textAlign: 'center',
  fontFamily: 'Forma DJR Micro',
  fontWeight: 400,
  fontSize: 12,
  color: 'rgba(0,0,0,0.8)',
  padding: '2px 0',
  letterSpacing: '2%'
}))

const AprValue = styled(Box)(() => ({
  textAlign: 'center',
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 16,
  color: '#887B5A',
  padding: '2px 0',
  lineHeight: 1.3
}))

const AssetInfo = styled(Box)(() => ({
  border: '1px solid #E0E0E0',
  borderRadius: 8,
  padding: 16,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 32
}))

const InfoGroup = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'flex-start',
  minWidth: 0
}))

const InfoLabel = styled(Typography)(() => ({
  fontFamily: 'Forma DJR Micro',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: '2%',
  color: 'rgba(0,0,0,0.5)',
  textAlign: 'left'
}))

const InfoValue = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: 1.3,
  color: '#000',
  textAlign: 'left'
}))

const InputCard = styled(Box)(() => ({
  border: '1px solid #E0E0E0',
  borderRadius: 8,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8
}))

const InputLabel = styled(Typography)(() => ({
  fontFamily: 'Forma DJR Micro',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: '2%',
  color: 'rgba(0,0,0,0.5)',
  textAlign: 'left'
}))

const InputRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 87,
  width: '100%'
}))

const InputAmount = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 24,
  lineHeight: 1.3,
  color: '#000',
  textAlign: 'left'
}))

const InputMaxBtn = styled(Button)(() => ({
  minWidth: 0,
  minHeight: 0,
  height: 20,
  padding: '2px 8px',
  fontSize: 14,
  fontWeight: 500,
  color: '#000',
  background: 'transparent',
  borderRadius: 6,
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': { background: '#F7F7F7' }
}))

const InputBottomRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  width: '100%'
}))

const InputBalanceRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4
}))

const InputBalanceLabel = styled(Typography)(() => ({
  fontFamily: 'Forma DJR Micro',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: '2%',
  color: 'rgba(0,0,0,0.5)',
  textAlign: 'left'
}))

const InputBalanceValue = styled(Typography)(() => ({
  fontFamily: 'Forma DJR Micro',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: '2%',
  color: 'rgba(0,0,0,0.5)',
  textAlign: 'left'
}))

const InputMin = styled(Typography)(() => ({
  fontFamily: 'Forma DJR Micro',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: '2%',
  color: 'rgba(0,0,0,0.5)',
  textAlign: 'left'
}))

const SubscribeBtn = styled(Button)(() => ({
  width: '100%',
  borderRadius: 100,
  background: '#1C3F3A',
  color: '#fff',
  height: 45,
  fontWeight: 500,
  fontSize: 16,
  padding: '16px',
  marginTop: 8,
  '&:hover': { background: '#16302A' }
}))

export default function RwaProductActionPanel() {
  const [tab, setTab] = useState(0)
  const [amount, setAmount] = useState('12907')

  return (
    <PanelContainer>
      {/* Tabs */}
      <TabAprRow>
        <>
          <StyledTab active={tab === 0} onClick={() => setTab(0)}>
            Subscribe
          </StyledTab>
          <StyledTab active={tab === 1} onClick={() => setTab(1)}>
            Redeem
          </StyledTab>
        </>
        <AprCard>
          <AprTitle>Prime APR</AprTitle>
          <AprValue>+3.55%</AprValue>
        </AprCard>
      </TabAprRow>
      {/* Asset Info */}
      <AssetInfo>
        <InfoGroup>
          <InfoLabel>Total AUM</InfoLabel>
          <InfoValue>$11,612,655</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Custody</InfoLabel>
          <InfoValue>DBS Bank</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>My Position</InfoLabel>
          <InfoValue>$12,000</InfoValue>
        </InfoGroup>
      </AssetInfo>
      {/* Input Card */}
      <InputCard>
        <InputLabel>Amount to Subscribe</InputLabel>
        <InputRow>
          <InputAmount>${amount}</InputAmount>
        </InputRow>
        <InputBottomRow>
          <InputMin>Min. Investment: $10,000</InputMin>
          <InputBalanceRow>
            <InputBalanceLabel>Balance:</InputBalanceLabel>
            <InputBalanceValue>$21,319</InputBalanceValue>
            <InputMaxBtn onClick={() => setAmount('21319')}>Max</InputMaxBtn>
          </InputBalanceRow>
        </InputBottomRow>
      </InputCard>
      {/* Description */}
      <Typography sx={{ fontFamily: 'Forma DJR Micro', fontSize: 14, color: '#000', whiteSpace: 'pre-line', mb: 1 }}>
        Yield begins: 24h after subscription{`\n`}Redemption eligibility date: 2025-05-04
      </Typography>
      {/* Button */}
      <SubscribeBtn>Subscribe</SubscribeBtn>
    </PanelContainer>
  )
}
