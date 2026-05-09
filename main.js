// 1. Inicializar el mapa centrado en tu zona (Villa María aprox)
const map = L.map('map').setView([-32.41, -63.24], 13);

// 2. Capa Satelital de Esri (Gratis y muy buena calidad)
L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// 3. Función para cargar los GeoJSON
function cargarLote(url, color, nombreCapa) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: "white",   // Color del borde
                    weight: 2,
                    fillColor: color, // Color del interior
                    fillOpacity: 0.5
                },
                onEachFeature: function (feature, layer) {
                    layer.on('click', function () {
                        document.getElementById('lote-nombre').innerText = feature.properties.name || nombreCapa;
                    });
                }
            }).addTo(map);
            document.getElementById('lote-nombre').innerText = "Mapa Listo";
        })
        .catch(err => console.error("Error cargando " + url, err));
}

// 4. Llamamos a tus archivos específicos
cargarLote('./lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('./lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('./lote_agriculture.geojson', '#f1c40f', 'Agricultura');
