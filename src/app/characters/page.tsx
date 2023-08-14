"use client"


import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCharacters } from "../../../lib/api";
import { Character } from "../../../lib/types"; 
// Define Character type based on API response



export default function Wizards() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function getCharacters() {
      const data = await fetchCharacters();
      setCharacters(data);
    }
    getCharacters();
  }, []);

  return (
    <div  className="bg-black" >
    <div className="mx-auto max-w-2xl px-4 bottom-10 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold  tracking-tight text-white text-center mb-2  ">Harry Potter Characters</h2>
  
      <div className="mt-6 grid grid-cols-1  gap-x-24 gap-y-24  sm:grid-cols-2 b lg:grid-cols-3 xl:gap-x-15">
        {characters.map((character) => (
          <div className="group relative bg-lightblack" key={character.id}>
            <div className="aspect-h-1 aspect-w-1 w-full  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img src={character.image} alt={character.name} className=" rounded-md object-contain h-48 w-96 object-center lg:h-full lg:w-full" />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-center text-white">
                <Link href={`/character/${character.id}`}>
                  <div className="text-sm text-center text-white">
                    <span aria-hidden="true" className="absolute inset-0 object-center"></span>
                    {character.name}
                  </div>
                </Link>
                </h3 >
                <p className="mt-1  text-sm text-white ">Date of Birth: {character.dateOfBirth}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );

        }

// Mark the component as a Client Component

// export const getStaticProps = async () => {
//   return {
//     props: {},
//     // Mark this as a Client Component
//     unstable_clientComponent: true,
//   };
// };
