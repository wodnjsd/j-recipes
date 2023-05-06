// "use client";

import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import prisma from "@/prisma/client";

const AddRecipe = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    cuisine: [],
    instructions: "",
  });

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  const handleIngredients = (i, e) => {
    let newIngredients = [...ingredients];
    newIngredients[i][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredients = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(ingredients);
    e.preventDefault();
    const newFormData = {
      ...formData,
      cuisine: formData.cuisine.map((type) => type.value),
      // ingredients: formData.ingredients.map((type) => type.value),
      ingredients: ingredients.map((ing) => ing.name + " - " + ing.amount),
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
        <h1>Add your delicious recipe here!</h1>
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
            options={props.cuisineList}
            onChange={(cuisine) => setFormData({ ...formData, cuisine })}
            value={formData.cuisine}
          />
          <label>Ingredients</label>
          {ingredients.map((element, index) => (
            <div key={index} className="flex">
              <div>
                {/* <label>Name</label> */}
                <select
                  name="name"
                  onChange={(e) => handleIngredients(index, e)}
                >
                  <option value=""></option>
                  {props.ingredientList.map((ing) => (
                    <option value={ing.value}>{ing.label}</option>
                  ))}
                </select>
                {/* <Select
                form
                  options={props.ingredientList}
                  name="name"
                  onChange={(e) => handleIngredients(index, e)}
                  value={element.name}
                /> */}
              </div>
              <div>
                {/* <label>Amount</label> */}
                <input
                  type="text"
                  name="amount"
                  value={element.amount}
                  placeholder="amount"
                  onChange={(e) => handleIngredients(index, e)}
                />
                {/* <Select
                  options={props.amountsList}
                  name="amount"
                  // onChange={(e) => handleIngredients(index, e)}
                  onChange={(amount) =>
                    setIngredients(
                      [...ingredients, ingredients[index].amount = amount]
                    )
                  }
                  value={element.amount}
                /> */}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredients}
            className="border rounded-md"
          >
            +
          </button>
          {/* <Select
            defaultValue={[]}
            isMulti
            options={props.ingredientList}
            onChange={(ingredients) =>
              setFormData({ ...formData, ingredients })
            }
            value={formData.ingredients}
          /> */}
          <label>Instructions</label>
          <textarea
            onChange={handleChange}
            name="instructions"
            value={formData.instructions}
            placeholder="Write some instructions"
            className="p-4 border rounded-lg"
          ></textarea>
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
  const cuisines = await prisma.cuisine.findMany();
  const ingredients = await prisma.ingredient.findMany();
  const amounts = await prisma.amount.findMany();

  console.log(cuisines);
  const cuisineList = cuisines.map((label) => ({
    value: label.title,
    label: label.title,
  }));
  const ingredientList = ingredients.map((label) => ({
    value: label.title,
    label: label.title,
  }));
  const amountsList = amounts.map((label) => ({
    value: label.title,
    label: label.title,
  }));
  return {
    props: { cuisines, cuisineList, ingredientList, amountsList },
  };
}
