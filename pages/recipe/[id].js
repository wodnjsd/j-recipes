import prisma from "@/prisma/client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Recipe = ({ recipe }) => {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/api/recipes/${id}`);
      toast.success("Recipe deleted");
      router.push("/recipes");
    } catch (e) {
      toast.error(e.response.data.message)
      console.log(e);
    }
  };

  const handleComment = async () => {
    let toastPostID = "";
    toastPostID = toast.loading("Adding your comment", { id: toastPostID });
    try {
      const { data } = await axios.post(`/api/comments/${recipe.id}`, {
        comment,
      });
      console.log(data);
      setComment("");
      toast.success("Recipe created!", { id: toastPostID });
      router.replace(router.asPath);
    } catch (e) {
      toast.error(e.response.data.message, { id: toastPostID });
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
          <p>{recipe.description}</p>
          <div>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <p className="text-sm">Added by: {recipe.author.name}</p>
        <button
          type="button"
          onClick={() => handleDelete(recipe.id)}
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
        <button type="button" onClick={handleComment}>
          Submit
        </button>
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
      author: true,
    },
  });
  console.log(recipe);
  return {
    props: {
      recipe,
    },
  };
}
