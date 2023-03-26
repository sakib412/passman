import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

import { cookies } from 'next/headers'
import MainLayout from '@/components/Layout/Layout'
import axiosInstance from '@/utils/axios'
import { User } from '@/types/user'

export const metadata = {
  title: 'Password manager',
  description: 'Password manager',
}

const getUser = async (): Promise<User | null> => {
  const cookieStore = cookies()
  try {
    const { data } = await axiosInstance.get('/auth/me', {
      headers: {
        cookie: cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join('; ')
      }
    })
    return data.data

  } catch (e: any) {
    return null
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  return (
    <html lang="en">
      <body>
        <MainLayout user={user}>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
