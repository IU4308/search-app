const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameSpan = document.getElementById("pokemon-name")
const idSpan = document.getElementById("pokemon-id")
const weightSpan = document.getElementById("weight")
const heightSpan = document.getElementById("height")
const typesSpan = document.getElementById("types")
const hpSpan = document.getElementById("hp")
const attackSpan = document.getElementById("attack")
const defenseSpan = document.getElementById("defense")
const specialAttackSpan = document.getElementById("special-attack")
const specialDefenseSpan = document.getElementById("special-defense")
const speedSpan = document.getElementById("speed")
const imgContainer = document.getElementById('img-container')


const search = async (input) => {
    const regex = /([0-9]+e\+[0-9]+|[0-9]+[.][0-9]+|[.][0-9]+)/g;
    if (regex.test(input)) {
        input = input.replace(regex, "")
    }

    if (!isNaN(input)) {
        input = Number(input)
    }

    if (isNaN(input)) {
        input = input.toLowerCase()
    }

    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`);
        const data = await res.json()
        displayPokemon(data)

    } catch (err) {
        alert("Pokemon not found")
        clearDisplay()
        console.log(err)
    }
}

const displayPokemon = (data) => {
    const { id, name, weight, height, sprites, types, stats } = data
    const { front_default: sprite } = sprites
    const [hp, attack, defense, spAttack, spDefense, speed] =
        stats.map(stat => stat.base_stat)

    nameSpan.innerText = name;
    idSpan.innerText = id;
    weightSpan.innerText = `Weight: ${weight}`;
    heightSpan.innerText = `Height: ${height}`;
    imgContainer.innerHTML = `<img id="sprite" src="${sprite}" alt="${name}">`
    typesSpan.innerHTML = types.map(item => {
        return `<span class="type">${item.type.name}</span>`
    }).join("")
    hpSpan.innerText = hp
    attackSpan.innerText = attack
    defenseSpan.innerText = defense
    specialAttackSpan.innerText = spAttack
    specialDefenseSpan.innerText = spDefense
    speedSpan.innerText = speed
}

const clearDisplay = () => {
    nameSpan.innerText = ""
    idSpan.innerText = ""
    weightSpan.innerText = ""
    heightSpan.innerText = ""
    imgContainer.innerHTML = ""
    typesSpan.innerHTML = ""
    hpSpan.innerText = ""
    attackSpan.innerText = ""
    defenseSpan.innerText = ""
    specialAttackSpan.innerText = ""
    specialDefenseSpan.innerText = ""
    speedSpan.innerText = ""
    imgContainer.innerText = ""
}

console.log
searchBtn.addEventListener("click", () => {
    search(input.value)
})
