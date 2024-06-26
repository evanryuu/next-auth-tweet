import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from "twitter-api-v2";
import { HttpsProxyAgent } from "https-proxy-agent";
import { NextRequest } from "next/server";

// 本地开发需要用代理
const proxy = process.env.HTTP_PROXY || "http://127.0.0.1:7890";
const httpAgent = new HttpsProxyAgent(proxy);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { content: string };
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    // const twitterClient = new TwitterApi({
    //   appKey: process.env.TWITTER_CLIENT_ID!, // from Twitter.
    //   appSecret: process.env.TWITTER_CLIENT_SECRET!, // from Twitter.
    //   accessToken: token.twitter.accessToken, // from your User (oauth_token)
    //   accessSecret: token.twitter.refreshToken, // from your User (oauth_token_secret)
    // })
    const params = {
      appKey: process.env.TWITTER_CONSUMER_KEY!,
      appSecret: process.env.TWITTER_CONSUMER_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    };

    const v1client = new TwitterApi(params, { httpAgent });

    // mediaIds is a string[], can be given to .tweet
    const mediaIds = await Promise.all([
      v1client.v1.uploadMedia("./atsumu.png", {
        additionalOwners: [token!.sub!],
      }),
    ]);
    console.log("---mediaIds", mediaIds);
    console.log("---token!.sub!", token!.sub!);
    console.log("---token", token);
    // @ts-ignore
    // const twitterClient = new TwitterApi(token.twitter.accessToken, {
    const twitterClient = new TwitterApi(token.twitter.accessToken, {
      httpAgent,
    });
    const res1 = await twitterClient.v2.tweet({
      text: body.content,
      media: { media_ids: mediaIds },
    });
    return Response.json({
      code: 200,
      data: {
        media: mediaIds,
        postRes: res1,
        // token,
      },
    });
  } catch (err) {
    console.log("err", err);
  }
}
