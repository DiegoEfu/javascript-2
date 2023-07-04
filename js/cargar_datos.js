document.addEventListener("DOMContentLoaded", function(event) { 
    leerDatos();
});

function leerDatos() {
    const xhttp = new XMLHttpRequest();

    xhttp.HEADERS_RECEIVED

    xhttp.open('GET', 'js/catalogo.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            console.log(datos);
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
                            <td><button class="btn btn-success" id="editar${item.id}">Editar</button></td>
                            <td><button class="btn btn-danger" id="eliminar${item.id}">Eliminar</button></td>
                        </tr>
                    </tbody>
                `;
                contador++;
            }
        } else{
        }
    }
}