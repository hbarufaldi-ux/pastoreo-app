window.onload = function() {
    if (typeof L !== 'undefined') {
        console.log("Leaflet cargado correctamente");
        
        const map = L.map('map').setView([-32.41, -63.24], 13);

        L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri'
        }).addTo(map);

        const grupoLotes = new L.featureGroup().addTo(map);

        function cargarLote(url, color, nombreTipo) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const capa = L.geoJSON(data, {
                        style: { color: "white", weight: 2, fillColor: color, fillOpacity: 0.5 },
                        onEachFeature: (feature, layer) => {
                            layer.bindPopup(`<b>${feature.properties.name || nombreTipo}</b>`);
                        }
                    }).addTo(grupoLotes);
                    map.fitBounds(grupoLotes.getBounds());
                })
                .catch(err => console.error("Error cargando: " + url, err));
        }

        cargarLote('./lotes_tambo.geojson', '#3498db', 'Tambo');
        cargarLote('./lotes_cria.geojson', '#e67e22', 'Cría');
        cargarLote('./lote_agricultura.geojson', '#f1c40f', 'Agricultura');

        setTimeout(() => { map.invalidateSize(); }, 500);
        
    } else {
        console.error("Leaflet no se cargó. Reintente en 1 segundo...");
        setTimeout(window.onload, 1000);
    }
};
