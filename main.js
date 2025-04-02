// Array de servicios 
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

// Función para mostrar los servicios disponibles. Ahora el boton de servicios disponibles cambia a "Ocultar Servicios" cuando se muestran los servicios y vuelve a "Servicios Disponibles" cuando se ocultan. 
let mostrandoServicios = false; 

function mostrarServicios() {
    if (mostrandoServicios) {
        serviciosContainer.innerHTML = "";
        mostrarServiciosBtn.innerText = "Servicios Disponibles";
        mostrandoServicios = false;
    } else {
        // Si no están visibles, los mostramos y cambiamos el texto del botón
        serviciosContainer.innerHTML = '<h2>Servicios disponibles</h2>';

        servicios.forEach(servicio => {
            let div = document.createElement('div');
            div.innerHTML = `
                <h4>${servicio.profesion} - $${servicio.precio}
                    <button class='contratar-btn' data-id="${servicio.id}">Contratar</button>
                </h4>`;
            serviciosContainer.appendChild(div);
        });

        // Agregar eventos a los botones después de crearlos en el DOM
        document.querySelectorAll('.contratar-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                contratarServicio(id);
            });
        });

        // Cambia el texto a "Ocultar Servicios" cuando estos estan visibles
        mostrarServiciosBtn.innerText = "Ocultar Servicios";
        mostrandoServicios = true;
    }
}


    // Definicion del evento para contratar un servicio
    document.querySelectorAll('.contratar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id)
            contratarServicio(id)
        })
    })


// Funcion para contratar un servicio
function contratarServicio(id) {
    let servicio = servicios.find(s => s.id === id);
    if (servicio) {
        serviciosContratados.push(servicio);
        localStorage.setItem('contratados', JSON.stringify(serviciosContratados));
        mostrarServiciosContratados();

        Swal.fire({
            title: '¡Servicio Contratado!',
            text: `Has contratado un ${servicio.profesion} por $${servicio.precio}.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
}


// Funcion para mostrar los servicios contratados
function mostrarServiciosContratados() {
    contratadosContainer.innerHTML = '<h2>Servicios contratados:</h2>';

    if (serviciosContratados.length === 0) {
        let mensaje = document.createElement('p');
        mensaje.textContent = '¡Aún no has contratado servicios!';
        contratadosContainer.appendChild(mensaje);
        return;
    }

    let total = 0;

    serviciosContratados.forEach((servicio, index) => {
        total += servicio.precio;

        let div = document.createElement('div');
        div.innerHTML = `
        <h4>${servicio.profesion} - $${servicio.precio}
            <button class='eliminar-btn' data-index="${index}">Eliminar</button>
        </h4>`;
        contratadosContainer.appendChild(div);
    });

    // Muestra el total de la suma de los servicios contratados
    let totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
    contratadosContainer.appendChild(totalDiv);

    // Evento para eliminar un servicio contratado
    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            eliminarServicio(index);
        });
    });
}


// Funcion para eliminar 1 servicio contratado
function eliminarServicio(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Este servicio será eliminado de tu lista.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            serviciosContratados.splice(index, 1);
            localStorage.setItem('contratados', JSON.stringify(serviciosContratados));
            mostrarServiciosContratados();

            Swal.fire(
                'Eliminado',
                'El servicio ha sido eliminado.',
                'success'
            );
        }
    });
}


mostrarServiciosContratados()

// Agregar evento al formulario para sugerir un nuevo servicio
const sugerirForm = document.getElementById('sugerir-form');

sugerirForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Se obtienen los valores del formulario
    const profesion = document.getElementById('profesion').value;
    const precio = parseFloat(document.getElementById('precio').value);

    // Verifica que los valores sean válidos
    if (profesion && precio && !isNaN(precio)) {
        // Crear el nuevo servicio
        const nuevoServicio = {
            id: servicios.length + 1,  // Asignar un ID único
            profesion: profesion,
            precio: precio
        };

        // Agrega el nuevo servicio al array de servicios
        servicios.push(nuevoServicio);
        Swal.fire({
            title: '¡Nuevo servicio agregado!',
            text: `El servicio de ${profesion} por $${precio} ha sido agregado exitosamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Limpia el formulario
        sugerirForm.reset();

        // Volver a mostrar los servicios contratados si es necesario
        mostrarServicios();
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Por favor ingresa datos válidos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});

// Seleccionamos el formulario y el overlay, que hace que se oscurezca el fondo
const formContainer = document.getElementById('form-container');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Botón para mostrar el formulario
document.getElementById('btn-mostrar-form').addEventListener('click', () => {
    formContainer.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Cierra el formulario al hacer clic fuera de él
overlay.addEventListener('click', () => {
    formContainer.classList.remove('active');
    overlay.classList.remove('active');
});



// Div para mostrar la fecha y hora con la libreria Luxon
const relojContainer = document.createElement('div');
relojContainer.setAttribute('id', 'reloj-container');
document.body.insertBefore(relojContainer, document.body.firstChild);

// Función para actualizar la hora en tiempo real
function actualizarHora() {
    const DateTime = luxon.DateTime;
    let ahora = DateTime.now().setZone('America/Argentina/Buenos_Aires'); // Ajusta la zona horaria (No me permite usar la hora de Uruguay)

    relojContainer.innerHTML = `
        <h3>Fecha y Hora: ${ahora.toFormat('dd/MM/yyyy HH:mm:ss')}</h3>
    `;
}

// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);


actualizarHora();

