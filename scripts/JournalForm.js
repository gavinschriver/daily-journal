import { saveEntry} from "./JournalDataProvider.js"

const contentTarget = document.querySelector(".journalFormContainer")
const eventHub = document.querySelector(".mainContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "publishButton") {
        const newEntry = {
            date: document.querySelector("#journalDate").value,
            topics: document.querySelector("#topicsCovered").value,
            entry: document.querySelector("#entryText").value,
            mood: document.querySelector("#moodSelect").value
        }
        console.log(newEntry)
        saveEntry(newEntry)
    }
})

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

