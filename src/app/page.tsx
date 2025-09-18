'use client';
import LogInForm from "./components/LogInForm";
import { useUserContext } from "./utils/contexts";
import { UserContextType } from "./utils/types";

export default function Home() {
  const { user } = useUserContext() as UserContextType;

  return (
    <div className="font-sans flex flex-grow flex-col items-center justify-items-center p-8 pb-20 gap-16 bg-amber-50 sm:p-20">
      {user ? 
        <section className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Hi {user.name}!</h1>
            <p className="text-lg text-gray-700">
              Welcome to My Recipes — your place to find, save, and explore meals from around the world.
            </p>
          </section>
      : <LogInForm />}
    </div>
  );
}