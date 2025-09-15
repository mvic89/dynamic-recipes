import { notFound } from "next/navigation";

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  [key: string]: any;
}

interface Props {
  params: {
    id: string;
  };
}

const MealDetailPage = async ({ params }: Props) => {
  const { id } = params;

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

  if (!res.ok) return notFound();

  const data = await res.json();
  const meal: MealDetail = data.meals?.[0];

  if (!meal) return notFound();

  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-auto rounded-lg shadow mb-4"
      />
      <p className="text-lg mb-2"><strong>Category:</strong> {meal.strCategory}</p>
      <p className="text-lg mb-2"><strong>Area:</strong> {meal.strArea}</p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="whitespace-pre-line">{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetailPage;