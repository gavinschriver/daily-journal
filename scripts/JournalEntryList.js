import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryCompontent } from "./JournalEntry.js"

const entryLog = document.querySelector(".journalEntryListContainer")
const eventHub = document.querySelector(".mainContainer")

eventHub.addEventListener("journalStateChanged", () => {
    EntryListComponent()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editEntry--")) {
        const [prefix, entryIdFromHTML] = clickEvent.target.id.split("--")
        const editEntryButtonEvent = new CustomEvent ("editButtonClicked",{

            detail: {
                editEntryId: parseInt(entryIdFromHTML)
            }
        })
        eventHub.dispatchEvent(editEntryButtonEvent)
    } 
})


const render = entries => {

    const entryListHTML =
        entries.map(entryObj => {
            return JournalEntryCompontent(entryObj)
        }).reverse().join("")
    
    entryLog.innerHTML = entryListHTML

}

export const EntryListComponent = () => {
    getJournalEntries()
        .then( (testing) => {
            const entryArray = useJournalEntries()
            render(entryArray)
        })
}




// export const EntryListComponent = ( ) => {

//     return getJournalEntries().then( () => {
        
//     const entries = useJournalEntries()

//     entryLog.innerHTML = 
//         entries.map(entry => {
//             return JournalEntryCompontent(entry)
//         }).reverse().join("")

//     }) //end .then

// }

    
//EntryListComponent() HAS a return value 
//() means INVOKE (if empty, just means no params needed)