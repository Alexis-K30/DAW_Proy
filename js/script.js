/*
 * JavaScript de la página index
 */
window.addEventListener('load', function() {
    init();
    loadFromLocalStorage();
});

let menuVertical = document.getElementById("barraMenu");
let barraNav = document.getElementById("barraNav");
let menuSec = document.getElementsByClassName("segundo-nivel");
let subElem = document.getElementsByClassName("subElemento");
let btnInicio = document.getElementById("btnInicio");
const infoCard = document.getElementById('infoCard');
//const cardImg = document.getElementById('cardImg');
const cardTitle = document.getElementById('cardTitle');
const cardDesc = document.getElementById('cardDesc');
const cardDesc2 = document.getElementById('cardDesc2');
const cardDesc3 = document.getElementById('cardDesc3');
const cardDesc4 = document.getElementById('cardDesc4');

function init() {
    ajustarMenu();
    window.addEventListener("resize", ajustarMenu);
    if (infoCard) infoCard.style.display = 'none';

    document.querySelectorAll('.departamento').forEach(depto => {
        depto.addEventListener('mouseenter', (event) => {
            const target = event.target;
            if (target && target.hasAttribute('data-nombre')) {
                const nombre = target.getAttribute('data-nombre');
                const imgSrc = target.getAttribute('data-img');
                const descripcion = target.getAttribute('data-descripcion');
                const descripcion2 = target.getAttribute('data-descripcion2');
                const descripcion3 = target.getAttribute('data-descripcion3');
                const descripcion4 = target.getAttribute('data-descripcion4');

                cardTitle.textContent = nombre;
                //cardImg.src = imgSrc; // Si tienes una imagen, descomenta esta línea
                cardDesc.textContent = descripcion;
                cardDesc2.textContent = descripcion2;
                cardDesc3.textContent = descripcion3;
                cardDesc4.textContent = descripcion4;

                infoCard.style.display = 'block';
                Popper.createPopper(target, infoCard, {
                    placement: 'top'
                });
            }
        });
        depto.addEventListener('mouseleave', () => {
            infoCard.style.display = 'none';
        });
    });

    // Funcionalidad del buscador con sugerencias
    const departamentos = [
        { nombre: "Ahuachapán", url: "departamentos/ahuachapan.html" },
        { nombre: "Santa Ana", url: "departamentos/santa-ana.html" },
        { nombre: "Sonsonate", url: "departamentos/sonsonate.html" },
        { nombre: "Chalatenango", url: "departamentos/chalatenango.html" },
        { nombre: "Cuscatlán", url: "departamentos/cuscatlan.html" },
        { nombre: "Cabañas", url: "departamentos/cabañas.html" },
        { nombre: "La Libertad", url: "departamentos/la-libertad.html" },
        { nombre: "La Paz", url: "departamentos/la-paz.html" },
        { nombre: "San Vicente", url: "departamentos/san-vicente.html" },
        { nombre: "San Salvador", url: "departamentos/san-salvador.html" },
        { nombre: "Morazán", url: "departamentos/morazan.html" },
        { nombre: "La Unión", url: "departamentos/la-union.html" },
        { nombre: "San Miguel", url: "departamentos/san-miguel.html" },
        { nombre: "Usulután", url: "departamentos/usulutan.html" }
    ];

    const input = document.getElementById('buscador');
    const sugerencias = document.getElementById('sugerencias');

    if (input && sugerencias) {
        input.addEventListener('input', () => {
            const valor = input.value.toLowerCase();
            sugerencias.innerHTML = '';

            if (valor.trim() === '') return;

            const resultados = departamentos.filter(dep => dep.nombre.toLowerCase().includes(valor));

            resultados.forEach(dep => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${dep.url}">${dep.nombre}</a>`;
                sugerencias.appendChild(li);
            });
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const valor = input.value.toLowerCase();
                const resultado = departamentos.find(dep => dep.nombre.toLowerCase() === valor);
                if (resultado) {
                    window.location.href = resultado.url;
                }
            }
        });
    }
}

function saveToLocalStorage(event) {
    event.preventDefault(); // Prevenir el envío del formulario para evitar una recarga de la página

    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;

    // Guardar los datos en el localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('country', country);
    localStorage.setItem('message', message);

    // Opcional: Puedes mostrar un mensaje al usuario de que los datos fueron guardados
    alert('¡Tus datos han sido guardados!');
}

// Función que carga los datos desde el localStorage
function loadFromLocalStorage() {
    // Verificar si existen datos guardados en localStorage
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const country = localStorage.getItem('country');
    const message = localStorage.getItem('message');

    // Si existen, cargar los valores en los campos correspondientes
    if (name) document.getElementById('name').value = name;
    if (email) document.getElementById('email').value = email;
    if (country) document.getElementById('country').value = country;
    if (message) document.getElementById('message').value = message;
}

function ajustarMenu() {
    if (window.innerWidth <= 1000) {
        menuVertical.style.height = window.innerHeight - barraNav.offsetHeight + "px";
        for (let i = 0; i < menuSec.length; i++) {
            menuSec[i].style.width = "";
        }
        for (let i = 0; i < subElem.length; i++) {
            subElem[i].style.width = "";
        }

        // Responsive para buscador (opcional)
        const buscador = document.getElementById('buscador');
        if (buscador) {
            buscador.style.width = "90%";
        }

    } else {
        menuVertical.style.height = "48px";
        for (let i = 0; i < menuSec.length; i++) {
            menuSec[i].style.width = btnInicio.offsetWidth + "px";
        }
        for (let i = 0; i < subElem.length; i++) {
            subElem[i].style.width = btnInicio.offsetWidth + "px";
        }

        const buscador = document.getElementById('buscador');
        if (buscador) {
            buscador.style.width = "250px";
        }
    }
}

// Menu multinivel con JQuery
$(document).ready(function() {
    $(function(){ 
        $('ul.menu > li').hover(function(){ 
            $(this).find('ul.segundo-nivel').show(400); 
        },function(){ 
            $(this).find('ul.segundo-nivel').hide(200); 
        }); 
    });
  });