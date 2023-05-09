import prisma from "@/prisma/client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Recipe = ({ recipe }) => {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/api/recipes/${id}`);
      router.push("/recipes");
    } catch (e) {
      console.log(e);
    }
  };

  const handleComment = async () => {
    try {
      const { data } = await axios.post(`/api/comments/${recipe.id}`, {
        comment,
      });
      console.log(data);
      setComment("");
      router.replace(router.asPath);
    } catch (e) {
      console.log(e);
    }
  };

  // const deleteComment = async() => {
  //   try {
  //     await axios.delete(`/api/comments/${recipe.id}`)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  return (
    <div className="flex flex-col my-20 gap-10">
      <div>
        <div className="h-80 flex flex-col gap-3 items-center border rounded p-2 bg-stone-100">
          <h1>{recipe.title}</h1>
          <div>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <p className="text-sm">Added by: {recipe.authorId}</p>
        <button
          type="button"
          onClick={() => handleDelete(recipe.id)}
          className="border rounded-md px-2"
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col">
        Add a comment:
        <textarea
          placeholder="Comments"
          onChange={(e) => setComment(e.target.value)}
          className="rounded-md"
        />
        <button onClick={handleComment}>Submit</button>
        {recipe.comments.map((comment) => (
          <div key={comment.id} className="border rounded-md">
            {comment.content}
            {/* <button onClick={deleteComment(comment.id)}>delete comment</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;

export async function getServerSideProps(context) {
  const id = parseInt(context.query.id);
  const recipe = await prisma.post.findUnique({
    where: { id: id },
    include: {
      cuisine: true,
      comments: true,
    },
  });
  console.log(recipe);
  return {
    props: {
      recipe,
    },
  };
}
