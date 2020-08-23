const eventHub = document.querySelector(".mainContainer");

const dispatchStateChangeEvent = () => {
  eventHub.dispatchEvent(new CustomEvent("entriesTagsStateChanged"));
};

let entriesTags = [];

export const useEntriesTags = () => {
  return entriesTags.slice();
};

export const getEntriesTags = () => {
  return fetch("http://localhost:3001/entriesTags")
    .then((res) => res.json())
    .then((parsedEntriesTags) => {
      entriesTags = parsedEntriesTags;
      return parsedEntriesTags;
    });
};

export const saveEntriesTags = (newEntriesTags) => {
  return fetch("http://localhost:3001/entriesTags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEntriesTags),
  })
    .then(getEntriesTags)
    .then(dispatchStateChangeEvent);
};
