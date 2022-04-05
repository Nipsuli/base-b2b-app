# Skeleton B2B app

Building skeleton app for B2B context, basic features needed:
* authentication
* team management
* billing entity management
* access control
* event tracking to support Product Led Growth
* some dummy actions to fire those events

Stack:
* [remix](https://remix.run)
* [supabase](https://supabase.com)
* [Cloudflare Pages](https://pages.cloudflare.com)

I'll be streaming parts of the coding in [Twitch](https://www.twitch.tv/nipsuli) and the app will be used in in [This YouTube series](https://youtube.com/playlist?list=PLZRk_aw_oYVAhJUkC0Fk2gPC0096h0R8F) on building Minimum Viable PLG Setup. 

---

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.
