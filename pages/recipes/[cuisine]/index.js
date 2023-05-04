import React from "react";
import prisma from "@/prisma/client";
import Link from "next/link";

const recipesPerCuisines = ({ recipes }) => {
  return (
    <div>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <Link
                href={{
                  pathname: `/recipes/${recipe.cuisine}/${recipe.id}`,
                  query: { id: recipe.id },
                }}
              >
                {recipe.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default recipesPerCuisines;

export async function getStaticPaths() {
  const cuisines = await prisma.cuisine.findMany();
  const allPaths = cuisines.map((cuisine) => {
    return {
      params: {
        cuisine: cuisine.title,
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cuisine;
  const recipes = await prisma.post.findMany({
    where: {
      cuisine: {
        some: {
          title: id,
        },
      },
    },
  });
  console.log(id);
  console.log(recipes);
  return {
    props: { recipes },
  };
}

// export async function getServerSideProps() {
//   const recipes = await prisma.post.findMany({
//     where: {
//       cuisine: {
//         some: {
//           title: "Korean",
//         },
//       },
//     },
//   });
//   console.log(recipes);

//   return {
//     props: { recipes },
//   };
// }
