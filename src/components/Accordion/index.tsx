import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
// import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface AccordionProps {
  summary: string | JSX.Element
  details: string | JSX.Element
  expanded: boolean
  onChange: () => void
}

export default function _Accordion({ summary, details, onChange, expanded }: AccordionProps) {
  return (
    <Accordion
      onChange={onChange}
      sx={{
        boxShadow: 'none',
        background: 'transparent',
        border: 'none',
        '& .MuiAccordionSummary-content': {
          margin: '20px 0'
        }
      }}
      expanded={expanded}
    >
      <AccordionSummary
        sx={{ fontSize: { xs: 14, md: 16 } }}
        expandIcon={expanded ? <RemoveIcon sx={{ color: '#929292' }} /> : <AddIcon sx={{ color: '#929292' }} />}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </Accordion>
  )
}
