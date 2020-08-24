import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js";
import { JournalEntryCompontent } from "./JournalEntry.js";
import { useTags, getTags } from "./TagsProvider.js";
import { useEntriesTags, getEntriesTags } from "./EntriesTagsProvider.js";

const entryLog = document.querySelector(".journalEntryListContainer");
const eventHub = document.querySelector(".mainContainer");

//Declare component varaibles
let entries = [];
let tags = [];
let entriesTags = [];

export const EntryListComponent = () => {
  getJournalEntries()
    .then(getTags)
    .then(getEntriesTags)
    .then(() => {
      entries = useJournalEntries();
      tags = useTags();
      entriesTags = useEntriesTags();

      render();
    });
};

eventHub.addEventListener("entriesTagsStateChanged", () => {
  entries = useJournalEntries();
  tags = useTags();
  entriesTags = useEntriesTags();

  render();
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("editEntry--")) {
    const [prefix, entryIdFromHTML] = clickEvent.target.id.split("--");
    const editEntryButtonEvent = new CustomEvent("editButtonClicked", {
      detail: {
        editEntryId: parseInt(entryIdFromHTML),
      },
    });
    eventHub.dispatchEvent(editEntryButtonEvent);
  } else if (clickEvent.target.id.startsWith("deleteEntry--")) {
    const idToDelete = clickEvent.target.id.split("--")[1];
    const deleteEntryButtonEvent = new CustomEvent("deleteButtonClicked", {
      detail: {
        deleteId: parseInt(idToDelete),
      },
    });
    eventHub.dispatchEvent(deleteEntryButtonEvent);
  }
});

eventHub.addEventListener("entryDeleted", () => {
  entries = useJournalEntries();
  render();
});

const render = () => {
  const entryHTML = entries
    .map((entryObj) => {
      const matchingEntriesTags = entriesTags.filter((entriesTagsObj) => {
        return entryObj.id === entriesTagsObj.entryId;
      });

      const matchingTags = matchingEntriesTags.map((matchingETObj) => {
        return tags.find((tagObj) => {
          return matchingETObj.tagId === tagObj.id;
        });
      });

      return JournalEntryCompontent(entryObj, matchingTags);
    })
    .reverse()
    .join("");

  entryLog.innerHTML = entryHTML;
};
