'use client';
import LogInForm from "./components/LogInForm";
import { useUserContext } from "./utils/contexts";
import { UserContextType } from "./utils/types";

export default function Home() {
  const { user } = useUserContext() as UserContextType;

  return (
    <div className="font-sans flex flex-grow flex-col items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
      {user ? <p>Welcome to my site!</p> : <LogInForm />}
    </div>
  );
}