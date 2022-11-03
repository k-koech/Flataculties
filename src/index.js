const url = 'https://flataculties.herokuapp.com/characters/'

document.addEventListener('DOMContentLoaded', () => {
    getCharacters()
})

function getCharacters(){
    fetch(url).then(res => res.json())
    .then(data => {
        showCharacterInfo(data[0])
        data.forEach(character => {
            singleCharacter(character)
        });
    })
}

function singleCharacter(character){
    
    const nameDiv = document.getElementById('character-bar')
    let span = document.createElement('span')
    nameDiv.append(span)
    span.innerHTML = character.name

    span.addEventListener('click', () => {
        showCharacterInfo(character)
        submitVotes(character)
    })

    
}

function showCharacterInfo(character){
    document.getElementById('name').innerHTML = character.name
    document.getElementById('image').src = character.image
    document.getElementById('vote-count').innerHTML = character.votes
}

function UpdateVotes(character){
    fetch(url +  `${character.id}`, {method: 'PATCH', headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'application/json',
      },
      body: JSON.stringify(character)
    }).then(res => res.json()).then(data => showCharacterInfo(data))
}

function submitVotes(character){
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        if (character.votes == 0) {
            character.votes = parseInt(form.votes.value)
            console.log(character.votes);
        }else{
            character.votes = addVotes(character.votes, form.votes.value)
            // console.log(character.votes);
        }
        UpdateVotes(character)
        form.reset()
    })
}

function addVotes(num1, num2){
    return parseInt(num1) + parseInt(num2)
}







