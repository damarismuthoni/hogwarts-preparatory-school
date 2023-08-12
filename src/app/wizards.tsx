'use client'

// components/Wizards.js

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCharacters } from "../../lib/api";
import { Character } from "../../lib/types"; 
// Define Character type based on API response



export function Wizards() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function getCharacters() {
      const data = await fetchCharacters();
      setCharacters(data);
    }
    getCharacters();
  }, []);

  return (
    <div>
      <h1>Harry Potter Characters</h1>
      <div className="character-list">
        {characters.map((character) => (
          <Link href={`/character/${character.id}`} key={character.id}>
            {/* <className="character-card"> */}
              <h2>{character.name}</h2>
              <p>Date of Birth: {character.dateOfBirth}</p>
            {/* </a> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Mark the component as a Client Component
export const getStaticProps = async () => {
  return {
    props: {},
    // Mark this as a Client Component
    unstable_clientComponent: true,
  };
};
