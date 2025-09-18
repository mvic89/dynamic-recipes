'use client';
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";
import Link from "next/link";
import Image from "next/image";

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

  const handleSaveMeal = (meal: Meal) => {
    if (!user) return;

    if (user.favouriteRecipe.some((fav) => fav.id === meal.idMeal)) return;

    setUser({
      ...user,
      favouriteRecipe: [...user.favouriteRecipe, {id: meal.idMeal, name: meal.strMeal}],
    });
  };

  return (
    <div className="font-sans flex flex-grow flex-col items-center justify-items-center p-8 pb-20 gap-16 bg-amber-50 sm:p-20">
      <h2 className="text-2xl font-bold mb-4">
        Meals in category: {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {meals.map((meal) => {
          const isSaved = user?.favouriteRecipe.some((fav) => fav.id === meal.idMeal);
          return (
            <div
              key={meal.idMeal}
              className="text-center border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
            >
              <Link href={`/meals/${meal.idMeal}`}>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover"
                />
                <h4 className="text-md font-medium p-2">{meal.strMeal}</h4>
              </Link>

              {user && (
                <button
                  onClick={() => handleSaveMeal(meal)}
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