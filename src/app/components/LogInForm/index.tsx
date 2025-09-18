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
  <form onSubmit={handleClick} className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
    <div className="flex flex-col">
      <label
        htmlFor="username"
        className="text-sm font-medium text-gray-700 mb-1"
      >Enter your username:</label>
      <input
        id="username"
        placeholder="Jamie Oliver"
        value={userInput}
        onChange={handleUsernameChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent"
      />
    </div>
    <div className="flex flex-col">
      <label
        htmlFor="password"
        className="text-sm font-medium text-gray-700 mb-1"
      >Enter your password:</label>
      <input
        id="password"
        placeholder="Olive Oil"
        type="password"
        value={passWordInput}
        onChange={handlePasswordChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition  duration-200"
    >Log In!</button>
  </form>
    {userNotFound && (
      <p className="text-red-500">No user found! Check your details.</p>
    )}
  </>
  )
}

export default LogInForm