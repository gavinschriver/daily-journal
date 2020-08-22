let moods = [];

export const getMoods = () => {
  return fetch("http://localhost:3001/moods")
    .then((res) => res.json())
    .then((parsedMoods) => {
      moods = parsedMoods;
    });
};

export const useMoods = () => {
  return moods.slice();
};
