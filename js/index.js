// menu

const menu = document.querySelector('.menu');
const abrir = document.querySelector('.hamburguesa');
const cerrar = document.querySelector('.btn-cerrar');

function toggleMenu() {
    menu.classList.toggle('menu_abierto');
}

abrir.addEventListener('click', toggleMenu);
cerrar.addEventListener('click', toggleMenu);

const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
menuLinks.forEach(menuLinks => {
    menuLinks.addEventListener("click", function() {
        menu.classList.remove("menu_abierto");
    })
})

// contacto

const formulario = document.getElementById('contacto');
const input_nombre = formulario.querySelector('input[name="nombre"]');
const input_correo_contacto = formulario.querySelector('input[name="correo"]');
const input_telefono = formulario.querySelector('input[name="telefono"]');
const input_asunto = formulario.querySelector('input[name="asunto"]');
const textarea_mensaje = formulario.querySelector('textarea[name="mensaje"]');
const mensaje_contacto = document.getElementById('mensaje_contacto');

const errores = (mensaje, input, isError = true) => {
    if(isError) {
        input.classList.add("invalido");
        input.nextElementSibling.classList.add("error");
        input.nextElementSibling.innerText = mensaje;
        mensaje_contacto.textContent = "El formulario contiene errores. Por favor, verifica los campos.";
        mensaje_contacto.classList.add('error');

    }else {
        input.classList.remove("invalido");
        input.nextElementSibling.classList.remove("error");
        input.nextElementSibling.innerText = "";
        mensaje_contacto.textContent = " ";
        mensaje_contacto.classList.remove('error');
    }
}

const validarCampos = (mensaje, e) => {
    const input = e.target;
    const inputValue = (e.target.value);
    if(inputValue.trim().length === 0) {
        errores(mensaje, input);

    }else{
        errores("", input, false);    
    }
}

const validarCorreo = (e) => {
    const input = e.target;
    const inputValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); 
    console.log(regex.test(input.value))
    if(inputValue.trim().length > 5 && !regex.test(input.value)) {
        errores("Correo invalido", input);
        
    }else{
        errores("", input, false);
    }
}

const validarMensaje = (e) => {
    const textarea = e.target;
    const inputValue = textarea.value;
    if (inputValue.trim().length < 2) {
        textarea.classList.add("invalido");
        textarea.nextElementSibling.classList.add("error");
        textarea.nextElementSibling.innerText = "Ingresa un mensaje más largo";
    } else {
        textarea.classList.remove("invalido");
        textarea.nextElementSibling.classList.remove("error");
        textarea.nextElementSibling.innerText = "";
    }
    };

input_nombre.addEventListener('blur', (e) => validarCampos("Nombre es requerido", e));
input_correo_contacto.addEventListener('blur', (e) =>validarCampos("Correo es requerido", e));
input_telefono.addEventListener('blur', (e) =>validarCampos("Telefono es requerido", e));
input_asunto.addEventListener('blur', (e) =>validarCampos("Asunto es requerido", e));

textarea_mensaje.addEventListener('input', validarMensaje);

input_correo_contacto.addEventListener('input', validarCorreo);

formulario.addEventListener('submit', function (e) {
    let formularioValido = true; 
    
    validarCampos("Nombre es requerido", { target: input_nombre });
    validarCampos("Correo es requerido", { target: input_correo_contacto });
    validarCampos("Teléfono es requerido", { target: input_telefono });
    validarCampos("Asunto es requerido", { target: input_asunto });
    validarCorreo({ target: input_correo_contacto });
    validarMensaje({ target: textarea_mensaje });
    
    if (formulario.querySelector('.invalido')) {
        formularioValido = false;
        e.preventDefault();
    
    }else {
        formularioValido = true;
        mensaje_contacto.textContent = " ";
        mensaje_contacto.classList.remove('error-suscripcion');

        const nuevoParrafo = document.createElement('p');
        mensaje_contacto.appendChild(nuevoParrafo);
        nuevoParrafo.classList.add('exito');
        nuevoParrafo.textContent = 'Mensaje enviado exitosamente';
    }
});

// suscripcion

function suscripcion() {
    const formulario = document.getElementById('suscripcion');
    const correoInput = formulario.querySelector('input[name="correo_suscripcion"]');
    const nombreSuscripcionInput = formulario.querySelector('input[name="nombre_suscripcion"]');
    const nuevoParrafo = document.createElement('span');
    mensaje_suscripcion.appendChild(nuevoParrafo);

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
      
        if (!nombreSuscripcionInput.value.trim()) {
          const mensaje_suscripcion = document.getElementById('mensaje_suscripcion');
          nuevoParrafo.classList.add('error');
          nombreSuscripcionInput.classList.add("invalido");
          nuevoParrafo.textContent = 'Ingresa tu nombre';
          return; 
        }
      
        const correo = correoInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
          const mensaje_suscripcion = document.getElementById('mensaje_suscripcion');
          nuevoParrafo.classList.add('error-suscripcion');
          correoInput.classList.add("invalido");
          nuevoParrafo.textContent = 'Ingresa un correo válido.';
          return; 
        }
      
        nuevoParrafo.classList.remove('error-suscripcion');
        nombreSuscripcionInput.classList.remove("invalido");
        correoInput.classList.remove("invalido");
        nuevoParrafo.classList.add('exito');
        nuevoParrafo.textContent = 'Bienvenida!!! Gracias por suscribirte';
        formulario.submit();
      });         
}

suscripcion();

// preguntas frecuentes

function preguntas() {
    const preguntas = document.querySelectorAll('.pregunta');

preguntas.forEach(pregunta => {
    pregunta.addEventListener('click', () => {
        const respuesta = pregunta.nextElementSibling;

        if (respuesta.classList.contains('respuesta-oculta')) {
                respuesta.classList.remove('respuesta-oculta');
                respuesta.classList.add('respuesta-visible');
            } else {
                respuesta.classList.remove('respuesta-visible');
                respuesta.classList.add('respuesta-oculta');
            }
        });
    });
};

preguntas();







