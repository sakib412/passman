import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import MainLayout from '@/components/Layout/Layout'

export const metadata = {
  title: 'Password manager',
  description: 'Password manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
