document.addEventListener("DOMContentLoaded", (event) => {
    leerDatos();
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
                            <td><button class="btn btn-success" id="editar_${item.id}">Editar</button></td>
                            <td><button class="btn btn-danger eliminar" id="eliminar_${item.id}">Eliminar</button></td>
                        </tr>
                    </tbody>
                `;
                contador++;
            }

            console.log();

            const nuevos_eliminar = document.querySelectorAll('.eliminar');

           nuevos_eliminar.forEach(element => {element.addEventListener("click", (event) => {
                eliminarTarea(event);
            })});
        }
    }
}