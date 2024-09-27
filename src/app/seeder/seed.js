const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { hashSync } = require("bcrypt")

async function main(){
  const account = await prisma.user.createMany({
    data : [
      {
        name: "User",
        role: "CUSTOMER",
        email: "user@gmail.com",
        password: hashSync("1234", 10)
      }
    ]
  })
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.log(e)
  await prisma.$disconnect()
  process.exit(1)
})