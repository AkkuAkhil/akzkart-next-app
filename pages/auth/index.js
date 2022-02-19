import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();

  const accessToken = session?.accessToken ? session.accessToken : null;
  const name = session?.user?.name ? session.user.name : null;
  const email = session?.user?.email ? session.user.email : null;
  const image = session?.user?.image ? session.user.image : null;

  if (session) {
    return (
      <>
        <p>accessToken: {accessToken}</p>
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>image: {image}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
}
