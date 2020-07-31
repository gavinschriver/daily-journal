const contentTarget = document.querySelector(".journalFormContainer")

const render = () => {
    contentTarget.innerHTML =
    `
    <form action="" class="entryForm">
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
  <textarea class="entryForm__textArea"></textarea>
</div>

<div class="inputWrapper">
  <label for="mood"
    >My Mood</label>
    <select name="mood" class="entryForm__moodDropdown">
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

  <button class="entryForm__publishButton">Publish</button>
</fieldset>

</form>
    `
}

export const JournalForm = () => {
    return render()
}

