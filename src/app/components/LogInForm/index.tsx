'use client'
import { UserArray } from "@/app/data/users"
import { useState } from "react"
import { useUserContext } from "@/app/utils/contexts"
import { UserContextType } from "@/app/utils/types"

const LogInForm = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [passWordInput, setPassWordInput] = useState<string>('')
  const [userNotFound, setUserNotFound] = useState<boolean>(false)
  const {user, setUser} = useUserContext() as UserContextType;

const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const loggedInUser = UserArray.find(
      user => user.name === userInput && user.password === passWordInput
    )

    if (!loggedInUser) {
      setUserNotFound(true)
    } else {
      setUser(loggedInUser)
      setUserNotFound(false)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassWordInput(e.target.value)
  }

  return (
  <>
    <form>
      <label htmlFor="username">Enter your username</label>
      <input
        id="username"
        placeholder="Username"
        value={userInput}
        onChange={handleUsernameChange}
      />
      <label htmlFor="password">Enter your password</label>
      <input
        id="password"
        placeholder="Password"
        type="password"
        value={passWordInput}
        onChange={handlePasswordChange}
      />
      <button onClick={handleClick}>Log In!</button>
    </form>
    {userNotFound && (
      <p className="text-red-500">No user found! Check your details.</p>
    )}
  </>
  )
}

export default LogInForm