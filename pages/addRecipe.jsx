// "use client";

import { useState } from "react";
// import cuisines from "@/data/cuisines";
// import ingredients from "@/data/ingredients";
import axios from "axios";
import Select from "react-select";
import prisma from "@/prisma/client";

const AddRecipe = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    cuisine: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      cuisine: formData.cuisine.map((type) => type.value),
      ingredients: formData.ingredients.map((type) => type.value),
    };
    try {
      const { data } = await axios.post("/api/recipes/addRecipe", newFormData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <div>
          {props.cuisines.map(cuisine => cuisine.title)}
        </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white my-5 mx-10 px-10 py-4 rounded-md"
      >
        <div className="flex flex-col justify-between gap-5">
          <label>Recipe Name</label>
          <input
            onChange={handleChange}
            name="title"
            value={formData.title}
            placeholder="New Recipe"
            className="p4 text-lg rounded-lg"
          />

          <label>Cuisine</label>
          <Select
            defaultValue={[]}
            isMulti
            // loadOptions={props.cuisines.map((label) => ({ label: label.title }))}
            options={props.cuisineList}
            onChange={(cuisine) => setFormData({ ...formData, cuisine })}
            value={formData.cuisine}
          />
          <label>Ingredients</label>
          <Select
            defaultValue={[]}
            isMulti
            options={props.ingredientList}
            onChange={(ingredients) =>
              setFormData({ ...formData, ingredients })
            }
            value={formData.ingredients}
          />
          <button
            type="submit"
            className="bg-teal-800 text-white py-2 rounded-md"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </>
  );
};

export default AddRecipe;

export async function getServerSideProps() {
  const cuisines = await prisma.cuisine.findMany()
  const ingredients = await prisma.ingredient.findMany()
  // const res = await fetch("https://catfact.ninja/fact");
  // const cats = await res.json();
  console.log(cuisines)
  const cuisineList = (cuisines.map((label) => ({ value:label.title, label: label.title })))
  const ingredientList = (ingredients.map((label) => ({ value:label.title, label: label.title })))
  return {
    props: { cuisines, cuisineList, ingredientList },
  };
}
