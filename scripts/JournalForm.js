import {
  saveEntry,
  updateEntry,
  useJournalEntries,
} from "./JournalDataProvider.js";
import { getMoods, useMoods } from "./MoodsProvider.js";
import { getInstructors, useInstructors } from "./InstructorsProvider.js";

const contentTarget = document.querySelector(".journalFormContainer");
const eventHub = document.querySelector(".mainContainer");

//dum dum dummy subjects
let subjects = ["fart", "carp", "crabbp", "snag"];

eventHub.addEventListener("journalStateChanged", () => {
  document.querySelector("#topicsCovered").value = "";
  document.querySelector("#journalDate").value = "";
  document.querySelector("#entryText").value = "";
  document.querySelector("#moodSelect").value = "";
  document.querySelector("#entryId").value = "";
  document.querySelector("#instructorSelect").value = "";
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "publishButton") {
    if (
      document.querySelector("#moodSelect").value &&
      document.querySelector("#instructorSelect").value
    ) {
      //lets look at some tags and save some tags!!!
      const currentEntrySubjectsString = document.querySelector("#tagInput")
        .value;
      const arrayOfCurrentEntrySubjects = currentEntrySubjectsString.split(",");

      // assign value of id to a var for the HELLOF IT jk to check and see if it exist already
      const id = document.querySelector("#entryId").value;

      if (id === "") {
        const newEntry = {
          date: document.querySelector("#journalDate").value,
          topics: document.querySelector("#topicsCovered").value,
          entry: document.querySelector("#entryText").value,
          moodId: parseInt(document.querySelector("#moodSelect").value),
          instructorId: parseInt(
            document.querySelector("#instructorSelect").value
          ),
        };
        saveEntry(newEntry);
      } else {
        const updatedEntry = {
          id: parseInt(id),
          date: document.querySelector("#journalDate").value,
          topics: document.querySelector("#topicsCovered").value,
          entry: document.querySelector("#entryText").value,
          moodId: parseInt(document.querySelector("#moodSelect").value),
          instructorId: parseInt(
            document.querySelector("#instructorSelect").value
          ),
        };
        updateEntry(updatedEntry);
      }
    } else alert("yougonnafuckit!!");
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

const render = (instructorArray, moodsArray) => {
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
<label for="instructor">Today's Instruktor</label>
<select name="instructor" class="entryForm__instructorDropdown" id="instructorSelect">
          <option value=""></option>
${instructorArray.map((instructorObj) => {
  return `<option value="${instructorObj.id}">${instructorObj.first_name}</option>`;
})}
</select>
</div>

<div class="inputWrapper">
<label for="tags">
Tags</label>
<input type="text" class="entryForm__textInput" name="tagInput" id="tagInput">
</div>

<div class="inputWrapper">
<label for="mood"
>My Mood</label>
<select name="mood" class="entryForm__moodDropdown" id="moodSelect">
        <option value=""></option>
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
  getInstructors()
    .then(getMoods)
    .then(() => {
      const currentInstructorArray = useInstructors();
      const currentMoodArray = useMoods();
      render(currentInstructorArray, currentMoodArray);
    });
};
