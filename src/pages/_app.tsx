import GoogleAnalyticsReporter from 'components/analytics/GoogleAnalyticsReporter'
import type { AppProps } from 'next/app'
import MuiThemeProvider from 'provider/MuiThemeProvider'
import ConnectProvider from 'provider/ConnectProvider'
import StateProvider from 'provider/StateProvider'
import { ModalProvider } from 'provider/ModalProvider'
import ApplicationUpdater from 'state/application/updater'
import TransactionsUpdater from 'state/transactions/updater'
import { MulticallUpdater } from 'state/multicall'
import BigNumber from 'bignumber.js'
import Popups from 'components/essential/Popups'
import 'styles/globals.css'
BigNumber.config({ EXPONENTIAL_AT: [-20, 40], ROUNDING_MODE: BigNumber.ROUND_DOWN })

function Updater() {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <TransactionsUpdater />
    </>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <ConnectProvider>
        <MuiThemeProvider>
          <Updater />
          <Popups />
          <GoogleAnalyticsReporter />
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </MuiThemeProvider>
      </ConnectProvider>
    </StateProvider>
  )
}
