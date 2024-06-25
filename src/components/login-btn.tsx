'use client'

import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginBtn({ session }: { session: Session | null }) {
  if (session) {
    return (
      <div>
        Signed in as {session?.user?.email} <br />
        <button className="bg-slate-600 px-2 py-1 rounded-md text-white" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    )
  }
  return (
    <div>
      Not signed in <br />
      <button className="bg-slate-600 px-2 py-1 rounded-md text-white" onClick={() => signIn('twitter')}>
        Sign in
      </button>
    </div>
  )
}
