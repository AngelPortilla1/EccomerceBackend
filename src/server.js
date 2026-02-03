import express from 'express'


const app = express()

const PORT = 3000


function groundhogDayPrediction(appearance) {
    if (appearance === true) {
        return "The groundhog saw its shadow! Six more weeks of winter."
    }
    if (appearance === false) {
        return "The groundhog did not see its shadow! An early spring is on the way."
    }
    else {
        return "Invalid input. Please provide true or false."
    }

  
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})