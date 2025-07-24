import React, { useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Input from '../Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const codeRefs = useRef<(HTMLInputElement | null)[]>([])

  // 邮箱提交（仅校验，不切换 step）
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email')
      return
    }
    setError('')
    // 可在此处触发发送验证码逻辑
  }

  // 验证码输入
  const handleCodeChange = (idx: number, val: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(val)) return
    const newCode = [...code]
    newCode[idx] = val
    setCode(newCode)
    if (val && idx < 5) {
      codeRefs.current[idx + 1]?.focus()
    }
    if (!val && idx > 0) {
      codeRefs.current[idx - 1]?.focus()
    }
  }

  // 连续输入和粘贴支持
  const handleCodeInput = (
    e: React.ClipboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const inputVal = 'clipboardData' in e ? e.clipboardData.getData('Text') : e.target.value
    // 粘贴6位
    if (/^[0-9a-zA-Z]{6}$/.test(inputVal)) {
      setCode(inputVal.split('').slice(0, 6))
      inputVal.split('').forEach((char, i) => {
        const ref = codeRefs.current[i]
        if (ref) ref.value = char
      })
      if (codeRefs.current[5]) codeRefs.current[5].focus()
      e.preventDefault?.()
      return
    }
    // 连续输入多位
    if (inputVal.length > 1) {
      const chars = inputVal.split('').slice(0, 6 - idx)
      const newCode = [...code]
      chars.forEach((char, i) => {
        newCode[idx + i] = char
        const ref = codeRefs.current[idx + i]
        if (ref) ref.value = char
      })
      setCode(newCode)
      const lastRef = codeRefs.current[idx + chars.length - 1]
      if (lastRef) lastRef.focus()
      e.preventDefault?.()
      return
    }
    // 单字符输入（只处理输入，不处理删除跳格）
    if (inputVal.length <= 1) {
      handleCodeChange(idx, inputVal)
    }
  }

  // 验证码提交
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.some(c => !c)) {
      setError('Please enter the full code')
      return
    }
    setError('')
    // 验证逻辑
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        margin: '0 auto',
        alignItems: 'center',
        width: { xs: '100%', sm: 310, md: 468 },
        maxWidth: 468,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 40,
          lineHeight: '1.2em',
          color: '#fff',
          textAlign: 'center',
          mb: 0
        }}
      >
        Get Access
      </Typography>
      <Box
        sx={{
          width: { xs: '100%', sm: 310, md: 468 },
          maxWidth: 468,
          boxSizing: 'border-box',
          overflow: 'hidden',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          bgcolor: 'rgba(255,255,255,0.16)',
          borderRadius: '24px',
          boxShadow: '8px 8px 24px 0px rgba(2,2,70,0.05)',
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* 邮箱输入区和验证码区合并显示 */}
        <form onSubmit={handleEmailSubmit} style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'stretch', mb: 0 }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 24,
                color: '#fff',
                lineHeight: '1.3em',
                textAlign: 'left'
              }}
            >
              Continue with Your Email
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 16,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: '1.3em',
                textAlign: 'left'
              }}
            >
              We’ll check if you’re already on the waitlist or get you signed up in seconds.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mt: '32px' }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 16,
                color: '#fff',
                lineHeight: '1.3em',
                textAlign: 'left'
              }}
            >
              E-mail
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Please enter your email"
                type="email"
                outlined
                backgroundColor="rgba(255,255,255,0.16)"
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 36,
                  borderRadius: 100,
                  fontSize: 16,
                  color: '#fff',
                  padding: '10px 16px',
                  boxSizing: 'border-box'
                }}
                inputProps={{
                  style: { height: 36, padding: '10px 16px', fontSize: 16, color: '#fff', borderRadius: 100 }
                }}
              />
              <Button
                variant="contained"
                sx={{
                  height: 36,
                  minWidth: 72,
                  borderRadius: '100px',
                  bgcolor: '#1C3F3A',
                  color: '#fff',
                  px: '16px',
                  fontWeight: 500,
                  fontSize: 16,
                  boxShadow: 'none',
                  textTransform: 'none'
                }}
                type="submit"
              >
                verify
              </Button>
            </Box>
          </Box>
        </form>
        {/* 验证码区和底部提示区 */}
        <form onSubmit={handleCodeSubmit} style={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignSelf: 'stretch',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                alignSelf: 'center'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 16,
                  color: '#fff',
                  lineHeight: '1.3em',
                  textAlign: 'left'
                }}
              >
                Enter confirmation code
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  width: '100%',
                  maxWidth: 320,
                  boxSizing: 'border-box',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {code.map((c, i) => (
                  <React.Fragment key={i}>
                    <Input
                      id={`code-input-${i}`}
                      value={c}
                      onChange={e => handleCodeInput(e, i)}
                      onPaste={e => handleCodeInput(e, i)}
                      onKeyDown={e => {
                        if (e.key === 'Backspace' && !code[i] && i > 0) {
                          const prevRef = codeRefs.current[i - 1]
                          if (prevRef) {
                            prevRef.focus()
                            const newCode = [...code]
                            newCode[i - 1] = ''
                            setCode(newCode)
                            e.preventDefault()
                          }
                        }
                      }}
                      type="text"
                      ref={el => (codeRefs.current[i] = el)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: 'center',
                          fontSize: 24,
                          height: 56,
                          borderRadius: 8,
                          color: '#fff',
                          fontWeight: 500,
                          flex: 1,
                          maxWidth: 48,
                          minWidth: 0,
                        }
                      }}
                      outlined
                      backgroundColor="rgba(255,255,255,0.16)"
                      style={{
                        flex: 1,
                        maxWidth: 48,
                        minWidth: 0,
                        height: 56,
                        borderRadius: 8,
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: 24,
                        padding: 0,
                        textAlign: 'center',
                      }}
                    />
                    {i === 2 && (
                      <div
                        style={{
                          width: 10,
                          height: 2,
                          background: 'rgba(255,255,255,0.4)',
                          display: 'flex',
                          position: 'relative',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                width: '100%',
                alignItems: 'center',
                alignSelf: 'center'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Forma DJR Micro',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '1.4em',
                  letterSpacing: '2%',
                  color: '#fff',
                  opacity: 0.7,
                  textAlign: 'center'
                }}
              >
                Didn’t get an email?
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: '#D7CCAD',
                  fontFamily: 'Forma DJR Micro',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '1.4em',
                  letterSpacing: '2%',
                  textTransform: 'none',
                  minWidth: 0,
                  p: 0
                }}
              >
                Resend code
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: '100px',
                bgcolor: '#1C3F3A',
                color: '#fff',
                px: '16px',
                height: 36,
                fontWeight: 500,
                fontSize: 16,
                width: '100%',
                boxShadow: 'none',
                textTransform: 'none',
                mt: 2
              }}
              type="submit"
            >
              Verify
            </Button>
            {error && <Typography sx={{ color: 'error.main', fontSize: 14, mt: 1 }}>{error}</Typography>}
          </Box>
        </form>
      </Box>
    </Box>
  )
}
