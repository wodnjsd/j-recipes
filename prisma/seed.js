const prisma = require("./client");
const cuisines = require("./cuisines");
const ingredients = require("./ingredients");
const amounts = require("./amounts")

async function main() {
  await prisma.cuisine.deleteMany();
  console.log("deleted cuisine records");

  await prisma.ingredient.deleteMany();
  console.log("deleted ingredient records");

  await prisma.amount.deleteMany()
  console.log("deleted amounts records");

  for (let cuisine of cuisines) {
    await prisma.cuisine.create({
      data: cuisine,
    });
  }
  for (let ingredient of ingredients) {
    await prisma.ingredient.create({
      data: ingredient,
    });
  }
  for (let amount of amounts) {
    await prisma.amount.create({
      data: amount,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
