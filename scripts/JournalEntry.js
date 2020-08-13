export const JournalEntryCompontent = (entry) => {
    return `
        <article id="entry--${entry.id}" class="journalEntry">
            <h2>${entry.date}</h2>
            <section>Topics Covered: ${entry.topics}</section>
            <section>${entry.entry}</section>
            <div>Mood: ${entry.mood.label}</div>
            <button id="edit--${entry.id}">Edit Entry</button>
        </article>
    `
}


