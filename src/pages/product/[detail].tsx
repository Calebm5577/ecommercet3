import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

//server side imports
import path from "path";
import { promises as fs } from "fs";
// import { caller } from "../server/api/routers/example";
// import { object } from "zod";
// import { useState } from "react";

const detail = ({ newObj, readMainPath }) => {
  // console.log(typeof newObj);
  console.log(newObj);
  if (newObj) {
    console.log(newObj[0]);
  }
  console.log("readMainPath");
  console.log(readMainPath);

  return (
    <div className="">
      <Link href="/">Home</Link>
      <div className="flex justify-center">
        <div className=" flex w-1/2 flex-wrap justify-center border-2 border-black">
          {newObj
            ? newObj[1].map((item) => {
                console.log(item);
                return (
                  <div className="border-2">
                    <Image
                      src={`/${newObj[2]}/${item}`}
                      width="350"
                      height="350"
                      alt="shoe"
                    />
                    <p>{item}</p>
                  </div>
                );
              })
            : ""}
        </div>
        {/* links to other shoes */}
        <div className="flex w-1/3 flex-col items-center border-2  align-middle">
          <div className="flex-col justify-center text-center">
            {newObj ? <h1>{newObj[0].split("/")[2]}</h1> : ""}
            <p>Men's Shoes</p>
            <p>$135</p>
          </div>
          <div className="flex w-3/4 flex-wrap border-2 border-black">
            {readMainPath
              ? readMainPath.map((item) => {
                  console.log(item);
                  console.log("url");
                  console.log(`/${newObj[0]}/${item}`);
                  if (item != "extras") {
                    return (
                      <div className="border-2">
                        <Link
                          href={`/product/${newObj[0].split("/")[2]}?color=${
                            item.split(".")[0]
                          }&brand=${newObj[0].split("/")[1]}`}
                        >
                          <div className="overflow-hidden">
                            <div className="cursor-pointer object-cover transition duration-300 hover:scale-105">
                              <Image
                                src={`/${newObj[0]}/${item}`}
                                width="100"
                                height="100"
                                alt="shoe"
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                })
              : ""}
          </div>
          <div className="w-3/4 flex-col  border-2 border-black ">
            <div className="flex  justify-around">
              <p>Select Size</p>
              <p>Size Guide</p>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>6</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>6.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>7</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>7.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>8</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>8.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>9</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>9.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>10</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>10.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>11</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>11.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>12</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>12.5</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>13</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>14</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center border-2 hover:border-black">
                <p>15</p>
              </div>
            </div>
          </div>
          <div className="flex w-80 justify-center  border-2 border-black">
            <h1>hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default detail;

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// // `getStaticPaths` requires using `getStaticProps`
interface LooseObject {
  [key: string]: any;
}
export async function getServerSideProps(context) {
  console.log(context.query);
  let shoe = context.query.detail;
  let color = context.query.color;
  let brand = context.query.brand;
  let newadd = path.join(
    process.cwd(),
    `/public/images/${brand}/${shoe}/extras/${color}`
  );
  let mainPath = path.join(process.cwd(), `/public/images/${brand}/${shoe}/`);

  //
  let readNewAdd = await fs.readdir(newadd);
  let readMainPath = await fs.readdir(mainPath);

  console.log("readMainPath");
  console.log(readMainPath);

  let newObj: LooseObject = {
    0: `images/${brand}/${shoe}`,
    1: readNewAdd,
    2: `images/${brand}/${shoe}/extras/${color}`,
  };
  console.log(`new add ${newadd}`);
  console.log(`readNewAdd ${JSON.stringify(readNewAdd)}`);
  console.log(readNewAdd);

  ///extra images function
  let extraImagesNewObj: LooseObject = {};

  // const router = useRouter();
  // console.log(router.query);
  return {
    // Passed to the page component as props
    props: { newObj, readMainPath },
  };
}
