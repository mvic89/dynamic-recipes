'use client';
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";

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
            {user.favouriteRecipe.map((recipe, index) => (
              <li key={index}>{recipe}</li>
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