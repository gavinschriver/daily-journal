const eventHub = document.querySelector(".mainContainer")

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

let journalEntries = []

export const useJournalEntries = () => {
    return journalEntries.slice()
}
 
export const getJournalEntries = () => {
    return fetch("http://localhost:3001/entries")
        .then(response => response.json())
        .then(parsedEntries => {
            journalEntries = parsedEntries
            return parsedEntries
        })
}

export const saveEntry = entryObj => {
    return fetch("http://localhost:3001/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
    .then(getJournalEntries)
    .then(dispatchStateChangeEvent)
}

export const saveUpdatedEntry = updatedEntryObj => {
    return fetch(`http://localhost:3001/entries/${parseInt(updatedEntryObj.id)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
    .then(getJournalEntries)
    .then(dispatchStateChangeEvent)
}
