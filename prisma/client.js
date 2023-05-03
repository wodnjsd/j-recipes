const { PrismaClient } = require('@prisma/client') 

const prisma = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== "production") globalThis.prisma = prisma


async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


module.exports = prisma