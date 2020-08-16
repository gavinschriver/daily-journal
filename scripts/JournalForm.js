import {
  saveEntry,
  updateEntry,
  useJournalEntries,
} from "./JournalDataProvider.js";
import { getMoods, useMoods } from "./MoodsProvider.js";
 s
const contentTarget = document.querySelector(".journalFormContainer");
const eventHub = document.querySelector(".mainContainer");

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "publishButton") {

    const id = document.querySelector("#entryId").value;
    if (id === "") {
      const moodEntry = document.querySelector("#moodSelect"); //reference to the whole <select> bar
      const moodIdValue = parseInt(moodEntry.value);

      // if (moodIdValue !== 0) {
        const newEntry = {
          date: document.querySelector("#journalDate").value,
          topics: document.querySelector("#topicsCovered").value,
          entry: document.querySelector("#entryText").value,
          moodId: moodIdValue,
        };
        saveEntry(newEntry);

      // } else alert("NOPE"); //end data validation from line 17
    } else {
      const updatedEntry = {
        id: parseInt(id),
        date: document.querySelector("#journalDate").value,
        topics: document.querySelector("#topicsCovered").value,
        entry: document.querySelector("#entryText").value,
        moodId: parseInt(document.querySelector("#moodSelect").value)
      };
      updateEntry(updatedEntry);
    }
  }
});

eventHub.addEventListener("editButtonClicked", (editButtonEvent) => {
  const idToFind = editButtonEvent.detail.editEntryId;
  const entriesArray = useJournalEntries();
  const matchingEntryObj = entriesArray.find((entryObj) => {
    return entryObj.id === idToFind;
  });
  document.querySelector("#topicsCovered").value = matchingEntryObj.topics;
  document.querySelector("#journalDate").value = matchingEntryObj.date;
  document.querySelector("#entryText").value = matchingEntryObj.entry;
  document.querySelector("#moodSelect").value = matchingEntryObj.moodId;
  document.querySelector("#entryId").value = matchingEntryObj.id;
});

const render = (moodsArray) => {
  contentTarget.innerHTML = `
    <article action="" class="journalForm">
<fieldset class="fieldset">

  <div class="inputWrapper">
  <label for="journalDate"
    >Date of Entry:</label>
    <input
      type="date"     
      class="entryForm__dateInput"
      name="journalDate"
      id="journalDate"
    />
</div>

<div class="inputWrapper">
  <label for="topicsCovered"
    >Topics Covered:</label><input
      type="text"
      serve
      class="entryForm__textInput"
      placeholder="topics covered"
      name="topicsCovered"
      id="topicsCovered"
  />
  </div>

  <div class="inputWrapper">
  <label for="entryArea">Journal Entry</label>
  <textarea class="entryForm__textArea" id="entryText"></textarea>
</div>

<div class="inputWrapper">
  <label for="mood"
    >My Mood</label>
    <select name="mood" class="entryForm__moodDropdown" id="moodSelect">
      ${moodsArray.map((moodObj) => {
        return `<option value="${moodObj.id}">${moodObj.label}</option>`;
      })}
    </select>
  </div>
  <button class="entryForm__publishButton" id="publishButton">Publish</button>
  <input type="hidden" name="entryId" id="entryId" value=""> 
</fieldset>

</article>
    `;
};

export const JournalForm = () => {
  getMoods().then(() => {
    const moodsArray = useMoods();
    render(moodsArray);
  });
};
