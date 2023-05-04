import React from "react";
import prisma from "@/prisma/client";
import Link from "next/link";

const Cuisines = ({ cuisines }) => {
  return (
    <div>
      {cuisines.map((cuisine) => {
        return (
          <Link key={cuisine.id} href={`/recipes/${cuisine.title}`} passHref>
            <h2>{cuisine.title}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default Cuisines;

export async function getServerSideProps() {
  const cuisines = await prisma.cuisine.findMany();
  const cuisineList = cuisines.map((label) => ({
    value: label.title,
    label: label.title,
  }));
  console.log(cuisines);
  return {
    props: { cuisines, cuisineList },
  };
}
