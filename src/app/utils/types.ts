export interface FavouriteMeal {
  id: string;
  name: string;
}

export interface UserType {
  name: string,
  favouriteCategory: string | null,
  favouriteRecipe: FavouriteMeal[],
  password: string
}

export interface UserContextType {
  user: UserType | null,
  setUser: (user: UserType | null) => void;
}
