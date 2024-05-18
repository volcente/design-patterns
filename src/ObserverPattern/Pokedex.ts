type PokedexData = {
  name: string;
  category: string;
  weight: number;
  abilities: string[];
};

type PokedexSubscriber = (data: PokedexData) => void;
const observers: PokedexSubscriber[] = [];

const Pokedex = Object.freeze({
  present: (data: PokedexData) =>
    observers.forEach((observer) => observer(data)),

  subscribe: (func: PokedexSubscriber) => {
    observers.push(func);
  },

  unsubscribe: (func: PokedexSubscriber) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});

export { Pokedex, type PokedexSubscriber, type PokedexData };
