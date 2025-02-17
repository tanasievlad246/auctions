import { auth0 } from '@/lib/auth0';
import { ApiAuthToken } from '@/components/ApiAuthToken';

export default async function Home() {
  const session = await auth0.getSession()
  const LOGIN_URL = `/auth/login?audience=${process.env.AUTH0_API_AUDIENCE}`;

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href={LOGIN_URL}>Log in</a>
      </main>
    )
  }

  return (
    <main>
      <a href="/auth/logout">Logout</a>
      <h1>Welcome, {session.user.name}!</h1>
      <ApiAuthToken />
    </main>
  )
}
