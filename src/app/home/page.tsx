"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <h1>{session.user?.name}</h1>
        <Image
          src={session.user?.image || "image/png"}
          alt="user image"
          width={96}
          height={96}
        />
        <h3>{session.user?.email}</h3>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <div>
      <h1>Not logged In</h1>
      <button onClick={() => signIn("google")}>Sign In With Google</button>
    </div>
  );
}

export default Home;
