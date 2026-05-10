// Envolvemos todo en una función de espera para asegurar que 'L' exista
function inicializar() {
    if (typeof L === 'undefined') {
        setTimeout(inicializar, 100);
        return;
    }

    const map = L.map('map').setView([-32.41, -63.24], 14);

    // Mapa base de calles (el más estable para evitar errores de red)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const grupoLotes = new L.FeatureGroup().addTo(map);

    function cargarLote(archivo, color, nombreTipo) {
        fetch(archivo)
            .then(res => {
                if (!res.ok) throw new Error("No se encontró " + archivo);
                return res.json();
            })
            .then(data => {
                L.geoJSON(data, {
                    filter: (f) => f.geometry.type.includes('Polygon'),
                    style: { 
                        color: "white", 
                        weight: 1.5, 
                        fillColor: color, 
                        fillOpacity: 0.5 
                    },
                    onEachFeature: (feature, layer) => {
                        const nombre = (feature.properties && feature.properties.name) ? feature.properties.name : nombreTipo;
                        layer.bindPopup(`<b>${nombreTipo}</b><br>Lote: ${nombre}`);
                    }
                }).addTo(grupoLotes);
                
                if (grupoLotes.getLayers().length > 0) {
                    map.fitBounds(grupoLotes.getBounds());
                }
            })
            .catch(err => console.warn(err.message));
    }

    // Archivos GeoJSON
    cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
    cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
    cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');

    // Leyenda
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<b>Referencia</b><br>';
        div.innerHTML += '<i style="background: #3498db"></i> Tambo<br>';
        div.innerHTML += '<i style="background: #e67e22"></i> Cría<br>';
        div.innerHTML += '<i style="background: #f1c40f"></i> Agricultura<br>';
        return div;
    };
    legend.addTo(map);
}

// Iniciar ejecución
inicializar();
