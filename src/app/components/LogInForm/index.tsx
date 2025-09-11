'use client'
import { UserArray } from "@/app/data/users"
import { useState } from "react"
import { useUserContext } from "@/app/utils/contexts"
import { UserContextType } from "@/app/utils/types"

const LogInForm = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [userNotFound, setUserNotFound] = useState<boolean>(true)
  const {user, setUser} = useUserContext() as UserContextType;

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const loggedInUser = UserArray.filter(user => user.name === userInput)
    // console.log(loggedInUser[0])

    if(!loggedInUser[0]) setUserNotFound(false)
    else setUserNotFound(true)

    setUser(loggedInUser[0])
    
  }
  
  if (user) console.log('The user is: ' + user?.name)

  const handleChange = (event: { target: { value: any } }) => {
    setUserInput(event.target.value)
    // console.log(userInput)
  }
  return (
    <>
    <form>
      <label htmlFor="username">Enter your username</label>
      <input onChange={handleChange} id="username" placeholder="Username" value={userInput}/>
      <label htmlFor="password">Enter your password</label>
      <input id="password" placeholder="Password"/>
      <button onClick={handleClick}>Log In!</button>
    </form>
    {!userNotFound && <p>No user found! Check your details and please try again</p>}
    </>
  )
}

export default LogInForm