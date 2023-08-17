"use client"


import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCharacters } from "../../../lib/api";
import { Character } from "../../../lib/types"; 
// Define Character type based on API response



export default function Wizards() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Set the number of items per page
  

  // Calculate the current characters based on currentPage and itemsPerPage
  const indexOfLastCharacter = currentPage * itemsPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(characters.length / itemsPerPage);
  const maxPagesDisplayed = 5;

  let startPage = Math.max(currentPage - Math.floor(maxPagesDisplayed / 2), 1);
  let endPage = Math.min(startPage + maxPagesDisplayed - 1, totalPages);

  if (totalPages - endPage < maxPagesDisplayed - 1) {
    startPage = Math.max(endPage - maxPagesDisplayed + 1, 1);
  }
  useEffect(() => {
    async function getCharacters() {
      const data = await fetchCharacters();
      
      setCharacters(data);
      setAllCharacters(data);
    }
    getCharacters();
  }, []);

  return (
    <div  className="bg-black" >

    <div className="mx-auto max-w-2xl px-4 bottom-10 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

      <div className="flex justify-end ">
        <input className="w-72 h-10 my-4 left-0 bg-sky-300 font-serif shadow-2xl  shadow rounded"
        style={{ textAlign: "center"}}
        placeholder="SEARCH" value={search} onChange={(e) => {

          let enteredSearchTerm = e.target.value.toLowerCase();
          setSearch(enteredSearchTerm);

          if(enteredSearchTerm === ""){
            setCharacters(allCharacters);
          } else {
            let filteredCharacters = allCharacters.filter((character) => {
              let names = character.name.toLowerCase().split(" ");
              let house = character.house.toLowerCase();
              return (names.includes(enteredSearchTerm)) ||
                (house === enteredSearchTerm)
              ;
  
              // return character.name.toLowerCase() === enteredSearchTerm.toLowerCase();
            });
            setCharacters(filteredCharacters);
          }        
        }}/>
      </div>
      <h2 className="text-2xl font-bold  tracking-tight text-white text-center mb-2 ">Harry Potter Characters</h2>

      <div className="mt-6 grid grid-cols-1  gap-x-24 gap-y-24  sm:grid-cols-2 b lg:grid-cols-3 xl:gap-x-15">
      {currentCharacters.map((character) => (
          <div className="group relative bg-lightblack" key={character.id}>
            <div className="aspect-h-1 aspect-w-1 w-full  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img src={character.image} alt={character.name} className=" rounded-md object-contain h-48 w-96 object-left lg:h-full lg:w-full" />
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm  text-white">
                <Link href={`/character/${character.id}`}>
                  <div className="text-sm  text-white">
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
      
      
      <div className="flex justify-center mt-10 space-x-1 p-2" 
      style={{ backgroundColor: "#fdb928", margin:"auto",width:"36%",marginTop:"50px" , borderRadius:"12px"}}>
  {currentPage > 1 && (
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className="px-2 py-1 rounded bg-blue-500 text-white"
    >
      Previous
    </button>
  )}
  {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
    <button
      key={startPage + index}
      onClick={() => handlePageChange(startPage + index)}
      className={`px-2 py-1 rounded ${
        currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
      }`}
    >
      {startPage + index}
    </button>
  ))}
  {currentPage < totalPages && (
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className="px-2 py-1 rounded bg-blue-500 text-white"
    >
      Next
    </button>
  )}
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
