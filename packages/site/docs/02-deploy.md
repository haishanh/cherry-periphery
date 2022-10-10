---
sidebar_position: 2
description: How to deploy Cherry
---

# Deploy

Currently, Docker is the only supported way to deploy Cherry.

## Deploy with Docker

```bash
docker run -d --name cherry -v cherry_data_v1:/data \
  -p "8000:8000" \
  -e "JWT_SECRET=some-secret-string" \
  -e "ENABLE_PUBLIC_REGISTRATION=1" \
  haishanh/cherry
```

By default the SQLite database file will be created under `/data`, you should map a Docker [volume](https://docs.docker.com/storage/volumes/)(or [bind mount](https://docs.docker.com/storage/bind-mounts/)) to `/data` like the command above. `-e ENABLE_PUBLIC_REGISTRATION=1` will enable registration, you probably want to remove this or set it to `0` to disable registration if you already registered.

Cherry listens on port 8000 for HTTP traffic, in most of the cases you will want to expose Cherry with something like [Nginx](https://www.nginx.com/), [Caddy](https://caddyserver.com/), [Traefik](https://traefik.io/traefik/) or [Cloudflare tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) for SSL etc.

:::info

You may see this message in the docker logs

> Listening on 0.0.0.0:5173

This is printed by [SvelteKit](https://kit.svelte.dev/), a framework/library that powers Cherry. You should treat this port as a internal thing, don't use or expose this port outside of the container.

:::

:::caution note on cookie

Cherry uses [`Secure` cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies) which only works with HTTPS. It works with "localhost" in **some** browsers too, so you should try use "localhost:8000" instead of "127.0.0.1:8000" or "0.0.0.0:8000" when running locally.

If that doesn't work, try set the environment variable `USE_INSECURE_COOKIE` to `1`. You shouldn't set this flag after you've setup reverse proxy and got HTTPS working.

:::

## Environment Variables

**`JWT_SECRET`** (required)

This string will be used to sign user's PAT (Personal Access Token). PAT is in the format of a JWT (JSON Web Token), it's used to verify and identify an Cherry user. You should keep your `JWT_SECRET` a secret to prevent others from forging tokens.

**`ENABLE_PUBLIC_REGISTRATION`**

This value determins whether registration is enabled from outside (of your Cherry Docker container instance). Set it to `1` to enable registration. By default, or with other values, registration is disabled. Most likely you want to enable registration after the fresh deployment and disable it just after you've created the user.

:::info note

Without setting `ENABLE_PUBLIC_REGISTRATION` to `1` you can still register an user via the internal admin API inside the Docker container.

:::

**`USE_INSECURE_COOKIE`**

By default Cherry uses [`Secure` cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies) which only works with HTTPS. But if you want to try run Cherry on your localhost you may set this environment variable to `1` to temporarily disable secure cookie, or you may not able to sign in.

**`ENABLE_HTTP_REMOTE_USER`**, **`HTTP_REMOTE_USER_HEADER_NAME`**

Set `ENABLE_HTTP_REMOTE_USER` to `1` to enable authentication via the HTTP header "Remote-User"(can be changed use `HTTP_REMOTE_USER_HEADER_NAME`). This should **only** be enabled if you have an authentication gateway (like [Authelia](https://github.com/authelia/authelia) or [Authentik](https://github.com/goauthentik/authentik)) stands in front of Cherry that authenticates user. The value of the "Remote-User" header will be treated as `username` of a Cherry user. If this user doesn't exits, Cherry will create it automatically. In other places, Cherry may enforce you to use email as username, but it's not enforced in this case.

**`GOOGLE_OAUTH_CLIENT_ID`**, **`GOOGLE_OAUTH_CLIENT_SECRET`**, **`GOOGLE_OAUTH_REDIRECT_URI`**

These are required only if you want to enable "Sign in with Google". You can find your client ID and client secret after created the Google OAuth2 client. `GOOGLE_OAUTH_REDIRECT_URI` should be `{YOUR_CHERRY_BASE_URL}/api/auth/callback/google`, you will need to config it as one of the "Authorized redirect URIs" in your Goolge OAuth2 client.

Since you can have many "Authorized redirect URIs" in one client, you can acutally reuse this client for different applications(Of course this is a bad practice for serious stuff though). Note, it may take some time (5 minutes according to Google) for your "Authorized redirect URIs" change to take effect. 

**`DATABASE_PATH`**

This specify the location of the SQLite database file. By default the value is `/data/cherry.sqlite`.

**`PAGE_BOOKMARK_LIMIT`**

Bookmarks per page, default to `60`.
