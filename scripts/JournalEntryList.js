import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryCompontent } from "./JournalEntry.js"

const entryLog = document.querySelector("#entryLog")

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

    // entryLog.innerHTML = 

    // `<h2>List of all entries</h2>
    // ${
    //         entries.map(entry => {
    //         return JournalEntryCompontent(entry)
    //     }).join("")
    // }

    //     `
    // }
 

    // for (const entry of entries) {

    //     entryLog.innerHTML += JournalEntryCompontent(entry)
    // }
