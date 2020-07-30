let journalEntries = []

export const useJournalEntries = () => {
    return journalEntries.slice()
}
 
export const getJournalEntries = () => {
    return fetch("http://localhost:3000/entries")
        .then(response => response.json())
        .then(parsedEntries => {
            journalEntries = parsedEntries
        })
}