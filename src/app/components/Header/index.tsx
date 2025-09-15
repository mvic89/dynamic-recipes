'use client'
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, setUser } = useUserContext() as UserContextType;
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);  
    router.push('/');
  };

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
            <button
              onClick={handleLogout}
              className="text-red-500 underline cursor-pointer"
            >
              Log Out
            </button>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header