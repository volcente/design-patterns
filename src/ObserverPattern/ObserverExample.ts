import { Pokedex, type PokedexSubscriber } from "./Pokedex";
import { toast, Toaster } from "./Toaster";
import { pokemons } from "./pokedex.data";

Toaster();

const PokemonWatcher: PokedexSubscriber = (data) => {
  const pokemonName = document.querySelector("#pokemon-name");

  if (pokemonName) {
    pokemonName.textContent = data.name;
  }

  const pokemonCategory = document.querySelector("#pokemon-category");
  if (pokemonCategory) {
    pokemonCategory.textContent = `Category: ${data.category}`;
  }

  const pokemonWeight = document.querySelector("#pokemon-weight");
  if (pokemonWeight) {
    const formattedWeight = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      style: "unit",
      unit: "pound",
      unitDisplay: "short",
    }).format(data.weight);
    pokemonWeight.textContent = `Weight: ${formattedWeight}`;
  }

  const pokemonAbilites = document.querySelector("#pokemon-abilities");
  if (pokemonAbilites) {
    const oldChildren = pokemonAbilites.childNodes;
    oldChildren.forEach((child) => {
      pokemonAbilites.removeChild(child);
    });

    const fragment = document.createDocumentFragment();
    data.abilities.forEach((ability) => {
      const item = document.createElement("li");
      item.textContent = ability;
      fragment.appendChild(item);
    });
    pokemonAbilites.appendChild(fragment);
  }
};
Pokedex.subscribe(PokemonWatcher);

const PokemonAnnouncer: PokedexSubscriber = (data) => {
  console.info(`${data.name} has entered a showcase!`);
};
Pokedex.subscribe(PokemonAnnouncer);

const presentButton =
  document.querySelector<HTMLButtonElement>("#notify-button");
presentButton?.addEventListener("click", () => {
  const pokemonIndex = Math.floor(Math.random() * (pokemons.length - 1));
  const pokemon = pokemons[pokemonIndex];
  Pokedex.present(pokemon);
  toast({ content: `${pokemon.name} has entered an arena!`, id: pokemon.name });
});

const otherButton = document.querySelector<HTMLButtonElement>("#other-button");
otherButton?.addEventListener("click", () => {
  toast("DUPA!");
});
