window.onload = function() {
    if (typeof L !== 'undefined') {
        console.log("Leaflet cargado correctamente");
        
        // Inicializar mapa
        const map = L.map('map').setView([-32.41, -63.24], 13);

        // Capa de Satélite de Esri corregida
        L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, GeoEye'
        }).addTo(map);

        const grupoLotes = new L.FeatureGroup().addTo(map);

        function cargarLote(url, color, nombreTipo) {
            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error(`No se encontró el archivo: ${url}`);
                    return res.json();
                })
                .then(data => {
                    L.geoJSON(data, {
                        style: { color: "white", weight: 2, fillColor: color, fillOpacity: 0.5 },
                        onEachFeature: (feature, layer) => {
                            const nombre = (feature.properties && feature.properties.name) ? feature.properties.name : nombreTipo;
                            layer.bindPopup(`<b>${nombre}</b>`);
                        }
                    }).addTo(grupoLotes);
                    
                    // Ajustar el zoom para ver todos los lotes cargados
                    if (grupoLotes.getLayers().length > 0) {
                        map.fitBounds(grupoLotes.getBounds());
                    }
                })
                .catch(err => console.error("Error cargando lotes:", err));
        }

        // Llamadas a los archivos locales
        cargarLote('./lotes_tambo.geojson', '#3498db', 'Tambo');
        cargarLote('./lotes_cria.geojson', '#e67e22', 'Cría');
        cargarLote('./lote_agricultura.geojson', '#f1c40f', 'Agricultura');

        // Refrescar tamaño por si hay problemas de renderizado
        setTimeout(() => { map.invalidateSize(); }, 500);
        
    } else {
        console.error("Leaflet no se cargó. Verifica la conexión a internet.");
    }
};
