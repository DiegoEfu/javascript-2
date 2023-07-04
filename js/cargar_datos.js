document.addEventListener("DOMContentLoaded", (event) => {
    leerDatos();
});

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
});

const leerDatos = () => {
    const xhttp = new XMLHttpRequest();
    
    xhttp.open('GET', 'js/catalogo.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : JSON.parse(this.responseText);
            localStorage.setItem('tareas', JSON.stringify(datos));
            let res = document.querySelector('#res');
            res.innerHTML = "";
            let contador = 1;
            for(let item of datos){
                res.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${contador}</td>
                            <td>${item.tarea}</td>
                            <td>${item.descripcion}</td>
                            <td>${item.hora_creado}</td>
                            <td><button class="btn btn-success editar" id="editar_${item.id}">Editar</button></td>
                            <td><button class="btn btn-danger eliminar" id="eliminar_${item.id}">Eliminar</button></td>
                        </tr>
                    </tbody>
                `;
                contador++;
            }

            const nuevos_eliminar = document.querySelectorAll('.eliminar');
            const nuevos_editar = document.querySelectorAll('.editar');

            nuevos_eliminar.forEach(element => {element.addEventListener("click", (event) => {
                eliminarTarea(event);
            })});

            nuevos_editar.forEach(element => {element.addEventListener("click", (event) => {
                editarTarea(event);
            })});
        }
    }
}