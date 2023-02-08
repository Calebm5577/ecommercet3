import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
// import xyz from "../images/nike/Air Jordan 1 Low/black.webp";
import asdf from "./images2/dog.jpeg";
import Image from "next/image";
// import images from "../../public/images/adidas/Adifom SLTN Shoes"

import { api } from "../utils/api";

//for dealing with images
import path from "path";
import { promises as fs } from "fs";
import { caller } from "../server/api/routers/example";
import { object } from "zod";
import { useState } from "react";

const Home: NextPage = ({ newObj, test }) => {
  // local state

  //
  console.log("props");
  console.log("type of obj");
  console.log(newObj);
  let myNewObj = null;
  if (newObj) {
    myNewObj = Object.entries(newObj);
  }

  console.log("test test");
  console.log(test);

  const getItems = api.example.getItems.useQuery({
    color: "",
    brand: "",
    size: "",
  });
  console.log("getItems.data");
  console.log(getItems.data);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex text-white">
            <div>
              {/* the in question 8*/}
              <div>
                {myNewObj
                  ? myNewObj.map((path) => {
                      console.log("check path");
                      console.log(path[1][0].replace(/\/(.*?)\.webp/, "$1"));
                      return <div></div>;
                    })
                  : ""}
              </div>

              <label>
                <input type="checkbox" />
                Red
                <input type="checkbox" />
                Blue
              </label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div>
                {myNewObj
                  ? myNewObj.map((path) => {
                      console.log("path");
                      console.log(path);
                      return (
                        <>
                          <IndiviualShoe data={path} />
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>

        <img src="./dog.jpeg" />
        <Image alt="shoe" src="/favicon.ico" height="50" width="50" />
        <img src={"/images/nike/Air Jordan 1 Low/black.webp"} />
        {/* <GalleryPage /> */}
      </main>
    </>
  );
};

export default Home;

const IndiviualShoe = (data) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMain, setCurrentMain] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  console.log("path in indi shoe");
  console.log(data.data);
  let path = data.path;
  return (
    <div>
      {/* <p>Hello from IndiviualShoe</p> */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="ba mb-5"
      >
        <Link
          href={`/product/${
            currentLink
              ? currentLink
              : `/${data.data[0] + "" + data.data[1][0]}`
          }`}
        >
          <Image
            alt="shoe"
            src={
              currentMain
                ? currentMain
                : `/${data.data[0] + "" + data.data[1][0]}`
            }
            height="300"
            width="300"
          />
        </Link>

        <div className="flex">
          <div
            className=" h-20"
            style={{ display: isHovered ? "flex" : "none" }}
          >
            {data.data[1].slice(0, 5).map((xyz) => {
              console.log("data.data");
              // console.log(data.data[0].split("/"));
              let queryParams = data.data[0].split("/");
              if (xyz !== "/extras") {
                return (
                  <div
                    className=" flex"
                    // onMouseEnter={() =>
                    //   setCurrentMain(`/${data.data[0] + "" + xyz}`)
                    // }
                    onMouseEnter={() => {
                      setCurrentMain(`/${data.data[0] + "" + xyz}`),
                        setCurrentLink(
                          `/${queryParams[2]}?color=${xyz.replace(
                            /\/(.*)\..*/,
                            "$1"
                          )}&brand=${queryParams[1]}`
                        );
                    }}
                  >
                    {console.log("xyz")}
                    {console.log(xyz)}
                    {console.log(xyz.replace(/\/(.*)\..*/, "$1"))}
                    <Link
                      href={`/product/${queryParams[2]}/?color=${xyz.replace(
                        /\/(.*)\..*/,
                        "$1"
                      )}&brand=${queryParams[1]}`}
                    >
                      <Image
                        alt="shoe"
                        src={`/${data.data[0] + "" + xyz}`}
                        height="65"
                        width="65"
                      />
                    </Link>
                  </div>
                );
              }
            })}

            {data.data[1].length > 5 ? (
              <p className="text-white">{`+ ${data.data[1].length - 5}`}</p>
            ) : (
              // <p className="text-white">none</p>
              ""
            )}
          </div>
          <div
            className="h-20 text-white"
            style={{ display: isHovered ? "none" : "block" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface LooseObject {
  [key: string]: any;
}
export async function getServerSideProps() {
  let test = await caller.getItems({});
  console.log("text");
  console.log(typeof test);
  console.log("text2");
  console.log(test[0]);
  console.log(test);

  let newObj: LooseObject = {};

  const promises = test.map(async (shoe) => {
    console.log(`shoesie ${JSON.stringify(shoe.main)}`);
    let newadd = path.join(process.cwd(), `/public/${shoe.main}`);
    let readNewAdd = await fs.readdir(newadd);

    console.log("other check");
    console.log(newadd);

    console.log("pre check");
    console.log(readNewAdd);

    for (let i = 0; i < readNewAdd.length; i++) {
      if (!(shoe.main in newObj)) {
        newObj[shoe.main] = [];
      }

      newObj[shoe.main].push(`/${readNewAdd[i]}`);
      // console.log(`push this ${pushThis}`);
      console.log("newobj shoe");
      console.log(newObj[shoe.main]);
    }
    console.log("new obj finished");
    console.log(newObj);
    console.log(typeof newObj);

    console.log("first check");
  });

  await Promise.all(promises);

  console.log("images special");
  console.log(newObj);

  return { props: { newObj, test, sheesh: "sheesh" } };
}
