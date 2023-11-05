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
    })

    savechanges.addEventListener("click", () => {
        changeDataState(datadisplay);
        savechanges.classList.add("oculto");
    })
});