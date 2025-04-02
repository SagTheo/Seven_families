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

        newPlayer.setAttribute('id', idCounter)

        name.innerHTML = userInput.value
        deletePlayer.innerHTML = "Remove player"

        // Needs more work
        deletePlayer.addEventListener('click', () => {
            for (let i = 0; i < allPlayers.length; i++) {
                const currId = allPlayers[i].getAttribute('id')
                console.log(currId)
                console.log(idCounter)

                if (currId === idCounter) {
                    console.log(currId)
                    allPlayers.splice(i, 1)
                }
            }

            players.innerHTML = ''

            allPlayers.forEach(player => {
                players.append(player)
            })
        })

        newPlayer.append(name)
        newPlayer.append(deletePlayer)

        allPlayers.push(newPlayer)

        allPlayers.forEach(player => {
            players.append(player)
        })

        userInput.value = ''
        idCounter++
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