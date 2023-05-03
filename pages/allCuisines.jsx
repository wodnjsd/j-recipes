import React from 'react'
import prisma from "@/prisma/client";

const Cuisines = ({cuisines}) => {
  return (
    <div>{cuisines.map((cuisine) => {
      // <a href ={`/recipes/${cuisine}`}></a>
      return <div>{cuisine.title}</div>
    })}</div>
  )
}

export default Cuisines

export async function getServerSideProps() {
  const cuisines = await prisma.cuisine.findMany()
  const cuisineList = (cuisines.map((label) => ({ value:label.title, label: label.title })))
  return {
    props: { cuisines, cuisineList },
  };
}
