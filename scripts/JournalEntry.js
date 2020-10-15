export const JournalEntryCompontent = (entryObj, tagArr) => {
  return `
        <article id="entry--${entryObj.id}" class="journalEntry">
            <h2>${entryObj.date}</h2>
            <section>Topics Covered: ${entryObj.topics}</section>
            <section>${entryObj.entry}</section>
            <div>Instruktor:${entryObj.instructor.first_name}</div>
            <div>Mood: ${entryObj.mood.label}</div>
            <div id="entryTags--${entryObj.id}">
            <ul>
            ${tagArr
              .map((tagObj) => {
                return `<li>${tagObj.subject}</li>`;
              })
              .join("")}
            </ul>
            </div>
            <button id="editEntry--${entryObj.id}">Edit Entry</button>
            <button id="deleteEntry--${entryObj.id}">BALEETE</button>
        </article>
    `;
};
