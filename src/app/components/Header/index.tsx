'use client'
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";

const Header = () => {
  const { user } = useUserContext() as UserContextType;

  return (
    <header>
      <h1>My Recipes</h1>
      {user && <h2>Hi! {user.name}</h2>}
      {user && user.favouriteCategory && <h3>You really like {user.favouriteCategory}</h3>}
    </header>
  )
}

export default Header