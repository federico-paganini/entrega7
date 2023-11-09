function changeDataState(inputGroup) {
    inputGroup.forEach(input => {
        if (input.classList.contains("datosfijos")) {
            input.classList.remove("datosfijos");
            input.disabled = false;
        } else {
            input.classList.add("datosfijos");
            input.disabled = true;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const baseDatos = JSON.parse(localStorage.getItem("Usuariosdb"));
    let usuarioActivo = undefined;
    const dataLocation = localStorage.getItem("dataLocation");
    if (dataLocation) {
        usuarioActivo = baseDatos.find(usuario => usuario.nombreUsuario === localStorage.getItem("UsuarioActivo"));
    } else {
        usuarioActivo = baseDatos.find(usuario => usuario.nombreUsuario === sessionStorage.getItem("UsuarioActivo"));
    }

    const pnombre = document.getElementById("user-name");
    const snombre = document.getElementById("user-sname");
    const papellido = document.getElementById("user-srname");
    const sapellido = document.getElementById("user-ssrname");
    const cemail = document.getElementById("user-mail");
    const ctelefono = document.getElementById("user-phone");
    const profileimg = document.getElementById("profilesimg");

    /* Imputs y manejo para cambiar datos */
    const btneditinfo = document.getElementById("edit-userinfo");
    const userdatabox = document.getElementById("userdata");
    const datadisplay = userdatabox.querySelectorAll("input");
    const savechanges = document.getElementById("save-userchanges");

    /* Precargar los imput y la imagen de perfil*/
    pnombre.value = usuarioActivo.nombre;
    snombre.vaule = usuarioActivo.snombre;
    papellido.value = usuarioActivo.apellido;
    sapellido.value = usuarioActivo.sapellido;
    cemail.value = usuarioActivo.email;
    ctelefono.value = usuarioActivo.telefonos[0];
    profileimg.src = usuarioActivo.imagen_perfil.image_source[usuarioActivo.imagen_perfil.selected];
    datadisplay.forEach(input => {
        input.disabled = true;
    });

    btneditinfo.addEventListener("click", () => {
        changeDataState(datadisplay);
        pnombre.value = usuarioActivo.nombre;
        snombre.vaule = usuarioActivo.snombre;
        papellido.value = usuarioActivo.apellido;
        sapellido.value = usuarioActivo.sapellido;
        cemail.value = usuarioActivo.email;
        ctelefono.value = usuarioActivo.telefonos[0];
        savechanges.classList.remove("oculto");
        console.log(usuarioActivo.imagen_perfil.selected);
    })

    savechanges.addEventListener("click", () => {
        changeDataState(datadisplay);
        savechanges.classList.add("oculto");
    })

    /* Cargar las imágenes del localStorage en el modal cuando abre*/
    const cargarModal = document.getElementById("changebtn");
    const mostrarImg = document.getElementById("profileimgoptions");

    cargarModal.addEventListener("click", () => {
        mostrarImágenes();
    })

    /* Subir una nueva imágen para seleccionar el perfil */
    const inputFileImg = document.getElementById("new-profileimg");
    const guardarImg = document.getElementById("save-img");


    guardarImg.addEventListener("click", (e) => {
        e.preventDefault();
        const newImg = inputFileImg.files[0];
        if (newImg) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64img = e.target.result;
                usuarioActivo.imagen_perfil.image_source.push(base64img);
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
                mostrarImágenes();
            }
            reader.readAsDataURL(newImg);
        } else {

        }
       
    })
    

    function mostrarImágenes() {
        mostrarImg.innerHTML = "";
    
    
        /* Líneas de código que manejan la seleccion de las opciones de iconos*/
        for (let i = 0; i < (usuarioActivo.imagen_perfil.image_source).length; i++) {
            let columna = document.createElement("div");
            let imagenTag = document.createElement("img");
            columna.classList.add("col-auto", "mb-3");
            imagenTag.src = usuarioActivo.imagen_perfil.image_source[i];
            imagenTag.classList.add("icono");
    
            imagenTag.addEventListener("click", () => {
                let ImagenPerfil = document.getElementById("profilesimg");
                ImagenPerfil.src = usuarioActivo.imagen_perfil.image_source[i];
                usuarioActivo.imagen_perfil.selected = i;
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            })
    
            columna.appendChild(imagenTag);
            mostrarImg.appendChild(columna);
        }
    };
});




/* Líneas de código que manejan la seleccion de las opciones de iconos
let Iconos = document.getElementsByClassName("icono")

function EventoIconos(icono) {
    icono.addEventListener("click", () => {
        let ImagenPerfil = document.getElementById("profilesimg")
        ImagenPerfil.src = icono.src;
    });
};

for (i = 0; i < Iconos.length; i++) {
    EventoIconos(Iconos[i])
} 

*/