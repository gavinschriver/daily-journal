import { useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryCompontent } from "./JournalEntry.js"

const entryLog = document.querySelector("#entryLog")

export const EntryListComponent = ( ) => {
    const entries = useJournalEntries()

    entryLog.innerHTML = 

    `<h2>List of all entries</h2>
    ${
            entries.map(entry => {
            return JournalEntryCompontent(entry)
        })
    }

        `

    }


    // for (const entry of entries) {

    //     entryLog.innerHTML += JournalEntryCompontent(entry)
    // }
