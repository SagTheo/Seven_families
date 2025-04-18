const userInput = document.querySelector('#userInput')
const addPlayer = document.querySelector('.addPlayer')
const startGame = document.querySelector('.startGame')
const newGame = document.querySelector('.newGame')
const players = document.querySelector('.players')
const currGame = document.querySelector('.currGame')
let allPlayers = []
let idCounter = 0
let names = []
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
const playersCards = {}

families.forEach(family => {
    members.forEach(member => {
        allFamilies.push(member + ' ' + family)
    })
})

addPlayer.addEventListener('click', () => {
    if (userInput.value !== '') {
        const newPlayer = document.createElement('div')
        const name = document.createElement('span')
        const deletePlayer = document.createElement('button')

        newPlayer.setAttribute('id', idCounter)
        deletePlayer.setAttribute('class', idCounter)
        name.innerHTML = userInput.value
        names.push(userInput.value)
        deletePlayer.innerHTML = "Remove player"

        deletePlayer.addEventListener('click', (e) => {
            for (let i = 0; i < allPlayers.length; i++) {
                const idCurrPlayer = allPlayers[i].getAttribute('id')
                const idCurrButton = e.target.getAttribute('class')

                if (idCurrPlayer === idCurrButton) {
                    allPlayers.splice(i, 1)
                    names.splice(i, 1)
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
        startGame.disabled = true
        
        allPlayers.forEach(player => {
            player.children[1].disabled = true
        })

        const cardsShuffled = shuffle(allFamilies)

        for (let i = 0; i < names.length; i++) {
            playersCards[names[i]] = cardsShuffled.splice(0, 7)
        }

        let stopGame = false
        let currPlayerPlaying = 0

        let title = document.createElement('h1')
        title.innerHTML = `${names[currPlayerPlaying]} is playing`

        let comment = document.createElement('span')
        comment.innerHTML = 'Here are your cards:'

        let currCards = document.createElement('ul')

        playersCards[names[currPlayerPlaying]].forEach(card => {
            let currCard = document.createElement('li')
            currCard.innerHTML = card

            currCards.append(currCard)
        })

        // Choosing card
        let cardChosen = ''

        let whichCard = document.createElement('span')
        whichCard.innerHTML = 'Which card do you want?'

        let selectMember = document.createElement('select')
        selectMember.setAttribute('name', 'selectMember')
        
        let chooseOption = document.createElement('option')
        chooseOption.innerHTML = 'Choose an option'
        chooseOption.setAttribute('value', '')

        selectMember.append(chooseOption)

        members.forEach(member => {
            let currOption = document.createElement('option')
            currOption.innerHTML = member
            currOption.setAttribute('value', member)

            selectMember.append(currOption)
        })

        selectMember.addEventListener('change', (e) => {
            cardChosen += e.target.value
        })

        let selectFamily = document.createElement('select')
        selectFamily.setAttribute('name', 'selectFamily')

        let chooseOption2 = document.createElement('option')
        chooseOption2.innerHTML = 'Choose an option'
        chooseOption2.setAttribute('value', '')

        selectFamily.append(chooseOption2)

        families.forEach(family => {
            let currOption = document.createElement('option')
            currOption.innerHTML = family
            currOption.setAttribute('value', family)

            selectFamily.append(currOption)
        })

        selectFamily.addEventListener('change', (e) => {
            cardChosen += ' '
            cardChosen += e.target.value
        })

        // Choosing player
        let playerChosen = null

        let whichPlayer = document.createElement('span')
        whichPlayer.innerHTML = 'Which player do you want to ask a card from?'

        let selectPlayer = document.createElement('select')
        selectPlayer.setAttribute('name', 'selectPlayer')

        let chooseOption3 = document.createElement('option')
        chooseOption3.innerHTML = 'Choose an option'
        chooseOption3.setAttribute('value', '')

        selectPlayer.append(chooseOption3)

        names.forEach(name => {
            if (name !== names[currPlayerPlaying]) {
                let currOption = document.createElement('option')
                currOption.innerHTML = name
                currOption.setAttribute('value', name)

                selectPlayer.append(currOption) 
            }
        })

        selectPlayer.addEventListener('change', (e) => {
            playerChosen = e.target.value
        })

        // Confirm choices
        let confirmChoices = document.createElement('button')

        confirmChoices.innerHTML = 'Confirm choices'

        confirmChoices.addEventListener('click', () => {
            selectMember.disabled = true
            selectFamily.disabled = true
            selectPlayer.disabled = true

            console.log(cardChosen)
            console.log(playerChosen)
        })

        currGame.append(title)
        currGame.append(comment)
        currGame.append(currCards)
        currGame.append(whichCard)
        currGame.append(selectMember)
        currGame.append(selectFamily)
        currGame.append(whichPlayer)
        currGame.append(selectPlayer)
        currGame.append(confirmChoices)

        // while (!stopGame) {

        // }
    }
})

newGame.addEventListener('click', () => {
    players.innerHTML = ''
    addPlayer.disabled = false
    startGame.disabled = false
    allPlayers = []
    names = []
    currGame.innerHTML = ''
})

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