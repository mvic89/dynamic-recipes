'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/app/utils/contexts";
import { UserContextType } from "@/app/utils/types";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { user, setUser } = useUserContext() as UserContextType;
  const [savedCategory, setSavedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategories(data.categories.slice(0, 8));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSaveCategory = (categoryName: string) => {
    if (user) {
      setUser({
        ...user,
        favouriteCategory: categoryName,
      });
      setSavedCategory(categoryName);
    }
  };

  return (
    <div className="font-sans flex flex-grow flex-col items-center justify-items-center p-8 pb-20 gap-16 bg-amber-50 sm:p-20">
      <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.idCategory}
            className="text-center border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
          >
            <Link href={`/categories/${category.strCategory}`}>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-32 object-cover"
              />
              <h3 className="text-lg font-semibold p-2">{category.strCategory}</h3>
            </Link>

            {user && (
              <button
                onClick={() => handleSaveCategory(category.strCategory)}
                className={`mt-auto bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 ${
                  savedCategory === category.strCategory ? "bg-green-600" : ""
                }`}
              >
                {savedCategory === category.strCategory ? "Saved!" : "Save Category"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;