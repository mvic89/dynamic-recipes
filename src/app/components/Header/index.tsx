'use client'
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";
import Link from "next/link";

const Header = () => {
  const { user } = useUserContext() as UserContextType;

  return (
  <header className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">My Recipes</h1>
      {user && (
        <>
          <h2 className="text-lg">Hi! {user.name}</h2>
          {user.favouriteCategory && (
            <h3>You really like {user.favouriteCategory}</h3>
          )}
          <nav className="mt-4 flex gap-4 text-blue-500 underline">
            <Link href="/">Home</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/profile">Profile</Link>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header