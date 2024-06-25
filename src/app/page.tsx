import LoginBtn from '@/components/login-btn'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import Form from '@/components/form'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginBtn session={session} />
      <Form />
    </main>
  )
}
