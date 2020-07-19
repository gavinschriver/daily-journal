export const JournalEntryCompontent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h2>${entry.date}</h2>
            <article>${entry.entry}</article>
        </section>
    `
}