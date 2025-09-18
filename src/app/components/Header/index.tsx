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
  <header>
    <div className="flex flex-row justify-between px-6 py-6 w-full max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold">My Recipes</h1>
      {user && (
        <>
          {user.favouriteCategory && (
            <h3>You really like {user.favouriteCategory}</h3>
          )}
          <nav className="mt-1 flex gap-4 text-blue-500 underline">
            <Link href="/">Home</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="mb-1 text-red-500 underline cursor-pointer"
            >Log Out</button>
          </nav>
        </>
      )}
    </div>
    </header>
  )
}

export default Header