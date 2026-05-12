const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
const SERPIENTE = [{x:10,y:10},
                  {x:10,y:11},
                  {x:11,y:11},
                  {x:12,y:11},
                  {x:13,y:11},
                  {x:13,y:12},
                  {x:14,y:12}];
dibujarTodo();

function dibujarTablero() {
  ctx.strokeStyle = "white" 
  ctx.beginPath()

  for(let i=0; i<=canvas.width; i+=TAMANIO_CELDA){
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.width)
    ctx.stroke()
  }
  for(let i=0; i<=canvas.height; i+=TAMANIO_CELDA){
    ctx.moveTo(0, i)
    ctx.lineTo(canvas.height, i)
    ctx.stroke()
  }
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente()
}

function pintarSerpiente() {
  for(let i = 0; i < SERPIENTE.length; i++) {
    if(i == 0) {
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "red";
    }
    
    ctx.fillRect(
      SERPIENTE[i].x * TAMANIO_CELDA,
      SERPIENTE[i].y * TAMANIO_CELDA,
      TAMANIO_CELDA,
      TAMANIO_CELDA
    );
    
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = 2;          
    ctx.strokeRect(
      SERPIENTE[i].x * TAMANIO_CELDA,
      SERPIENTE[i].y * TAMANIO_CELDA,
      TAMANIO_CELDA,
      TAMANIO_CELDA
    );
  }
}