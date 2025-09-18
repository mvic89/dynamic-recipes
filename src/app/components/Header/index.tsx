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
  <header className="bg-amber-100">
    <div className="w-full max-w-[1200px] mx-auto px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-center text-center sm:text-left  gap-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">My Recipes</h1>
        </Link>

        {user && (
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-500 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-gray-500 font-semibold transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-gray-500 font-semibold transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          </nav>
        )}
      </div>
    </div>
  </header>
  )
}

export default Header