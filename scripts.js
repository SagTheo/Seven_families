const userInput = document.querySelector('#userInput')
const addPlayer = document.querySelector('.addPlayer')
const players = document.querySelector('.players')
const allPlayers = []
let idCounter = 0

addPlayer.addEventListener('click', () => {
    if (userInput.value !== '') {
        const newPlayer = document.createElement('div')
        const name = document.createElement('span')
        const deletePlayer = document.createElement('button')

        deletePlayer.setAttribute('class', idCounter)
        newPlayer.setAttribute('id', idCounter)

        name.innerHTML = userInput.value
        deletePlayer.innerHTML = "Remove player"

        deletePlayer.addEventListener('click', (e) => {
            for (let i = 0; i < allPlayers.length; i++) {
                const idCurrPlayer = allPlayers[i].getAttribute('id')
                const idCurrButton = e.target.getAttribute('class')

                if (idCurrPlayer === idCurrButton) {
                    allPlayers.splice(i, 1)
                }
            }

            players.innerHTML = ''

            allPlayers.forEach(player => {
                players.append(player)
            })

            if (addPlayer.disabled === true) {
                if (allPlayers.length < 6) {
                    addPlayer.disabled = false
                }    
            }
            
        })

        newPlayer.append(name)
        newPlayer.append(deletePlayer)

        allPlayers.push(newPlayer)

        players.append(newPlayer)

        userInput.value = ''
        userInput.focus()
        idCounter++

        if (allPlayers.length === 6) {
            addPlayer.disabled = true
        } 
    }
})

const families = [
    "Grimes",
    "Parker",
    "Wayne",
    "Rogers",
    "Banner",
    "Kent",
    "Queen"
]

const members = [
    "Grandfather",
    "Grandmother",
    "Father",
    "Mother",
    "Son",
    "Daughter"
]

const allFamilies = []
const nbPlayers = 4
const playersCards = {}

const shuffle = array => {
    const copy = array.slice()
    const result = []

    while (copy.length > 1) {
        const index = Math.floor(Math.random() * copy.length)

        result.push(copy[index])

        copy.splice(index, 1)
    }

    result.push(copy[0])

    return result
}

families.forEach(family => {
    members.forEach(member => {
        allFamilies.push(member + ' ' + family)
    })
})

const cardsShuffled =  shuffle(allFamilies)

for (let i = 1; i <= nbPlayers; i++) {
    playersCards[`player_${i}`] = cardsShuffled.splice(0, 7)
}

console.log(playersCards)
console.log(cardsShuffled)