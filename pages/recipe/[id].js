import prisma from "@/prisma/client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Recipe = ({ recipe }) => {
  const [comment, setComment] = useState("")
  const router= useRouter()

  const handleDelete = async(id) => {
    try {
      console.log(id)
      await axios.delete(`/api/recipes/${id}`)
      router.push('/recipes')
    } 
    catch(e) {
      console.log(e)
    }
  }

  const handleComment = async() => {
    try {
      const {data} = await axios.post(`/api/comments/${recipe.id}`, {comment})
      console.log(data)
      router.replace(router.asPath)
      setComment("")
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <>
      <div className="border rounded p-2">
        <h1>{recipe.title}</h1>
        <p className="text-sm">Added by: {recipe.authorId}</p>
        <div>
          <h3>Ingredients:</h3>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {recipe.ingredients.map((ingredient) => {
              return <tr><td>{ingredient}</td></tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" onClick={() =>handleDelete(recipe.id)} className="border rounded-md px-2">Delete</button>
      <div>Comments:</div>
      {recipe.comments.map((comment) => (
        <div>{comment.content}
          <button>delete comment</button></div>
      ))}
      <textarea placeholder="Comments" 
      onChange={(e) => setComment(e.target.value)}/>
      <button onClick={handleComment}>Submit</button>
    </>
  );
};

export default Recipe;

export async function getServerSideProps(context) {
  const id = parseInt(context.query.id);
  const recipe = await prisma.post.findUnique({
    where: { id: id },
    include: {
      cuisine: true,
      comments: true
    },
  });
  console.log(recipe);
  return {
    props: {
      recipe,
    },
  };
}
