// This is where you'll set up fetching data from the API.

// lib/api.js

const BASE_URL = "https://hp-api.onrender.com/api"; // Replace with the actual API URL

export async function fetchCharacters() {
  const response = await fetch(`${BASE_URL}/characters`);
  const data = await response.json();
  return data;
}

export async function fetchCharacterDetails(id) {
  // const url = BASE_URL + '/character/' + id;       //normal contcatenation
  const url = `${BASE_URL}/character/${id}`  ;     // string literal
  // https://hp-api.onrender.com/api/character/:id
  const response = await fetch(url);   
  const data = await response.json();
  return data[0];
}


