const cont_personajes = document.querySelector('#cont_personajes');
const select_personaje = document.querySelector('#select_personaje');
let array_personajes = []

const consulta = async () => {
    try {
        const res= await fetch('https://rickandmortyapi.com/api/character')
        const data =await res.json()
        array_personajes = data["results"].slice(0, -2)

        mostrar_personajes(array_personajes)
        cargar_select()

    } catch (error) {
        console.log(error);
    }
}
const cargar_select = () => {
    const option = document.createElement('option');
    option.setAttribute('value', 0)
    option.innerText = 'Todos los personajes'
    select_personaje.appendChild(option)


    array_personajes.forEach( personaje => {
        const option = document.createElement('option');
        option.setAttribute('value', personaje.id)
        option.innerText = personaje.name

        select_personaje.appendChild(option)
    });
}

const mostrar_personajes = (a_mosrar) => {
    cont_personajes.innerHTML  = ''
    a_mosrar.forEach(personaje => {
        const col = document.createElement('div')
        col.classList.add("col");
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
            <img src="${personaje.image}" alt="imagen de ${personaje.name}" /class='card-img-top'>  
            <div class="card-body text-center">
                <h5 class='card-title'>${personaje.name}</h5>
            </div>

        `
        col.appendChild(card)
        cont_personajes.appendChild(col)
    });
}

consulta()

select_personaje.addEventListener("change", (event) => {
    const idSeleccion = parseInt(event.target.value)

    if(idSeleccion === 0){
        mostrar_personajes(array_personajes)
    }
    else{
        const filtrado=array_personajes.filter(e=>e.id===idSeleccion)
        mostrar_personajes(filtrado)
    }

});