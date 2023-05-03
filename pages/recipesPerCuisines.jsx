import React from "react";
import prisma from "@/prisma/client";

const recipesPerCuisines = ({ recipes }) => {
  return (
    <div>
      {recipes.map((recipe) => {
        return <div>{recipe.title}</div>;
      })}
    </div>
  );
};

export default recipesPerCuisines;

export async function getServerSideProps() {
  const recipes = await prisma.post.findMany({
    where: {
      cuisine: {
        some: {
          title: "Korean",
        },
      },
    },
  });
  console.log(recipes);

  return {
    props: { recipes },
  };
}
