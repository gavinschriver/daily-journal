const eventHub = document.querySelector(".mainContainer");

let journalEntries = [];

export const useJournalEntries = () => {
  return journalEntries.slice();
};

export const getJournalEntries = () => {
  return fetch("http://localhost:8088/entries")
    .then((response) => response.json())
    .then((parsedEntries) => {
      journalEntries = parsedEntries;
      return parsedEntries;
    });
};

export const saveEntry = (entryObj) => {
  return fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryObj),
  })
    .then(getJournalEntries)
    .then(() => {
      eventHub.dispatchEvent(new CustomEvent("journalEntrySaved"));
    });
};

//umm non operational RN... like... trying to figure out still if
//we need 2 "dispatchStateChangeEvents"... or 1? or 3?
//Does there need to be/should there be separate flow for if you SAVE versus
//UPDATE versus DELETE?
export const updateEntry = (updatedEntryObj) => {
  return fetch(`http://localhost:8088/entries/${updatedEntryObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEntryObj),
  })
    .then(getJournalEntries)
    .then(() => {
      eventHub.dispatchEvent(new CustomEvent("journalEntryUpdated"));
    });
};

eventHub.addEventListener("deleteButtonClicked", (deleteButtonEvent) => {
  const deleteId = deleteButtonEvent.detail.deleteId;
  deleteEntry(deleteId);
});

const deleteEntry = (deleteEntryId) => {
  return fetch(`http://localhost:8088/entries/${deleteEntryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(getJournalEntries)
    .then(() => {
      eventHub.dispatchEvent(new CustomEvent("entryDeleted"));
    });
};
