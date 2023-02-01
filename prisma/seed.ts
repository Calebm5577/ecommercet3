import { prisma } from "../src/server/db";
// import "../src/images/nike/Air Jordan 1 Low"

async function main() {
  //   const id = "cl9ebqhxk00003b600tymydho";
  await prisma.image.createMany({
    data: [
      {
        name: "Air Jordan 1 Low",
        main: "images/nike/Air Jordan 1 Low",
        extras: "images/nike/Air Jordan 1 Low/extras",
        brand: "nike",
      },
      {
        name: "Nike Air Force 1'07",
        main: "images/nike/Nike Air Force 1'07",
        extras: "images/nike/Nike Air Force 1'07/extras",
        brand: "nike",
      },
      {
        name: "Nike Air Max Plus",
        main: "images/nike/Nike Air Max Plus",
        extras: "images/nike/Nike Air Max Plus/extras",
        brand: "nike",
      },
      {
        name: "Adiform SLTN Shoes",
        main: "images/adidas/Adiform SLTN Shoes",
        extras: "images/adidas/Adiform SLTN Shoes/extras",
        brand: "adidas",
      },
      {
        name: "NMD_R1 Shoes",
        main: "images/adidas/NMD_R1 Shoes",
        extras: "images/adidas/NMD_R1 Shoes/extras",
        brand: "adidas",
      },
      {
        name: "Ultraboost 22 Running Shoes",
        main: "images/adidas/Ultraboost 22 Running Shoes",
        extras: "images/adidas/Ultraboost 22 Running Shoes/extras",
        brand: "adidas",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//   import { prisma } from "../server/db";

// // const prisma = require("../src/server/db");
// // import { PrismaClient } from "@prisma/client";
// // const PrismaClient = require("prisma/client");

// // const prisma = new PrismaClient();

// // id     String @id @default(cuid())
// // name   String
// // main   String
// // extras String
// // brand  String
// // user   User   @relation(fields: [brand], references: [id], onDelete: Cascade)

// async () => {
//   prisma.image.createMany({
//     data: [
//       {
//         name: "xyz",
//         main: "12333",
//         extras: "123231",
//         brand: "safasfa",
//       },
//       {
//         name: "xyz",
//         main: "12333",
//         extras: "123231",
//         brand: "safasfa",
//       },
//       {
//         name: "xyz",
//         main: "12333",
//         extras: "123231",
//         brand: "safasfa",
//       },
//       {
//         name: "xyz",
//         main: "12333",
//         extras: "123231",
//         brand: "safasfa",
//       },
//     ],
//   });
// };
