const userInput = document.querySelector('#userInput')
const addPlayer = document.querySelector('.addPlayer')
const players = document.querySelector('.players')

addPlayer.addEventListener('click', () => {
    if (userInput.value !== '') {
        const newPlayer = document.createElement('div')
        
        newPlayer.innerHTML = userInput.value

        players.append(newPlayer)
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