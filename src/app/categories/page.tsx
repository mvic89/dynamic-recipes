'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4">
      {categories.map((category) => (
        <Link
          key={category.idCategory}
          href={`/categories/${category.strCategory}`}
          className="text-center border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={category.strCategoryThumb}
            alt={category.strCategory}
            className="w-full h-32 object-cover"
          />
          <h3 className="text-lg font-semibold p-2">{category.strCategory}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Categories;