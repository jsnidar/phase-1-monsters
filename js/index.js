let pageNum = 1
let monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`

//Fetch monsters from API when the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    function getMonsters (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => data.forEach(monster => renderOneMonster(monster)))
    }

    function backPage () {
        const backBtn = document.querySelector('#back')
        backBtn.addEventListener('click', (event) => {
            event.preventDefault()
            document.querySelector('#monster-container').innerHTML = ''
            if (pageNum > 1) {
                pageNum--
                monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`
                getMonsters(monstersUrl)
            }else{
                getMonsters(monstersUrl)
            }
        })
    }
    
    function forwardPage () {
        
        const forwardBtn = document.querySelector('#forward')
        forwardBtn.addEventListener('click', (event) => {
                document.querySelector('#monster-container').innerHTML = ''
                event.preventDefault()
                debugger
                pageNum++
                monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`
                getMonsters(monstersUrl)
            })
        }

    getMonsters(monstersUrl)
    createMonsterForm()
    backPage()
    forwardPage()
})


//Load them to the DOM in the monsters container
function renderOneMonster(monster) {
//Declare variables for the div and for sections of the monster div
const monsterDiv = document.createElement('div')
const monsterName = document.createElement('h2')
const monsterAge = document.createElement('h4')
const monsterDesc = document.createElement('p')

//Assign values to the elements
monsterDiv.id = monster.name
monsterName.innerText = monster.name
monsterAge.innerText = monster.age 
monsterDesc.innerText = monster.description

//Assign values to the elements in the div
monsterDiv.appendChild(monsterName)
monsterDiv.appendChild(monsterAge)
monsterDiv.appendChild(monsterDesc)

//Append the div to the DOM
document.querySelector('#monster-container').appendChild(monsterDiv)
}

//Create a new monster form
function createMonsterForm () {
    //declare variables for each element in the form
    const form = document.createElement('form')
    const nameInput = document.createElement('input')
    const ageInput = document.createElement('input')
    const descInput = document.createElement('input')
    const submitBtn = document.createElement('input')

    //assign attributes to each variable
    form.id = 'monster-form'
    nameInput.id = 'name'
    nameInput.placeholder = "name..."
    ageInput.id = 'age'
    ageInput.placeholder = 'age...'
    descInput.id = 'description'
    descInput.placeholder = 'description...'
    submitBtn.innerText = 'Create'
    submitBtn.type = 'submit'

    //append the elements to the form
    form.appendChild(nameInput)
    form.appendChild(ageInput)
    form.appendChild(descInput)
    form.appendChild(submitBtn)
    //append the form to the DOM
    document.querySelector('#create-monster').appendChild(form)

    //Create a monster using the data entered in the new monster form
    form.addEventListener('submit', e => {
        e.preventDefault()
        const name = document.querySelector('#name')
        const age = document.querySelector('#age')
        const desc = document.querySelector('#description')
        const monsterObj = {name: name.value, age: age.value, description: desc.value}
        console.log('monster', monsterObj)
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monsterObj)
        })
        .then(resp => resp.json())
        .then(data => renderOneMonster(data))
    })
}



