'use client'

import { Box, Typography, Button, styled } from '@mui/material'
import Checkbox from 'components/Checkbox'
import Accordion from 'components/Accordion'
import { useState } from 'react'
import Modal from 'components/Modal'

const vaults = [
  {
    title: 'Stable Yield – Treasury',
    desc: 'Low-risk fixed income opportunity with predictable APR',
    stats: [
      { label: 'AUM', value: '$8.3M' },
      { label: 'Min. Investment', value: '$10,000' },
      { label: 'Lock-up Period', value: 'Flexible' },
      { label: '30D APR', value: '3.64%' },
      { label: 'Redemptions', value: 'Weekly' },
      { label: 'Custody', value: 'DBS Bank' },
      { label: 'Underlying Assets', value: 'Tokenized U.S. Treasuries (via BUIDL)' }
    ]
  },
  {
    title: 'Stable Yield – Money Market',
    desc: 'Access short-duration U.S. debt with daily liquidity',
    stats: [
      { label: 'AUM', value: '$8.3M' },
      { label: 'Min. Investment', value: '$10,000' },
      { label: 'Lock-up Period', value: 'Flexible' },
      { label: '30D APR', value: '3.64%' },
      { label: 'Redemptions', value: 'Weekly' },
      { label: 'Custody', value: 'DBS Bank' },
      { label: 'Underlying Assets', value: 'Tokenized U.S. Treasuries (via BUIDL)' }
    ]
  }
]

const Card = styled(Box)(() => ({
  background: '#F7F7F7',
  borderRadius: '60px 0 0 60px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  gap: 14,
  padding: 20,
  marginBottom: 32,
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
  overflow: 'hidden',
  minHeight: 410
}))

const CardLeft = styled(Box)(() => ({
  background: 'linear-gradient(90deg, rgba(28,63,58,0.33) 0%, #1C3F3A 100%)',
  color: '#fff',
  width: 410,
  minWidth: 410,
  maxWidth: 410,
  minHeight: 410,
  flex: 'none',
  borderRadius: '64px 0 0 64px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 32px',
  position: 'relative'
}))

const CardRight = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
  borderRadius: 16,
  padding: '32px 32px 24px 32px',
  minHeight: 410,
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)'
}))

const DataGrid = styled(Box)(() => ({
  background: '#fff',
  borderRadius: 12,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  rowGap: 32,
  columnGap: 0,
  padding: '32px 24px 16px 24px',
  marginBottom: 16
}))

const DataCell = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 4
}))

const AssetRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0 24px',
  marginBottom: 24
}))

const SubscribeButton = styled(Button)(() => ({
  borderRadius: 100,
  padding: '12px 40px',
  fontWeight: 600,
  fontSize: 18,
  background: '#1C3F3A',
  color: '#fff',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    background: '#16302A',
    boxShadow: 'none'
  }
}))

const FAQSection = styled(Box)(() => ({
  background: '#fff',
  borderRadius: '24px',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
  padding: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
  width: '900px',
  maxWidth: '100%',
  margin: '0 auto'
}))

const FAQContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '16px',
  width: '900px',
  maxWidth: '100%'
}))

const FAQItem = styled(Box)(() => ({
  background: '#fff',
  border: '1px solid #DBE0E5',
  borderRadius: '12px',
  padding: '12px 15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%'
}))

const faqData = [
  {
    question: 'What are the eligibility criteria?',
    answer:
      'To be eligible for brand collaborations on CollabConnect, you must meet certain criteria, including having a minimum follower count on your social media platforms, maintaining a consistent posting schedule, and adhering to our community guidelines. Specific requirements may vary depending on the brand and campaign.'
  },
  {
    question: 'How do I get started with RWA Yield Vaults?',
    answer:
      'Getting started with RWA Yield Vaults is simple. First, ensure you meet the minimum investment requirements. Then, complete the onboarding process which includes KYC verification and wallet setup. Once approved, you can subscribe to any available vault through our platform.'
  },
  {
    question: 'What are the risks involved?',
    answer:
      'While RWA Yield Vaults offer attractive returns, they do carry certain risks including market volatility, regulatory changes, and potential liquidity constraints. We recommend thoroughly reading our risk disclosure documents before investing.'
  },
  {
    question: 'How often can I redeem my investments?',
    answer:
      'Redemption frequency varies by vault. Most vaults offer weekly redemptions, but some may have different schedules. Check the specific vault details for redemption terms and any applicable fees.'
  },
  {
    question: 'What is the minimum investment amount?',
    answer:
      'The minimum investment amount varies by vault, typically ranging from $10,000 to $50,000. Each vault displays its specific minimum investment requirement in the vault details.'
  }
]

export default function RwaYield() {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState(0)

  return (
    <Box sx={{ background: '#fff', width: '100%' }}>
      <Box
        sx={{
          maxWidth: 608,
          mx: 'auto',
          pt: '64px',
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.2,
            textAlign: 'center',
            color: '#000',
            mb: 0
          }}
        >
          RWA Yield Vaults
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '12px',
            background: '#F7F7F7',
            borderRadius: '12px',
            width: '100%',
            p: '8px',
            mb: '32px'
          }}
        >
          <Box
            sx={{
              background: '#fff',
              borderRadius: '12px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: '12px',
              minWidth: 0,
              gap: '10px'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 18,
                color: '#000',
                lineHeight: 1.3,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              RWA Yield Vaults
            </Typography>
          </Box>
          <Box
            sx={{
              background: '#fff',
              borderRadius: '12px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: '12px',
              minWidth: 0,
              gap: '10px'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 18,
                color: '#000',
                lineHeight: 1.3,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              Tokenized Global Markets
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 1122, mx: 'auto', mt: 6, mb: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {vaults.map((v, i) => (
            <Card key={i}>
              <CardLeft />
              <CardRight>
                <Typography
                  sx={{
                    fontFamily: 'Forma DJR Micro',
                    fontWeight: 700,
                    fontSize: 32,
                    color: '#000',
                    lineHeight: 1.2,
                    mb: 0
                  }}
                >
                  {v.title}
                </Typography>
                <Typography
                  sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 16, color: '#A0A0A0', lineHeight: 1.3, mb: 2 }}
                >
                  {v.desc}
                </Typography>
                <DataGrid>
                  {v.stats
                    .filter(s => s.label !== 'Underlying Assets')
                    .map((s, idx) => (
                      <DataCell key={idx}>
                        <Typography
                          sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 13, color: '#A0A0A0', mb: 0.5 }}
                        >
                          {s.label}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 20, color: '#000' }}>
                          {s.value}
                        </Typography>
                      </DataCell>
                    ))}
                </DataGrid>
                <AssetRow>
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 13, color: '#A0A0A0', mb: 0.5 }}>
                    Underlying Assets
                  </Typography>
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 16, color: '#000' }}>
                    {v.stats[6]?.value}
                  </Typography>
                </AssetRow>
                <Box sx={{ width: '100%', mt: 2 }}>
                  <SubscribeButton disableElevation fullWidth>
                    Subscribe
                  </SubscribeButton>
                </Box>
              </CardRight>
            </Card>
          ))}
        </Box>
        <Modal customIsOpen={open} customOnDismiss={() => setOpen(false)} closeIcon width="400px">
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#000' }}>
              Subscribe to Vault
            </Typography>
            <Checkbox
              checked={checked}
              onChange={() => setChecked(c => !c)}
              label="I have read and agree to the terms."
            />
            <SubscribeButton
              variant="contained"
              disabled={!checked || submitting}
              onClick={async () => {
                setSubmitting(true)
                setTimeout(() => {
                  setSubmitting(false)
                  setSuccess(true)
                  setTimeout(() => {
                    setSuccess(false)
                    setOpen(false)
                  }, 1500)
                }, 1200)
              }}
            >
              {submitting ? 'Submitting...' : success ? 'Success!' : 'Confirm Subscribe'}
            </SubscribeButton>
          </Box>
        </Modal>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ width: '100%', background: '#F7F7F7', py: '64px', display: 'flex', justifyContent: 'center' }}>
        <FAQSection>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              width: '850px',
              maxWidth: '100%'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: 52,
                    lineHeight: 1.2,
                    textAlign: 'center',
                    color: '#000'
                  }}
                >
                  FAQ
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: 1.3,
                    textAlign: 'center',
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Subheading
                </Typography>
              </Box>
            </Box>
          </Box>

          <FAQContainer>
            {faqData.map((faq, index) => (
              <FAQItem key={index}>
                <Accordion
                  summary={
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: 18,
                        lineHeight: 1.3,
                        color: '#121417',
                        textAlign: 'left'
                      }}
                    >
                      {faq.question}
                    </Typography>
                  }
                  details={
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: 16,
                        lineHeight: 1.3,
                        color: 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'left',
                        padding: '0 0 8px 0'
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  }
                  expanded={expandedFAQ === index}
                  onChange={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                />
              </FAQItem>
            ))}
          </FAQContainer>
        </FAQSection>
      </Box>
    </Box>
  )
}
