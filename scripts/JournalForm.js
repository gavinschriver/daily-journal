import { saveEntry} from "./JournalDataProvider.js"
import { saveUpdatedEntry} from "./JournalDataProvider.js"

const contentTarget = document.querySelector(".journalFormContainer")
const eventHub = document.querySelector(".mainContainer")
const noNoBadWords = ["shit", "piss", "cunt", "fuck", "cocksucker", "motherfucker", "tits", "fuck", "turd", "twat"]

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "publishButton") {
        
        if (document.querySelector("#topicsCovered").value.length < 3) {

            const newEntry = {
                date: document.querySelector("#journalDate").value,
                topics: document.querySelector("#topicsCovered").value,
                entry: document.querySelector("#entryText").value,
                mood: document.querySelector("#moodSelect").value
            }
            saveEntry(newEntry)
        } else alert("NOPE")
    }
})

eventHub.addEventListener("editButtonClicked", editButtonEvent => {
        const [prefix, matchingID] = editButtonEvent.detail.editSelectedEntryId.split("--")

        contentTarget.innerHTML += `
        <fieldset name="${matchingID}" id="editEntryForm">
          <textarea id="editEntryText"></textarea>
          <select id="editEntryMood">
            <option value="verycoolman">COOL</option>
          </select>
          <input type="date" id="editEntryDate">
          <input type="text" id="editEntryTopics"> 
          <button id="editEntrySubmitButton">Submit Update</button>
        </fieldset>
        `
})


eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "editEntrySubmitButton") {
    const updatedEntryObj = {
      id: document.querySelector("#editEntryForm").name,
      topic: document.querySelector("#editEntryTopics").value,
      mood: document.querySelector("#editEntryMood").value,
      entry: document.querySelector("#editEntryText").value,
      date: document.querySelector("#editEntryDate").value
    }

    saveUpdatedEntry(updatedEntryObj)
    console.log(updatedEntryObj)
  }
})

// // add EL to lsiten HERE for (submit editbutton from form rendered above, which will create new OB
// populated by field values (including detail passed from edit entry button event )
// )
/*
if (click was heard on submitedit entry -)
            updatedEntryObj = {
              id: document.querySelector.id(#editEntryForm).name
              topic:  (editEntryTopics) .value
              mood:    (#editEntryMood).value - from dropdown
              entry:    .value
              date: DQS(#editEntryDate)
              (if we had somehting that didnt have a val prop, we could get its innerHTML)
            }

            updateEntry(updatedEntryObj)



*/


const render = () => {
    contentTarget.innerHTML =
    `
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
      <option value="overwhelmed" class="moodDropdown__option"
        >overwhelmed</option
      >
      <option value="excited" class="moodDropdown__option"
        >excited</option
      >
      <option value="Mood 3" class="moodDropdown__option"
        >confused</option
      >
      <option value="grokking" class="moodDropdown__option"
      >grokking</option
    >
    </select>
  </div>
  <button class="entryForm__publishButton" id="publishButton">Publish</button>
</fieldset>

</article>
    `
}

export const JournalForm = () => {
    render()
}

