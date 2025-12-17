// Global variables
let map;
let graphData;
let dijkstra;
let startNode = null;
let endNode = null;
let markers = {};
let nodeMarkers = [];
let edgeLines = [];
let pathLine = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await initMap();
    await loadGraphData();
    setupEventListeners();
});

/**
 * Initialize Leaflet map centered on Turkey
 */
async function initMap() {
    // Center map on Turkey
    map = L.map('map').setView([39.0, 30.0], 6);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

/**
 * Load graph data from JSON file
 */
async function loadGraphData() {
    try {
        const response = await fetch('graph-data.json');
        graphData = await response.json();
        dijkstra = new Dijkstra(graphData);
        
        // Draw nodes and edges on map
        drawGraph();
    } catch (error) {
        console.error('Error loading graph data:', error);
        alert('Graf verisi yüklenemedi!');
    }
}

/**
 * Draw all nodes and edges on the map
 */
function drawGraph() {
    // Draw edges first (so they appear behind nodes)
    for (const [fromNode, neighbors] of Object.entries(graphData.edges)) {
        const fromCoords = graphData.coordinates[fromNode];
        
        for (const neighbor of neighbors) {
            const toCoords = graphData.coordinates[neighbor.node];
            
            // Only draw edge once (check alphabetical order to avoid duplicates)
            if (fromNode < neighbor.node) {
                const line = L.polyline([fromCoords, toCoords], {
                    color: '#bdc3c7',
                    weight: 2,
                    opacity: 0.7,
                    dashArray: '5, 10'
                }).addTo(map);
                
                // Add distance label at midpoint
                const midLat = (fromCoords[0] + toCoords[0]) / 2;
                const midLng = (fromCoords[1] + toCoords[1]) / 2;
                
                L.marker([midLat, midLng], {
                    icon: L.divIcon({
                        className: 'distance-label',
                        html: `<span style="background: white; padding: 2px 5px; border-radius: 3px; font-size: 10px; color: #7f8c8d;">${neighbor.weight} km</span>`,
                        iconSize: [50, 20]
                    })
                }).addTo(map);
                
                edgeLines.push(line);
            }
        }
    }

    // Draw nodes
    for (const node of graphData.nodes) {
        const coords = graphData.coordinates[node];
        
        const marker = L.circleMarker(coords, {
            radius: 10,
            fillColor: '#3498db',
            color: '#2980b9',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Add popup with node name
        marker.bindPopup(`<b>${node}</b><br>Seçmek için tıklayın`);
        
        // Add tooltip always visible
        marker.bindTooltip(node, {
            permanent: true,
            direction: 'top',
            offset: [0, -10],
            className: 'node-label'
        });

        // Click handler for node selection
        marker.on('click', () => selectNode(node, marker));
        
        markers[node] = marker;
        nodeMarkers.push(marker);
    }
}

/**
 * Handle node selection
 */
function selectNode(nodeName, marker) {
    if (startNode === null) {
        // Select as start node
        startNode = nodeName;
        marker.setStyle({ fillColor: '#27ae60', color: '#1e8449' });
        updateSelectionDisplay();
    } else if (endNode === null && nodeName !== startNode) {
        // Select as end node
        endNode = nodeName;
        marker.setStyle({ fillColor: '#e74c3c', color: '#c0392b' });
        updateSelectionDisplay();
        document.getElementById('findPath').disabled = false;
    }
}

/**
 * Update the selection display in sidebar
 */
function updateSelectionDisplay() {
    document.getElementById('startNode').textContent = startNode || '-';
    document.getElementById('endNode').textContent = endNode || '-';
}

/**
 * Find and display shortest path
 */
function findShortestPath() {
    if (!startNode || !endNode) {
        alert('Lütfen başlangıç ve bitiş noktası seçin!');
        return;
    }

    // Find shortest path using Dijkstra
    const result = dijkstra.findShortestPath(startNode, endNode);

    if (!result.found) {
        alert('Bu iki nokta arasında yol bulunamadı!');
        return;
    }

    // Remove previous path line if exists
    if (pathLine) {
        map.removeLayer(pathLine);
    }

    // Get path coordinates and draw
    const pathCoords = dijkstra.getPathCoordinates(result.path);
    
    pathLine = L.polyline(pathCoords, {
        color: '#9b59b6',
        weight: 5,
        opacity: 0.9
    }).addTo(map);

    // Fit map to show the path
    map.fitBounds(pathLine.getBounds(), { padding: [50, 50] });

    // Display result
    displayResult(result);
}

/**
 * Display the result in sidebar
 */
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    const distanceSpan = document.getElementById('totalDistance');
    const pathDisplay = document.getElementById('pathDisplay');

    distanceSpan.textContent = `${result.distance} km`;
    pathDisplay.textContent = result.path.join(' → ');
    
    resultDiv.classList.add('show');
}

/**
 * Reset all selections and path
 */
function resetSelection() {
    // Reset node colors
    for (const marker of Object.values(markers)) {
        marker.setStyle({ fillColor: '#3498db', color: '#2980b9' });
    }

    // Remove path line
    if (pathLine) {
        map.removeLayer(pathLine);
        pathLine = null;
    }

    // Reset variables
    startNode = null;
    endNode = null;

    // Reset UI
    updateSelectionDisplay();
    document.getElementById('findPath').disabled = true;
    document.getElementById('result').classList.remove('show');

    // Reset map view
    map.setView([39.0, 30.0], 6);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    document.getElementById('findPath').addEventListener('click', findShortestPath);
    document.getElementById('reset').addEventListener('click', resetSelection);
}
