'use client';
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";
import Link from "next/link";

const Profile = () => {
  const { user } = useUserContext() as UserContextType;

  if (!user) {
    return <p className="p-4 text-center">You must be logged in to view your profile.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Favourite Category</h3>
        {user.favouriteCategory ? (
          <p className="text-lg">{user.favouriteCategory}</p>
        ) : (
          <p className="text-gray-600">No category saved yet.</p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Favourite Recipes</h3>
        {user.favouriteRecipe.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {user.favouriteRecipe.map((meal, index) => (
              <li key={index}>
                <Link
                  href={`/meals/${meal.id}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {meal.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recipes saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;