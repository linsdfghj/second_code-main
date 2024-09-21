import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Amend.css'

const Amend = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const navigate = useNavigate()

  useEffect(() => {
    let timer
    if (isCountingDown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setIsCountingDown(false)
      setCountdown(60) // Reset countdown
    }
    return () => clearInterval(timer)
  }, [isCountingDown, countdown])

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value
    setPhoneNumber(value)

    // 验证手机号
    const phonePattern = /^1[3-9]\d{9}$/
    if (phonePattern.test(value)) {
      setPhoneNumberError('')
    } else {
      setPhoneNumberError('请输入正确的手机号！')
    }
  }
  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleRegister = () => {
    if (phoneNumberError === '' && password === confirmPassword) {
      navigate('/')
    } else {
      if (phoneNumberError !== '') {
        alert(phoneNumberError)
      } else if (password !== confirmPassword) {
        alert('密码和确认密码不匹配！')
      }
    }
  }

  const handleGetVerificationCode = () => {
    if (!isCountingDown) {
      setIsCountingDown(true)
    }
  }

  return (
    <div className='amend-all'>
      <div className='amendbox'>
        <div className='amend-logo'>
          <div className='amend-main'>
            <div className='amend-title'>
              修改密码
            </div>
            {/* 输入手机号 */}
            <div className='phone'>
              <input
                type='text'
                placeholder='注册手机号'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                pattern='^1[3-9]\d{9}$'
                title='请输入正确的手机号！'
              />
              {phoneNumberError && <div className='error-message'>{phoneNumberError}</div>}
            </div>

            {/* 输入验证码 */}
            <div className='code'>
              <input
                type='text'
                placeholder='验证码'
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
              {/* 获取验证码 */}
              <button onClick={handleGetVerificationCode} disabled={isCountingDown}>
                {isCountingDown ? `重新获取(${countdown}s)` : '获取验证码'}
              </button>
            </div>
            <div className='password-section'>
              {/* 输入新密码 */}
              <div className='password'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='新密码'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {/* 输入确认新密码 */}
              <div className='confirm-password'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='确认新密码'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>

              {/* 完成注册按钮 */}
              <div className='complete'>
                <button onClick={handleRegister}>确定</button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Amend
