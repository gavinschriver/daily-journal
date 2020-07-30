import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js";
import { EntryListComponent } from "./JournalEntryList.js";



EntryListComponent()

getJournalEntries()
.then(() => {
    const journalEntryArray = useJournalEntries()
    console.log(journalEntryArray)
}) 