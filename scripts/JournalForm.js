import {
  saveEntry,
  updateEntry,
  useJournalEntries,
  getJournalEntries,
} from "./JournalDataProvider.js";
import { getMoods, useMoods } from "./MoodsProvider.js";
import { getInstructors, useInstructors } from "./InstructorsProvider.js";
import { getTags, useTags, saveTag } from "./TagsProvider.js";
import {
  saveEntriesTags,
  getEntriesTags,
  useEntriesTags,
} from "./EntriesTagsProvider.js";

const contentTarget = document.querySelector(".journalFormContainer");
const eventHub = document.querySelector(".mainContainer");

//Declare component-level variables
let entriesTags = [];
let entries = [];
let tags = [];
let subjects = [];
let arrayOfCurrentEntrySubjects = [];
let matchingTagObjects = [];
let newTagCounter;

export const JournalForm = () => {
  getInstructors()
    .then(getMoods)
    .then(getTags)
    .then(getJournalEntries)
    .then(getEntriesTags)
    .then(() => {
      entriesTags = useEntriesTags();
      entries = useJournalEntries();
      tags = useTags();
      setSubjects();

      const currentInstructorArray = useInstructors();
      const currentMoodArray = useMoods();
      render(currentInstructorArray, currentMoodArray);
    });
};

// reset entry fields when journal state changes
const resetFields = () => {
  document.querySelector("#topicsCovered").value = "";
  document.querySelector("#journalDate").value = "";
  document.querySelector("#entryText").value = "";
  document.querySelector("#moodSelect").value = "";
  document.querySelector("#entryId").value = "";
  document.querySelector("#instructorSelect").value = "";
  document.querySelector("#tagInput").value = "";
};

// reload array of 'subjects' strings extracted from API state tags
const setSubjects = () => {
  subjects = tags.map((tag) => {
    return tag.subject;
  });
};

// create array of matching tag objects for all the individual 'subjects' in the current input field
// then create new entriesTags objects by pairing each of those with the id of most recent entry
// **ONLY WORKS for new entries right now**
const createEntriesTags = () => {
  matchingTagObjects = arrayOfCurrentEntrySubjects.map((currentSubject) => {
    return tags.find((tagObj) => {
      return currentSubject === tagObj.subject;
    });
  });
  const newEntriesTags = matchingTagObjects.map((matchingTag) => {
    return {
      entryId: entries[entries.length - 1].id,
      tagId: matchingTag.id,
    };
  });
  newEntriesTags.forEach((entriesTagsObj) => {
    saveEntriesTags(entriesTagsObj);
  });
};

eventHub.addEventListener("tagStateChanged", () => {
  tags = useTags();
  newTagCounter--;
  setSubjects();
  if (newTagCounter <= 0) {
    createEntriesTags();
  }
});

eventHub.addEventListener("journalEntrySaved", () => {
  entries = useJournalEntries();

  //create a set object with all the 'subjects' from component state tags collection
  const subjectSet = new Set(subjects);
  const newSubjectsArray = arrayOfCurrentEntrySubjects.filter(
    (currentSubject) => {
      return !subjectSet.has(currentSubject);
    }
  );
  //if new tags are needed, save them - then jump into "tagStateEvent" callback to finish process of making new entriesTags
  if (newSubjectsArray.length > 0) {
    newTagCounter = newSubjectsArray.length;
    const newTagObjects = newSubjectsArray.map((newSubject) => {
      return {
        subject: newSubject,
      };
    });
    newTagObjects.forEach((tagObject) => {
      saveTag(tagObject);
    });
    //if no new tags are needed, create entriesTags here
  } else {
    createEntriesTags();
  }

  resetFields();
});

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "publishButton") {
    //make sure dropdowns are valid so you don't eff my db
    if (
      document.querySelector("#moodSelect").value &&
      document.querySelector("#instructorSelect").value
    ) {
      //look at tagInput field and use it to set an array of 'subject' strings, held at component state
      const currentEntrySubjectsString = document.querySelector("#tagInput")
        .value;
      arrayOfCurrentEntrySubjects = currentEntrySubjectsString.split(",");

      const id = document.querySelector("#entryId").value;
      //if entry doesn't exist yet (not on DOM), create and save it
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
        //provider needs to broadcast an "entryUpdated event..." and we have a separate listener...
        //OR, should it broadcast same message "journalEntrySaved" and follow same path with listener?
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
