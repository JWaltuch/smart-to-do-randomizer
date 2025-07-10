Question -> Each question has text

Task -> Each task has a name
     -> Each task has many boolean properties, default FALSE

Results are not intended to be stored as it's just meant to be a randomizer. The goal is not to eventually provide analyses of past answers.
Task scores are stored locally per instance of the survey, not long term.

On UI, each question is yes or no. A function is called on the result (ex: func(property: string, response: boolean, increment: boolean)). The function will increment
or decrement every task with that property value === reponse.
