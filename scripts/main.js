import { JournalForm } from "./JournalForm.js"
import { EntryListComponent } from "./JournalEntryList.js";
import { getInstructors, useInstructors } from "./InstructorsProvider.js";
import { getMoods, useMoods } from "./MoodsProvider.js";
// import { getMoods, useMoods } from "./MoodsProvider.js";

JournalForm()
EntryListComponent()


getInstructors()
    .then( () => {
        const testInstrucotrs = useInstructors()
        console.log(testInstrucotrs)
    })
    .then( () => {
        const testMoods = useMoods()
        console.log(testMoods)
    })