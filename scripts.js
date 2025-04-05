const userInput = document.querySelector('#userInput')
const addPlayer = document.querySelector('.addPlayer')
const startGame = document.querySelector('.startGame')
const newGame = document.querySelector('.newGame')
const players = document.querySelector('.players')
let allPlayers = []
let idCounter = 0

addPlayer.addEventListener('click', () => {
    if (userInput.value !== '') {
        const newPlayer = document.createElement('div')
        const name = document.createElement('span')
        const deletePlayer = document.createElement('button')

        newPlayer.setAttribute('id', idCounter)
        deletePlayer.setAttribute('class', idCounter)
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

startGame.addEventListener('click', () => {
    if (allPlayers.length < 2) {
        alert('There must be at least 2 players to start a game')
    } else {
        addPlayer.disabled = true
        
        allPlayers.forEach(player => {
            player.children[1].disabled = true
        })
    }
})

newGame.addEventListener('click', () => {
    players.innerHTML = ''
    addPlayer.disabled = false
    allPlayers = []
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