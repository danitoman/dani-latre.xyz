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



// Inicializar todo
function initWidget() {
  // Actualizar reloj cada segundo
  updateClock();
  setInterval(updateClock, 1000);
  
  // Obtener datos de tiempo y ubicación
  getWeatherAndTimezone();
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', initWidget);




// Array con la información de tus medios (imágenes y videos)
const mediaItems = [
    { src: "img_optimizada/PXL_20250126_131916465.MP_resultado.jpg", x: 1000, y: 1900, type: "image" },
    { src: "img_optimizada/PXL_20250303_155102619.RAW-01.COVER_resultado.jpg",  x: 500, y: 1000, type: "image" },
    { src: "img_optimizada/PXL_20250303_183943567.RAW-01.COVER_resultado.jpg", x: 400, y: 400, type: "image" },
    {src: "img_optimizada/PXL_20250114_171008335.NIGHT_resultado.jpg", x: 1010, y: 250, type: "image"},
    {src: "img_optimizada/local humo2 con referencia_resultado.jpg", x: 100, y: 3000, type: "image"},
    {src: "img_optimizada/P8090003_resultado.jpg", x: 1000, y: 9000, type: "image"},
    {src: "img_optimizada/editadas camarasony_00_7_resultado.jpg", x: 1000, y: 1900, type: "image"},
    {src: "img_optimizada/editadas portfolio_00_5_resultado.jpg", x: 280, y: 1880, type: "image"},
    {src: "img_optimizada/pruebas_labo_daniel_latre_00_6_resultado.jpg", x: 900, y: 1800, type: "image"},
    {src: "img_optimizada/PXL_20250303_184144172.NIGHT.RAW-01.COVER_resultado.jpg", x: 100, y: 2300, type: "image"},
    {src: "img_optimizada/PXL_20250211_171848110.RAW-01.COVER_resultado.jpg", x: 600, y: 2600, type: "image"},
    {src: "img_optimizada/PXL_20250211_175218562.RAW-01.COVER_resultado.jpg", x: 900, y: 2600, type: "image"},
    {src: "img_optimizada/PXL_20250123_181908097_resultado.jpg", x: 900, y: 3500, type: "image"},




     {src: "https://dani-latre.xyz/media/ruta-3d-modelo.mp4", x: 1090, y: 600, type: "video"},
     {src: "https://dani-latre.xyz/media/humo-forma-suelo.mp4", x: 100, y: 50, type: "video"},
     {src: "https://dani-latre.xyz/media/cubo_agua.mp4", x: 150, y: 700, type: "video"},
     {src: "https://dani-latre.xyz/media/humo_garaje.mp4", x: 500, y: 1500, type: "video"},
     {src: "https://dani-latre.xyz/media/proyeccion_local.mp4", x: 1000, y: 2400, type: "video"},

   


    
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
    }
}

// Función setupZoom actualizada para permitir scroll en fondo
function setupZoom() {
    const modal = document.getElementById("imageModal");
    const zoomedMediaContainer = document.getElementById("zoomedMediaContainer");
    const imageTitle = document.getElementById("imageTitle");
    const imageDescription = document.getElementById("imageDescription");
    const closeBtn = document.querySelector(".close");
    const scrollCapture = document.createElement('div');
    

      // Evento para cerrar al hacer click fuera del contenido
    modal.addEventListener('click', function(e) {
        // Solo cerrar si el click fue directamente en el modal (fondo)
        if (e.target === modal) {
            closeModal();
        }
    });
        
    // Asegurarnos de que el modal esté oculto al inicio
    modal.style.display = "none"; 
    scrollCapture.style.position = 'fixed';
    scrollCapture.style.top = '0';
    scrollCapture.style.left = '0';
    scrollCapture.style.width = '100%';
    scrollCapture.style.height = '100%';
    scrollCapture.style.zIndex = '999';
    scrollCapture.style.pointerEvents = 'none';
    
    
    document.body.appendChild(scrollCapture);
    
    document.querySelectorAll(".image-container img, .image-container video").forEach(media => {
        media.addEventListener("dblclick", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const container = this.closest(".image-container");
            const mediaSrc = this.getAttribute("src");
            const description = container.dataset.description || '';
            const isVideo = this.tagName === "VIDEO";
            
            // Limpiar el contenedor primero
            zoomedMediaContainer.innerHTML = '';
            
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
            
            // Aplicar estilos al media ampliado
            zoomedMedia.style.maxWidth = "90vw";
            zoomedMedia.style.maxHeight = "90vh";
            zoomedMedia.style.objectFit = "contain";
            
            zoomedMediaContainer.appendChild(zoomedMedia);
            imageTitle.textContent = '';
            imageDescription.textContent = description;
            
            // Mostrar modal permitiendo scroll en fondo
            modal.style.display = "block";
            document.body.style.overflow = "auto"; // Permite scroll en body
            
            // Efecto de clic
            this.classList.add("click-animation");
            setTimeout(() => {
                this.classList.remove("click-animation");
            }, 300);
        });
    });
    
    // Función para cerrar el modal
       function closeModal() {
        modal.style.display = "none";
        const videos = zoomedMediaContainer.querySelectorAll('video');
        videos.forEach(video => video.pause());
    }
    
    // Event listeners para cerrar modal
    closeBtn.onclick = closeModal;
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });
}

// Función de carga principal
function initGallery() {
    const imageSpace = document.getElementById("imageSpace");
    
    mediaItems.forEach(item => {
        const container = document.createElement('div');
        container.className = 'image-container';
        container.style.left = item.x + 'px';
        container.style.top = item.y + 'px';
        container.dataset.description = item.description || '';
        
        let mediaElement;
          if (window.innerWidth <= 768) {
    return;
  }

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
        
        makeDraggable(container, imageSpace);
        
        // Reproducir/pausar video al hacer clic
        if (item.type === "video") {
            mediaElement.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            });
        }
    });
    
    setupZoom();
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGallery);