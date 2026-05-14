const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

const serpiente = [
  {x:10, y:10},
  {x:10, y:11},
  {x:11, y:11},
  {x:12, y:11},
  {x:13, y:11},
  {x:13, y:12},
  {x:14, y:12}
];

let direccionActual = "derecha";

let intervaloSerpiente;

let comidaX = 0;
let comidaY = 0;

let puntaje = 0;

dibujarTodo();
generarComida();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();

  // Líneas verticales
  for (let i = 0; i <= canvas.width; i += TAMANIO_CELDA) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  // Líneas horizontales
  for (let i = 0; i <= canvas.height; i += TAMANIO_CELDA) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "yellow"; // cabeza
    } else {
      ctx.fillStyle = "red";    // cuerpo
    }
    pintarParte(serpiente[i].x, serpiente[i].y);
  }
}

function generarComida() {
  const columnasX = Math.floor(canvas.width / TAMANIO_CELDA);
  const filasY = Math.floor(canvas.height / TAMANIO_CELDA);
  comidaX = Math.floor(Math.random() * columnasX);
  comidaY = Math.floor(Math.random() * filasY);
}

function pintarComida() {
  ctx.fillStyle = "lime";
  pintarParte(comidaX, comidaY);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

function moverDerecha() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function atrapaComida() {
  const cabeza = serpiente[0];
  if (cabeza.x === comidaX && cabeza.y === comidaY) {
    return true;
  }
  return false;
}

function moverSerpiente() {
  // Mover según dirección actual
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }

  if (atrapaComida()) {
    puntaje++;
    document.getElementById("puntaje").textContent = puntaje;

    // Crecer: agregar segmento al final según dirección
    const cola = serpiente[serpiente.length - 1];
    let nuevaCola;

    if (direccionActual === "derecha") {
      nuevaCola = { x: cola.x - 1, y: cola.y };
    } else if (direccionActual === "izquierda") {
      nuevaCola = { x: cola.x + 1, y: cola.y };
    } else if (direccionActual === "abajo") {
      nuevaCola = { x: cola.x, y: cola.y - 1 };
    } else if (direccionActual === "arriba") {
      nuevaCola = { x: cola.x, y: cola.y + 1 };
    }

    serpiente.push(nuevaCola);

    generarComida();
  }

  dibujarTodo();
}

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function iniciarJuego() {
  clearInterval(intervaloSerpiente); // evitar múltiples intervalos
  document.getElementById("estado").textContent = "Jugando";
  intervaloSerpiente = setInterval(moverSerpiente, 200);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").textContent = "Pausado";
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);
  puntaje = 0;
  document.getElementById("puntaje").textContent = puntaje;
  document.getElementById("estado").textContent = "Listo";
  serpiente.length = 0;
  serpiente.push(
    {x:10, y:10}, {x:10, y:11}, {x:11, y:11},
    {x:12, y:11}, {x:13, y:11}, {x:13, y:12}, {x:14, y:12}
  );
  direccionActual = "derecha";
  generarComida();
  dibujarTodo();
}