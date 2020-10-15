const eventHub = document.querySelector(".mainContainer");

const dispatchStateChangeEvent = () => {
  eventHub.dispatchEvent(new CustomEvent("tagStateChanged"));
};

let tags = [];

export const useTags = () => {
  return tags.slice();
};

export const getTags = () => {
  return fetch("http://localhost:8088/tags")
    .then((response) => response.json())
    .then((parsedTags) => {
      tags = parsedTags;
      return parsedTags;
    });
};

export const saveTag = (newTag) => {
  return fetch("http://localhost:8088/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTag),
  })
    .then(getTags)
    .then(dispatchStateChangeEvent);
};
