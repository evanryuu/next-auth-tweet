import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import Twitter from 'twitter-lite'
import { TwitterApi } from 'twitter-api-v2'
import { HttpsProxyAgent } from 'https-proxy-agent'

// 本地开发需要用代理
const proxy = process.env.HTTP_PROXY || 'http://127.0.0.1:7890'
const httpAgent = new HttpsProxyAgent(proxy)

export async function POST(req) {
  const body = (await req.json()) as { content: string }
  const session = await getServerSession()
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('---', token)
  console.log('--------', session)

  try {
    // const twitterClient = new TwitterApi({
    //   appKey: process.env.TWITTER_CLIENT_ID!, // from Twitter.
    //   appSecret: process.env.TWITTER_CLIENT_SECRET!, // from Twitter.
    //   accessToken: token.twitter.accessToken, // from your User (oauth_token)
    //   accessSecret: token.twitter.refreshToken, // from your User (oauth_token_secret)
    // })
    const twitterClient = new TwitterApi(token.twitter.accessToken, {
      httpAgent,
    })

    // const results = await client.get('search/tweets', {
    //   q: body.content,
    // })
    // mediaIds is a string[], can be given to .tweet
    const res = await twitterClient.v2.tweet({
      text: body.content,
      // media: { media_ids: mediaIds }
    })
    return Response.json({
      code: 200,
      data: {
        statuses: res,
        token,
      },
    })
  } catch (err) {
    console.log('err', err)
  }
}
