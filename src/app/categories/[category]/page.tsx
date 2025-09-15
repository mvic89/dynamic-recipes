'use client';
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";
import Link from "next/link";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const CategoryPage = () => {
  const { category } = useParams() as { category: string };
  const [meals, setMeals] = useState<Meal[]>([]);
  const { user, setUser } = useUserContext() as UserContextType;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await res.json();
        if (!data.meals || data.meals.length === 0) {
          notFound();
        }
        setMeals(data.meals.slice(0, 8));
      } catch (error) {
        console.error("Error fetching meals:", error);
        notFound();
      }
    };

    fetchMeals();
  }, [category]);

  const handleSaveMeal = (mealName: string) => {
    if (!user) return;

    if (user.favouriteRecipe.includes(mealName)) return;

    setUser({
      ...user,
      favouriteRecipe: [...user.favouriteRecipe, mealName],
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Meals in category: {category}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {meals.map((meal) => {
          const isSaved = user?.favouriteRecipe.includes(meal.strMeal);
          return (
            <div
              key={meal.idMeal}
              className="text-center border rounded-lg overflow-hidden shadow flex flex-col hover:shadow-lg transition"
            >
              <Link href={`/meals/${meal.idMeal}`}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover"
                />
                <h4 className="text-md font-medium p-2">{meal.strMeal}</h4>
              </Link>

              {user && (
                <button
                  onClick={() => handleSaveMeal(meal.strMeal)}
                  disabled={isSaved}
                  className={`mt-auto px-3 py-2 text-sm text-white transition ${
                    isSaved
                      ? "bg-green-600 cursor-default"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSaved ? "Saved!" : "Save Meal"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;