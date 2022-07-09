import Card from "../Card/Card"
import { useEffect, useState } from "react";
import { getData } from "../../Utils/utils";
import Button from "../Button/Button";
import SelectMenu from "../SelectMenu/SelectMenu";

const Dashboard = () => {

  const [pokemonName, setPokemonName] = useState(null);
  const [pokemonSprite, setPokemonSprite] = useState(null)
  const [pokemonId, setPokemonId] = useState(1);
  const [descriptionUrl, setDescriptionUrl] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  const POKEMON_LIST_URL = `https://pokeapi.co/api/v2/pokemon/?limit=151/`;
  
  useEffect(() => {
    const fetchPokemonList = async() =>{
      const list = await getData(POKEMON_LIST_URL);
      const pokemonNames = list.results;
      pokemonNames.map(element => setPokemonList((prev) => [...prev, element.name]));
    } 
  
   fetchPokemonList();

  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonData = await getData(URL);
      setPokemonName(pokemonData.name);
      setPokemonSprite(pokemonData.sprites.front_default);
      setDescriptionUrl(pokemonData.species.url);
    }

    fetchPokemon();

  }, [pokemonId, URL]);

  useEffect(() => {
    const fetchDescription = async () => {
      const pokemonText = await getData(descriptionUrl);
      const description = pokemonText.flavor_text_entries

      description.map((element) => {
          if (element.language.name === "en") {
            setPokemonDescription(element.flavor_text);
          } 
        }
      )
    }

    fetchDescription();

  }, [descriptionUrl]);

  if(!pokemonName && !pokemonSprite && !pokemonDescription && !pokemonList) return null;

  const handleNextPokemon = () => {
    setPokemonId((prevId) => prevId + 1);
  }

  const handlePreviousPokemon = () => {
    setPokemonId((prevId) => prevId - 1);
  }

  const handleOnChange = (event) => {
    setPokemonId(parseInt(event.target.value));
  }

  const firstPokemon = pokemonId === 1;
  const lastPokemon = pokemonId === 151;

  return (
    <div className="flex flex-col items-center bg-emerald-200 h-screen w-screen pt-4">
      <SelectMenu options={pokemonList} onChange={handleOnChange}/>
      <Card 
        className="flex flex-col items-center bg-white mt-4 w-60 h-72 rounded-md drop-shadow-lg" 
        src={pokemonSprite}
        //Lo vi en un video de Kyle :D
        name={pokemonName?.toUpperCase()}
        text={pokemonDescription} 
      />
      <div className="flex flex-row m-6 text-white">
        <Button onClick={handlePreviousPokemon} text="Previous" disabled={firstPokemon}/>
        <Button onClick={handleNextPokemon} text="Next" disabled={lastPokemon}/>
      </div>
    </div>
  )
}

export default Dashboard;