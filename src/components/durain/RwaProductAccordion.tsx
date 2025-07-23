import { useState } from 'react'
import { Box, Typography, Collapse, IconButton, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ACCORDION_DATA = [
  { title: 'Product Details', content: '这里是Product Details的详细内容。' },
  { title: 'Investment Strategy', content: '这里是Investment Strategy的详细内容。' },
  { title: 'Risk Disclosure', content: '这里是Risk Disclosure的详细内容。' },
  { title: 'Legal & Regulatory Info', content: '这里是Legal & Regulatory Info的详细内容。' },
  { title: 'Custody', content: '这里是Custody的详细内容。' }
]

const AccordionRoot = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}))

const AccordionItem = styled(Box)(({}) => ({
  background: '#fff',
  borderRadius: 12,
  boxShadow: '8px 8px 24px 0px rgba(2, 2, 70, 0.05)',
  padding: 0,
  overflow: 'hidden'
}))

const AccordionTitle = styled(Box)(({}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  cursor: 'pointer',
  userSelect: 'none'
}))

const TitleText = styled(Typography)(({}) => ({
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 18,
  color: '#000'
}))

const AccordionContent = styled(Box)(({}) => ({
  padding: '0 16px 16px 16px',
  fontFamily: 'Inter',
  fontSize: 16,
  color: '#333'
}))

export default function RwaProductAccordion() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const handleToggle = (idx: number) => {
    setOpenIndexes(prev => (prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]))
  }

  return (
    <AccordionRoot>
      {ACCORDION_DATA.map((item, idx) => (
        <AccordionItem key={item.title}>
          <AccordionTitle onClick={() => handleToggle(idx)}>
            <TitleText>{item.title}</TitleText>
            <IconButton
              size="small"
              sx={{
                transition: 'transform 0.2s',
                transform: openIndexes.includes(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                color: '#1E1E1E'
              }}
              disableRipple
            >
              <ExpandMoreIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </AccordionTitle>
          <Collapse in={openIndexes.includes(idx)} timeout="auto" unmountOnExit>
            <AccordionContent>{item.content}</AccordionContent>
          </Collapse>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}
