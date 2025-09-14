import { notFound } from "next/navigation";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  params: { category: string };
}

const CategoryPage = async (context: Props) => {
  const { category } = await context.params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );

  if (!res.ok) return notFound();

  const data = await res.json();
  const meals: Meal[] = data.meals?.slice(0, 8);

  if (!meals || meals.length === 0) return notFound();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Meals in category: {category}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="text-center border rounded-lg overflow-hidden shadow"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-32 object-cover"
            />
            <h4 className="text-md font-medium p-2">{meal.strMeal}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;