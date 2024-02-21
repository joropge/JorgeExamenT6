document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    navFijo();

    crearGaleria();

    scrollHeader();
}

function navFijo() {
    const barra = document.querySelector(".header");
    const video = document.querySelector(".video");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function () {
        
        if (
            video.getBoundingClientRect().bottom < 0 &&
            this.window.innerWidth >= 768
        ) {
            barra.classList.add("fijo");
            body.classList.add("body-scroll");
        } else {
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }
    });
}

function scrollHeader() {
    const enlaces = document.querySelectorAll(".nave-principal a");

    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeriaImgs");

    for (let i = 1; i <= 6; i++) {
        const imagen = document.createElement("picture");
        imagen.innerHTML = `
  <source srcset="build/img/thumb/${i}.png" type="image/png">
  <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">`;
        imagen.onclick = function () {
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(img) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
  <source srcset="build/img/big/${img}.png" type="image/png">
  <img loading="lazy" width="200" height="300" src="build/img/big/${img}.jpg" alt="imagen galeria">
      `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}