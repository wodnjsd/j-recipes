// "use client";

import { useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import prisma from "@/prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const AddRecipe = (props) => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // ingredients: [],
    cuisine: [],
    instructions: "",
  });

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  const handleIngredients = (i, e) => {
    console.log("index", i, "e", e.target);
    let newIngredients = [...ingredients];
    newIngredients[i][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleIngredientName = (i, value, action) => {
    console.log(i, value, action);
    let newIngredients = [...ingredients];
    newIngredients[i][action.name] = value;
    setIngredients(newIngredients);
    console.log(newIngredients);
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
    let toastPostID = ""
    console.log(ingredients);
    e.preventDefault();
     toastPostID = toast.loading("Creating your post", {id: toastPostID})
    const newFormData = {
      ...formData,
      cuisine: formData.cuisine.map((type) => type.value),
      ingredients: ingredients.map((ing) => ing.name.label + "  " + ing.amount),
    };
    try {
      const { data } = await axios.post("/api/recipes/addRecipe", newFormData);
      console.log(data);
      toast.success("Recipe created!", {id: toastPostID});
      await router.push(`/recipe/${data.id}`)
    } catch (error) {
      toast.error(error.response.data.message, {id: toastPostID});
      console.log(error);
    }
  };


  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-xl">Add your delicious recipe here!</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-stone-200 my-5 mx-10 px-10 py-10 rounded-md"
      >
        <div className="flex flex-col justify-between gap-5">
          {/* <label>Recipe Name</label> */}
          <input
            onChange={handleChange}
            name="title"
            value={formData.title}
            placeholder="New recipe name"
  
          />
          {/* <label>Description</label> */}
          <input onChange={handleChange}
            name="description"
            value={formData.description}
            placeholder="Description"
            />
          {/* <label>Cuisine</label> */}
          <CreatableSelect
            defaultValue={[]}
            placeholder="Select cuisine"
            isMulti
            options={props.cuisineList}
            onChange={(cuisine) => setFormData({ ...formData, cuisine })}
            value={formData.cuisine}
          />
          {/* <label>Ingredients</label> */}
          {ingredients.map((element, index) => (
            <div key={index} className="flex flex-col sm:flex-row">
                {/* <label>Name</label> */}
                {/* <select
                  name="name"
                  onChange={(e) => handleIngredients(index, e)}
                >
                  <option value=""></option>
                  {props.ingredientList.map((ing) => (
                    <option value={ing.value}>{ing.label}</option>
                  ))}
                </select> */}
                <CreatableSelect
                  options={props.ingredientList}
                  name="name"
                  onChange={(value, action) =>
                    handleIngredientName(index, value, action)
                  }
                  value={element.name}
                />
            
              <div>
                <input
                  type="text"
                  name="amount"
                  value={element.amount}
                  placeholder="amount"
                  onChange={(e) => handleIngredients(index, e)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredients}
            className="border rounded-md"
          >
            {" "}
            +
          </button>
          {/* <label>Instructions</label> */}
          <textarea
            onChange={handleChange}
            name="instructions"
            value={formData.instructions}
            placeholder="Instructions"
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
    </div>
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
