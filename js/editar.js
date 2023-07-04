let id_edicion = 0;

const editarTarea = (event) => {
    console.log(event);
    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', '/', true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            const datos = JSON.parse(localStorage.getItem('tareas'));
            const cambiar = datos.filter(x => x.id == event.target.id.split('_')[1])[0];
            id_edicion = cambiar.id;

            document.getElementById('nombre').value = cambiar.tarea;
            document.getElementById('descripcion').value = cambiar.descripcion;

            document.getElementById('botones').innerHTML = `
            <input type="submit" id="editar" class="btn btn-success w-100" value="Editar">
            <input type="submit" id="descartar" class="btn btn-danger w-100" value="Descartar">
            `;

            document.getElementById('descartar').addEventListener('click', (event) => {
                document.getElementById('botones').innerHTML = `
                    <input type="submit" id="crear" class="btn btn-success w-100" value="Crear">
                `;

                document.getElementById('nombre').value = "";
                document.getElementById('descripcion').value = "";
                id_edicion = 0;
            });

            document.getElementById('editar').addEventListener('click', (event) => edicionConfirmada(event));
        }
    }
};

const edicionConfirmada = (event) => {
    let datos = JSON.parse(localStorage.getItem('tareas'));
    let indice = 0;
    
    for(let i = 0; i < datos.length; i++){
        if(datos[i].id == id_edicion){
            indice = i;
            id_edicion = 0;
            break;
        }
    }

    datos[indice].tarea = document.getElementById('nombre').value;
    datos[indice].descripcion = document.getElementById('descripcion').value;

    document.getElementById('botones').innerHTML = `
        <input type="submit" id="crear" class="btn btn-success w-100" value="Crear">
    `;

    document.getElementById('nombre').value = "";
    document.getElementById('descripcion').value = "";
    id_edicion = 0;

    localStorage.setItem('tareas', JSON.stringify(datos));

    leerDatos();
};