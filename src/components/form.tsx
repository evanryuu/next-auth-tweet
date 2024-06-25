'use client'

import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

const handleFetch = (content: string) => {
  fetch('/api/twitter/tweet', {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}
export default function Form() {
  const [text, setText] = useState('')

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="bg-slate-600 text-white p-1 rounded-md" onClick={() => handleFetch(text)}>
        Tweet
      </button>
    </div>
  )
}
