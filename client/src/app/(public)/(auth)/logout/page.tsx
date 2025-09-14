'use client'

import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function LogoutPage() {
  const { mutateAsync } = useLogoutMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshTokenFromURL = searchParams.get('refreshToken')
  const accessTokenFromURL = searchParams.get('accessToken')
  // lấy refreshToken từ query param
  const isLoggingOut = useRef(null)
  // tạo một biến để giữ trạng thái đăng xuất, tránh việc gọi nhiều lần

  useEffect(() => {
    if (
      isLoggingOut.current ||
      (refreshTokenFromURL && refreshTokenFromURL !== getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromURL && accessTokenFromURL !== getAccessTokenFromLocalStorage())
    )
      return
    mutateAsync().then(() => {
      router.push('/login')
      setTimeout(() => {
        isLoggingOut.current = null
      }, 2000)
      // đặt lại biến sau 2 giây logout
    })
  }, [mutateAsync, router, refreshTokenFromURL, accessTokenFromURL])

  return <div>Logging out...</div>
}
