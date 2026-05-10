document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa directamente
    const map = L.map('map').setView([-32.41, -63.24], 13);

    // Capa de Satélite
    L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    }).addTo(map);

    const grupoLotes = new L.FeatureGroup().addTo(map);

    function cargarLote(url, color, nombreTipo) {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo cargar " + url);
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
                
                if (grupoLotes.getLayers().length > 0) {
                    map.fitBounds(grupoLotes.getBounds());
                }
            })
            .catch(err => console.warn("Aviso:", err.message));
    }

    // Carga de archivos
    cargarLote('./lotes_tambo.geojson', '#3498db', 'Tambo');
    cargarLote('./lotes_cria.geojson', '#e67e22', 'Cría');
    cargarLote('./lote_agricultura.geojson', '#f1c40f', 'Agricultura');

    setTimeout(() => { map.invalidateSize(); }, 500);
});
