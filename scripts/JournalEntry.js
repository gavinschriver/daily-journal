export const JournalEntryCompontent = (entryObj) => {
    return `
        <article id="entry--${entryObj.id}" class="journalEntry">
            <h2>${entryObj.date}</h2>
            <section>Topics Covered: ${entryObj.topics}</section>
            <section>${entryObj.entry}</section>
            <div>Instruktor:${entryObj.instructor.first_name}</div>
            <div>Mood: ${entryObj.mood.label}</div>
            <button id="editEntry--${entryObj.id}">Edit Entry</button>
        </article>
    `
}


