import { Box, Button, Container, Divider, Select, Stack, Typography, styled, MenuItem, InputLabel } from '@mui/material'

import Checkbox from 'components/Checkbox'
import Input from 'components/Input'
import { SupportedChainId } from 'constants/chains'
import { Currency, CurrencyAmount } from 'constants/token'
import { useApproveCallback } from 'hooks/useApproveCallback'
import Head from 'next/head'
import { useUpdateThemeMode, useWalletModalToggle } from 'state/application/hooks'
import { MuiCustomThemeProvider } from 'provider/MuiThemeProvider'
import { useActiveWeb3React } from 'hooks'
import { shortenAddress } from 'utils'
import { useCallback, useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { F2ADialog } from '../components/Dialog'

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: 20,
  minHeight: '100vh'
}))

function ConnectButton() {
  const { account } = useActiveWeb3React()
  const walletModalToggle = useWalletModalToggle()

  // fix hydration err
  // const [isClient, setIsClient] = useState(false)
  // useEffect(() => {
  //   setIsClient(true)
  // }, [])

  return (
    <Stack>
      <Button
        variant={'outlined'}
        onClick={() => {
          walletModalToggle()
        }}
      >
        {<>{account ? shortenAddress(account) : 'wallet connect'}</>}
      </Button>
    </Stack>
  )
}

export default function Home() {
  const { toggleThemeMode } = useUpdateThemeMode()
  const [openF2A, setOpenF2A] = useState(false)
  const [, run] = useApproveCallback(
    new CurrencyAmount(
      new Currency(SupportedChainId.SEPOLIA, '0x50cfe8075Ff70CBBe14b65D46a12AB71bCf79758', 18, 'ST'),
      '10000000000000000000'
    ),
    '0x5069129410122A4C1F2448c77becDc5A8A784a5D'
  )

  const reportError = useCallback(async (fn: () => void) => {
    if (Sentry) {
      try {
        fn()
      } catch (error: any) {
        Sentry.captureException(error)
        console.log('sending over')
      }
    }
  }, [])

  return (
    <>
      <F2ADialog setOpen={o => setOpenF2A(o)} open={openF2A} />
      <Head>
        <title>Next base app</title>
      </Head>
      <StyledContainer maxWidth="md">
        <Box display={'grid'} justifyItems={'center'} gap={20}>
          <Button variant={'outlined'} onClick={() => toggleThemeMode()}>
            <span>toggle theme</span>
          </Button>
          <ConnectButton />
          <Button
            variant={'outlined'}
            onClick={async () => {
              const fn = () => {
                const errorStr = 'sentry test error'
                throw new Error(errorStr)
              }
              await reportError(fn)
            }}
          >
            <span>Report Errors</span>
          </Button>
          <Button onClick={run} variant="contained" fullWidth>
            Approve
          </Button>
          <Button onClick={() => setOpenF2A(true)}>Show F2A Bind</Button>
        </Box>
        <>
          <Select inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
          </Select>
        </>
        <Stack spacing={10}>
          <Typography variant="h1">h1 Typography</Typography>
          <Typography variant="body1">Typography</Typography>
          <Input value={''} label="label" />

          <Checkbox checked />

          <Divider />

          <MuiCustomThemeProvider>
            <Typography variant="h1">Custom Theme</Typography>
            <Button onClick={run} variant="contained">
              run
            </Button>
          </MuiCustomThemeProvider>
        </Stack>
      </StyledContainer>
    </>
  )
}
