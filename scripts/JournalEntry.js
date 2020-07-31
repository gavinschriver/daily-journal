export const JournalEntryCompontent = (entry) => {
    return `
        <article id="entry--${entry.id}" class="journalEntry">
            <h2>${entry.date}</h2>
            <section>Topics Covered: ${entry.topics}</section>
            <section>${entry.entry}</section>
            <div>Mood: ${entry.mood}</div>
        </article>
    `
}