function iniciar() {
    // Verificamos si Leaflet ya cargó en el navegador
    if (typeof L === 'undefined') {
        console.log("Esperando a Leaflet...");
        setTimeout(iniciar, 100);
        return;
    }

    console.log("Leaflet detectado. Iniciando mapa...");
    
    // Crear el mapa
    const map = L.map('map').setView([-32.41, -63.24], 13);

    // Usamos OpenStreetMap para probar (más estable para debug)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const grupoLotes = new L.FeatureGroup().addTo(map);

    function cargarLote(url, color, nombreTipo) {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("No se encuentra: " + url);
                return res.json();
            })
            .then(data => {
                L.geoJSON(data, {
                    style: { color: "white", weight: 2, fillColor: color, fillOpacity: 0.5 },
                    onEachFeature: (f, layer) => {
                        layer.bindPopup(`<b>${f.properties.name || nombreTipo}</b>`);
                    }
                }).addTo(grupoLotes);
                map.fitBounds(grupoLotes.getBounds());
            })
            .catch(err => console.warn("Aviso:", err.message));
    }

    cargarLote('./lotes_tambo.geojson', '#3498db', 'Tambo');
    cargarLote('./lotes_cria.geojson', '#e67e22', 'Cría');
    cargarLote('./lote_agricultura.geojson', '#f1c40f', 'Agricultura');
}

iniciar();
