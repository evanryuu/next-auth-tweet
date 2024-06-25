import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import Twitter from 'next-auth/providers/twitter'

export const authOptions: NextAuthOptions = {
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: '2.0',
      httpOptions: {
        timeout: 15 * 1000,
        // timeout: 100000,
      },
      authorization: {
        params: {
          scope: 'users.read tweet.read tweet.write offline.access like.read list.read',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account = {} }) {
      // Persist the OAuth access_token to the token right after signin
      console.log('login token', token)
      console.log('login account', account)
      if (account) {
        if (account.provider && !token[account.provider]) {
          token[account.provider] = {}
        }
        if (account.access_token) {
          token[account.provider].accessToken = account.access_token
        }
        if (account.refresh_token) {
          token[account.provider].refreshToken = account.refresh_token
        }
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      return session
    },
    async redirect({ url }) {
      return url
    },
  },
}
export default NextAuth(authOptions)
