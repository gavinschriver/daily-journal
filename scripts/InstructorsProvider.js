let instructors = []

export const getInstructors = () => {
    return fetch(`http://localhost:3001/instructors`)
    .then(res => res.json())
    .then(parsedInstructors => {
        instructors = parsedInstructors
    })
}

export const useInstructors = () => {
    return instructors.slice()
}