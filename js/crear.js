document.getElementById('crear').addEventListener("submit", (event) => {
    event.preventDefault();
    crearNuevaTarea();
});

const crearNuevaTarea = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', '', true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
        console.log(this.status);
        if(this.readyState == 4){
            let datos = JSON.parse(localStorage.getItem('tareas'));
            const highestId = datos.reduce((highest=0, x) => x.id > highest ? x.id : highest);
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