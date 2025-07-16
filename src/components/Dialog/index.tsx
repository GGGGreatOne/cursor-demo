import { Box, Button, Dialog, Input, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'


export const F2ADialog = ({ open, setOpen } : { open: boolean; setOpen: (o: boolean) => void }) => {
  const [secretIns, setSecretIns] = useState<speakeasy.GeneratedSecret | undefined>(undefined)
  const [QRCodeImg, setQRCodeImg] = useState<string | null>(null)
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)
  const generateSecret = useCallback(async () => {
    const secret = speakeasy.generateSecret({
      name: 'Test APP',
      issuer: 'BounceBit'
    })
    console.log('secret?.otpauth_url', secret?.otpauth_url)
    QRCode.toDataURL(secret?.otpauth_url ?? '').then((r) => {
      setQRCodeImg(r)
    })
    setSecretIns(secret)
  }, [])

  const verifyCode = useCallback(() => {
    if (secretIns?.base32 && authCode) {
      console.log('authCode', authCode)
      console.log('secretIns', secretIns.base32)
      const token = speakeasy.totp({
        secret: secretIns.base32,
        encoding: 'base32'
      })
      console.log('token', token)
      speakeasy.totp.verify({
        secret: secretIns.base32,
        encoding: 'base32',
        token: authCode,
        window: 1
      })

      const isValid = speakeasy.totp.verify({
        secret: secretIns.base32,
        encoding: 'base32',
        token: authCode,
        window: 1
      })
      console.log('is valid', isValid)
      setVerified(isValid)
    }
  }, [secretIns, authCode])

  useEffect(() => {
    generateSecret().then()
  }, [])

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: '32px' }}>
        <Typography>enter setup key</Typography>
        <Box>
          <Box>
            <Typography>scan the QR code with your authenticator app</Typography>
            <img src={QRCodeImg ?? ''} alt="QRCode" height="200" width="200" />
            {/*<Button onClick={generateQRCode}>Generate QRCode</Button>*/}
          </Box>
          <Box>
            <Typography>or enter the code manually in the app</Typography>
            <Typography>{secretIns?.base32}</Typography>
          </Box>
          <Input onChange={s => setAuthCode(s.target.value)} value={authCode} />
          <Button onClick={verifyCode}>Verify</Button>
        </Box>
      </Box>
    </Dialog>
  )
}
