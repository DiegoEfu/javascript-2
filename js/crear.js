document.getElementById('crear').addEventListener("click", (event) => {
    event.preventDefault();
    crearNuevaTarea(event);
});

const crearNuevaTarea = (event) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', '', true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            let datos = JSON.parse(localStorage.getItem('tareas'));
            let highestId = 0;

            for(let i = 0; i < datos.length; i++){
                highestId = datos[i].id > highestId ? datos[i].id : highestId;
            }

            console.log(highestId);
            const hora = new Date();

            datos.push({'id': highestId + 1, 'tarea': document.getElementById('nombre').value,
                'descripcion': document.getElementById('descripcion').value, 
                'hora_creado': `${hora.getDate()}/${hora.getMonth()}/${hora.getFullYear()} ${hora.getHours()}:${hora.getMinutes()}`});
            
            localStorage.setItem('tareas', JSON.stringify(datos));

            document.getElementById('nombre').value = "";
            document.getElementById('descripcion').value = "";
        }
    }

    leerDatos();
};