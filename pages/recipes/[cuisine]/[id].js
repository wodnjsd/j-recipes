import prisma from "@/prisma/client"

const Recipe = ({recipe}) => {
  return (
    <div>{recipe.title}</div>
  )
}

export default Recipe


export async function getServerSideProps(context) {
  const id = parseInt(context.query.id)
  const recipe = await prisma.post.findUnique({
    where: { id: id}
  })
  return {
    props: {
      recipe
    }
  }

}
