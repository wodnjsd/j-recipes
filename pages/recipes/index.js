import React from "react";
import prisma from "@/prisma/client";
import Link from "next/link";

const Cuisines = ({ cuisines }) => {
  return (
    <div className="flex justify-between gap-3 flex-wrap">
      {cuisines.map((cuisine) => {
        return (
          <Link key={cuisine.id} href={`/recipes/${cuisine.title}`} passHref>
            <div className="w-40 border rounded-md p-2">
            <h2>{cuisine.title[0].toUpperCase() + cuisine.title.slice(1)}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Cuisines;

export async function getServerSideProps() {
  const cuisines = await prisma.cuisine.findMany();
  console.log(cuisines);
  return {
    props: { cuisines },
  };
}
