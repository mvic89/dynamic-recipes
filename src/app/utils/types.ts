export interface UserType {
  name: string,
  favouriteCategory: string | null,
  favouriteRecipe: string[],
  password: string
}

export interface UserContextType {
  user: UserType | null,
  setUser: (user: UserType) => void
}
