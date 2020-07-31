import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js";
import { EntryListComponent } from "./JournalEntryList.js";
import { JournalForm } from "./JournalForm.js"

JournalForm()
EntryListComponent()

getJournalEntries()
.then(() => {
    const journalEntryArray = useJournalEntries()
    console.log(journalEntryArray)
}) 