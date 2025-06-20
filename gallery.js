// Reloj en tiempo real
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });
  document.getElementById('current-time').textContent = timeStr;
}

function initWidget() {
  updateClock();
  setInterval(updateClock, 1000);
  getWeatherAndTimezone();
}

document.addEventListener('DOMContentLoaded', initWidget);




// Inicializar todo
function initWidget() {
  // Actualizar reloj cada segundo
  updateClock();
  setInterval(updateClock, 1000);
  
  // Obtener datos de tiempo y ubicación
  getWeatherAndTimezone();
}

// Iniciar cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
  const externalCloseBtn = document.getElementById("modalClose");
  if (externalCloseBtn) {
    externalCloseBtn.style.display = "none";
    externalCloseBtn.style.opacity = "0";
    externalCloseBtn.style.pointerEvents = "none";
  }
});





// Array con la información de tus medios (imágenes y videos)


const mediaItems = [
    { src: "img_optimizada/PXL_20250126_131916465.MP_resultado.jpg", x: 1000, y: 1900, type: "image" },
    { src: "img_optimizada/PXL_20250303_155102619.RAW-01.COVER_resultado.jpg",  x: 500, y: 1000, type: "image" },
    { src: "img_optimizada/PXL_20250303_183943567.RAW-01.COVER_resultado.jpg", x: 400, y: 400, type: "image" },
    {src: "img_optimizada/PXL_20250114_171008335.NIGHT_resultado.jpg", x: 1010, y: 250, type: "image"},
    {src: "img_optimizada/local humo2 con referencia_resultado.jpg", x: 100, y: 4500, type: "image"},
    {src: "img_optimizada/P8090003_resultado.jpg", x: 1000, y: 9000, type: "image"},
    {src: "img_optimizada/editadas camarasony_00_7_resultado.jpg", x: 1000, y: 1900, type: "image"},
    {src: "img_optimizada/editadas portfolio_00_5_resultado.jpg", x: 280, y: 1880, type: "image"},
    {src: "img_optimizada/pruebas_labo_daniel_latre_00_6_resultado.jpg", x: 900, y: 1800, type: "image"},
    {src: "img_optimizada/PXL_20250303_184144172.NIGHT.RAW-01.COVER_resultado.jpg", x: 100, y: 2300, type: "image"},
    {src: "img_optimizada/PXL_20250211_171848110.RAW-01.COVER_resultado.jpg", x: 600, y: 3000, type: "image"},
    {src: "img_optimizada/PXL_20250211_175218562.RAW-01.COVER_resultado.jpg", x: 900, y: 3000, type: "image"},
    {src: "img_optimizada/PXL_20250123_181908097_resultado.jpg", x: 900, y: 3500, type: "image"},
    {src: "img_optimizada/camion esquema_resultado.jpg", x: 1500, y: 5500, type: "image"},
    {src: "img_optimizada/editadas camarasony_00_24_resultado.jpg", x: 0, y: 4000, type: "image"},
    {src: "img_optimizada/PXL_20250303_174419629.RAW-01.COVER_resultado.jpg", x: 200, y: 5800, type: "image"},
    {src: "img_optimizada/IMG-20250113-WA0029_resultado.jpg", x: 10, y: 5300, type: "image"},
    {src: "img_optimizada/d4948c53_resultado.jpg", x: 1000, y: 6600, type: "image"},
    {src: "img_optimizada/editadas camarasony_00_20_resultado.jpg", x: 1000, y: 6900, type: "image"},
    {src: "img_optimizada/editadas camarasony_00_21_resultado.jpg", x: 0, y: 7200, type: "image"},
    {src: "img_optimizada/Imagen de WhatsApp 2025-06-08 a las 19.01.20_739d60b1_resultado.jpg", x: 1000, y: 7500, type: "image"},
   
    





     //{src: "https://dani-latre.xyz/media/ruta-3d-modelo.mp4", x: 190, y: 8000, type: "video"},
     {src: "https://dani-latre.xyz/media/humo-forma-suelo.mp4", x: 30, y: 60, type: "video"},
     {src: "https://dani-latre.xyz/media/cubo_agua.mp4", x: 150, y: 700, type: "video"},
     {src: "https://dani-latre.xyz/media/humo_garaje.mp4", x: 500, y: 1500, type: "video"},
     {src: "https://dani-latre.xyz/media/proyeccion_local.mp4", x: 1000, y: 2400, type: "video"},
     {src: "https://dani-latre.xyz/media/Plastico-Aire-Sala-Luces.mp4", x: 1000, y: 4500, type: "video"},
     {src: "https://dani-latre.xyz/media/Ruta%20Modelo.mp4", x: 1000, y: 5000, type: "video"},


   


    
    // Agrega más elementos según necesites
];



document.addEventListener('DOMContentLoaded', () => {
    scaleGalleryToScreen();
    reloadGallery();
});

window.addEventListener('resize', () => {
    scaleGalleryToScreen();
});

// Función para hacer arrastrables los elementos
function makeDraggable(element, space) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        // Solo arrastrar con clic izquierdo
        if (e.button !== 0) return;
        
        e.preventDefault();
        isDragging = true;
        
        // obtener la posición del cursor al inicio
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // Traer al frente el elemento que se está moviendo
        element.style.zIndex = 100;
    }
    
    function elementDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        // calcular la nueva posición
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // obtener la posición actual del scroll
        const scrollLeft = space.scrollLeft;
        const scrollTop = space.scrollTop;
        
        // establecer la nueva posición absoluta
        const newLeft = element.offsetLeft - pos1;
        const newTop = element.offsetTop - pos2;
        
        element.style.left = newLeft + "px";
        element.style.top = newTop + "px";
    }
    
    function closeDragElement() {
        // dejar de mover cuando se suelta el botón del mouse
        isDragging = false;
        document.onmouseup = null;
        document.onmousemove = null;
        
        // Restaurar z-index
        element.style.zIndex = 1;

        //  GUARDAR POSICIÓN EN LOCALSTORAGE
        const id = element.dataset.id;
        if (id) {
            const x = element.offsetLeft;
            const y = element.offsetTop;
            const savedPositions = JSON.parse(localStorage.getItem("mediaPositions") || "{}");
            savedPositions[id] = { x, y };
            localStorage.setItem("mediaPositions", JSON.stringify(savedPositions));
    }
    }
}

// Función setupZoom actualizada para permitir scroll en fondo
function setupZoom() {
  const modal = document.getElementById("imageModal");
  const zoomedMediaContainer = document.getElementById("zoomedMediaContainer");
  const imageTitle = document.getElementById("imageTitle");
  const imageDescription = document.getElementById("imageDescription");
  const closeBtn = document.querySelector(".close");
  const externalCloseBtn = document.getElementById("modalClose");


  modal.style.display = "none";
  externalCloseBtn.style.display = "block";


  

  // Escucha doble clic en cualquier imagen o video
  document.querySelectorAll(".image-container img, .image-container video").forEach(media => {
    media.addEventListener("dblclick", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const container = this.closest(".image-container");
      const mediaSrc = this.getAttribute("src");
      const description = container.dataset.description || '';
      const isVideo = this.tagName === "VIDEO";

      zoomedMediaContainer.innerHTML = ''; // Limpiar contenido anterior

      let zoomedMedia;
      if (isVideo) {
        zoomedMedia = document.createElement('video');
        zoomedMedia.src = mediaSrc;
        zoomedMedia.controls = true;
        zoomedMedia.autoplay = true;
      } else {
        zoomedMedia = document.createElement('img');
        zoomedMedia.src = mediaSrc;
      }

      zoomedMedia.style.objectFit = "contain";
      zoomedMediaContainer.appendChild(zoomedMedia);

      imageTitle.textContent = '';
      imageDescription.textContent = description;

    modal.style.display = "block";
    externalCloseBtn.style.display = "flex"; // o "block" según tu diseño
    externalCloseBtn.style.opacity = "1";
    externalCloseBtn.style.pointerEvents = "auto";  

    });
  });

 

  // Cierra con la cruz
  closeBtn.addEventListener("click", closeModal);
  externalCloseBtn.addEventListener("click", closeModal);


  // Cierra con Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
      modal.style.display = "none";
      externalCloseBtn.style.display = "none";
      externalCloseBtn.style.opacity = "0";
      externalCloseBtn.style.pointerEvents = "none";

    }
  });

  function closeModal() {
    modal.style.display = "none";
    externalCloseBtn.style.display = "none";
    const videos = zoomedMediaContainer.querySelectorAll("video");
    videos.forEach(video => video.pause());
  }
}




// Función de carga principal
function initGallery() {
    const imageSpace = document.getElementById("imageSpace");
    

    function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
}

  // Detectar si es móvil
  const isMobile = window.innerWidth <= 768;

  // Clonar array para no modificar el original si no hace falta
  const itemsToRender = [...mediaItems];

  // Mezclar solo si es móvil
  if (isMobile) {
    shuffleArray(itemsToRender);
  }
itemsToRender.forEach((item, index) => {
    const container = document.createElement('div');
    container.className = 'image-container';
    const id = `media-${index}`;
    container.dataset.id = id;

    const savedPositions = JSON.parse(localStorage.getItem("mediaPositions") || "{}");

    if (!isMobile && savedPositions[id]) {
        container.style.left = savedPositions[id].x + 'px';
        container.style.top = savedPositions[id].y + 'px';
    } else if (!isMobile) {
        container.style.left = item.x + 'px';
        container.style.top = item.y + 'px';
    }


    container.dataset.description = item.description || '';

 let mediaElement;

    if (item.type === "video") {
      mediaElement = document.createElement('video');
      mediaElement.src = item.src;
      mediaElement.loop = true;
      mediaElement.muted = true;
      mediaElement.autoplay = true;
      mediaElement.controls = false;
   


    } else {
      mediaElement = document.createElement('img');
      mediaElement.src = item.src;
    }

    mediaElement.draggable = false;

    const title = document.createElement('p');
    title.textContent = item.title || '';

    container.appendChild(mediaElement);
    container.appendChild(title);
    imageSpace.appendChild(container);

    if (!isMobile) {
      makeDraggable(container, imageSpace);
    }

    if (item.type === "video") {
      mediaElement.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.paused ? this.play() : this.pause();
      });
    }
  });

  setupZoom();
}
// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGallery);

