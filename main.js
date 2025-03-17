// Array de servicios (Se agregaron servicios)
const servicios = [
    { id: 1, profesion: 'Electricista', precio: 50 },
    { id: 2, profesion: 'Plomero', precio: 60 },
    { id: 3, profesion: 'Carpintero', precio: 70 },
    { id: 4, profesion: 'Programador', precio: 100 },
    { id: 5, profesion: 'Veterinario', precio: 80 },
    { id: 6, profesion: 'Escribano', precio: 90 },
    { id: 7, profesion: 'Profesor de educacion fisica', precio: 65 },
    { id: 8, profesion: 'Profesor de musica', precio: 75 },
    { id: 9, profesion: 'Abogado', precio: 110 },
    
];

// Array para guardar los servicios contratados
let serviciosContratados = JSON.parse(localStorage.getItem('contratados')) || []


// Declaracion de las variables para los contenedores de servicios y servicios contratados
const serviciosContainer = document.getElementById('servicios-container')
const contratadosContainer = document.getElementById('contratados-container')
const mostrarServiciosBtn = document.getElementById('btn-mostrar-servicios')

mostrarServiciosBtn.addEventListener('click', mostrarServicios)

// Función para mostrar los servicios disponibles
function mostrarServicios() {
    serviciosContainer.innerHTML = '<h2>Servicios disponibles</h2>'
    servicios.forEach(servicio => {
        let div = document.createElement('div')
        div.innerHTML = `
        <h4>${servicio.profesion} - $${servicio.precio}
            <button onclick='contratarServicio(${servicio.id})'>Conntratar</button>
        </h4>`
        serviciosContainer.appendChild(div)
    })

    // Definicion del evento para contratar un servicio
    document.querySelectorAll('.contratar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id)
            contratarServicio(id)
        })
    })
}

// Funcion para contratar un servicio
function contratarServicio(id) {
    let servicio = servicios.find(s => s.id === id)
    if (servicio) {
        serviciosContratados.push(servicio)
        localStorage.setItem('contratados', JSON.stringify(serviciosContratados))
        mostrarServiciosContratados()
    }
}

// Funcion para mostrar los servicios contratados
function mostrarServiciosContratados() {
    contratadosContainer.innerHTML = '<h2>Servicios contratados:</h2>'

    if (serviciosContratados.length === 0) {
        let mensaje = document.createElement('p');
        mensaje.textContent = 'Aun no has contratado servicios!';
        contratadosContainer.appendChild(mensaje);
        return;
    }

    // Deficion del evento para mostrar los servicios contratados
    serviciosContratados.forEach((servicio, index) => {
        let div = document.createElement('div')
        div.innerHTML = `
        <h4>${servicio.profesion} - $${servicio.precio}
            <button class='eliminar-btn' data-index'(${index})'>Eliminar</button>
        </h4>`
        contratadosContainer.appendChild(div)
    })

    // Definicion del evento para eliminar un servicio contratado
    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index)
            eliminarServicio(index)
        })
    })
}

// Funcion para eliminar 1 servicio elegido
function eliminarServicio (index) {
    serviciosContratados.splice(index, 1)
    localStorage.setItem('contratados', JSON.stringify(serviciosContratados))
    mostrarServiciosContratados()
}

mostrarServiciosContratados()
