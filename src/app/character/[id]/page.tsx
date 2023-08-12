'use client'

import {useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCharacterDetails } from "../../../../lib/api"; // Implement this function similarly to fetchCharacters
import { Character } from "../../../../lib/types"; // Define Character type based on API response

export default function CharacterDetails() {

 const Params = useParams()
  const id = Params.id
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    async function getCharacterDetails() {
        console.log('gets here')
        console.log('id = ' + id)
      if (id) {
        const data = await fetchCharacterDetails(id as string); // Assuming fetchCharacterDetails takes character ID as a string
        setCharacter(data);
      }
    }

    getCharacterDetails();
  }, [id]);

  if (!character) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Role: {character.role}</p>
      <p>House: {character.house}</p>
      <p>Wand: {character.wand.wood}</p>
      {/* Display other character details here */}
    </div>
  );
}
