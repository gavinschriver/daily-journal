/* Journal data provider for Daily Journal applicaiton

Holds the raw data about each entry and exports
functions that other modules can use to filter the entries for different purposes.

*/

// THis is the original data.
const journal = [
    {
        id: 1,
        date: "07/13/2020",
        concept: "Group project",
        entry: "Kept practicing github collaboration as we finsihed our `Hello World` Group poject",
        mood: "excited"
    },
    {
        id: 2,
        date: "07/14/2020",
        concept: "modular js components",
        entry: "Hit with a ton of bricks about modular component creation",
        mood: "overwhelmed"
    },
    {
        id: 3,
        date: "07/14/2020",
        concept: "lab time; debugging; pro dev",
        entry: "Worked on Martin's Aquarium modules, Daily Journal layout",
        mood: "grokking"
    }
]



export const useJournalEntries = () => { // create an exportable variable and assign it the following function:
    const sortedByDate = journal.sort( // create a variable and assign it the value of calling the sort method on the journal array defined above...
        (currentEntry, nextEntry) =>  //.. using the parameters currentEntry and nextEntry as labels for each set of sequential array values (objects) being compared
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date) // and create a comparison function that subtracts the value of passing the date property of the nextEntry object as an argument for the Date.parse method (converts a string into a longass number based on time) from the value of passing the date property of the currentEntry object as an argument for the Date.parse method (will ALSO return a longass number)
    ) // --- values in a new array will be sorted from OLDEST entry FIRST (lowest Index) to NEWEST entry LAST (highest index) checkit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
    return sortedByDate
 }

 //value of invoking useJournalEntries() will be the sortedByDate array
 