# Smart Route Navigator 🗺️

An interactive web map application that finds the shortest path using Dijkstra's Algorithm.

## 📋 About The Project

This project is a web application developed for the CENG 3511 Artificial Intelligence course. It allows users to select two cities on a map of Turkey and find the shortest path between them using Dijkstra's algorithm.

## ✨ Features

- **Interactive Leaflet Map**: Visual map based on OpenStreetMap
- **Graph-Based Road Network**: Predefined cities and distances
- **Dijkstra's Algorithm**: Shortest path computation
- **Visual Path Drawing**: Route visualization with polyline
- **Distance Calculation**: Total distance display in kilometers

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- Leaflet.js (Map library)

## 📁 Project Structure

```
smart-route-finder/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # Main application logic
├── dijkstra.js         # Dijkstra's algorithm implementation
├── graph-data.json     # City and road data
└── README.md           # This file
```

## 🚀 Installation and Running

### Method 1: Open Directly in Browser
1. Download or clone the project
2. Open `index.html` in a web browser

### Method 2: With Local Server (Recommended)
```bash
# With Python 3
python -m http.server 8000

# With Node.js (live-server package required)
npx live-server
```
Then go to `http://localhost:8000` in your browser.

## 📖 Usage

1. Click on a city on the map to select the **starting point** (turns green)
2. Click on another city to select the **destination point** (turns red)
3. Click the **"Find Path"** button
4. The shortest route is displayed on the map with a purple line
5. Total distance and visited cities are shown in the side panel
6. Click **"Reset"** button for a new search

## 🧮 Dijkstra's Algorithm

Dijkstra's algorithm solves the single-source shortest path problem in weighted graphs:

1. Assign distance 0 to the starting node and infinity to all other nodes
2. Select the unvisited node with the smallest distance
3. Update the distances of this node's neighbors
4. Repeat until the destination node is reached
5. Trace back the path to construct the route

**Time Complexity**: O(V²) - V: number of vertices

## 📊 Graph Data

The application includes 8 major cities of Turkey:
- Istanbul, Ankara, Izmir, Bursa
- Eskisehir, Antalya, Konya, Denizli

Edge weights are approximate real highway distances (in km).

## 📝 Development Notes

- Graph data is loaded from the `graph-data.json` file
- To add new cities, edit the JSON file
- Edges are bidirectional

## 👤 Developer

CENG 3511 - Artificial Intelligence Course Final Project

## 📄 License

This project is developed for educational purposes.
