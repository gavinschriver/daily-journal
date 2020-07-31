import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryCompontent } from "./JournalEntry.js"

const entryLog = document.querySelector(".journalEntryListContainer")
const eventHub = document.querySelector("")




export const EntryListComponent = ( ) => {
    return getJournalEntries().then(() => {

    const entries = useJournalEntries()

    entryLog.innerHTML = `${
        entries.map(entry => {
            return JournalEntryCompontent(entry)
        }).join("")
    }`
 
    })
}

    
