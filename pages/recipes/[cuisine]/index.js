import React from "react";
import prisma from "@/prisma/client";
import axios from 'axios'

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


export async function getStaticPaths() {
  const cuisines = await prisma.cuisine.findMany()
  // const cuisines = await axios.get("/api/cuisines/getAll")
  const allPaths = cuisines.map(cuisine => {
    return {
      params: {
        cuisine: cuisine.title
      }
    }
  })
  console.log(allPaths)
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const id = context?.params.cuisine
  const recipes = await prisma.post.findMany({
    where: {
      cuisine: {
        some: {
          title: id,
        },
      },
    },
  });
  console.log(id)
  console.log(recipes)
  return {
    props: {recipes}
  }

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
