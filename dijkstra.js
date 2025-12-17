/**
 * Dijkstra's Algorithm Implementation
 * Finds the shortest path between two nodes in a weighted graph
 */

class Dijkstra {
    constructor(graphData) {
        this.nodes = graphData.nodes;
        this.edges = graphData.edges;
        this.coordinates = graphData.coordinates;
    }

    /**
     * Find shortest path from start to end node
     * @param {string} start - Starting node
     * @param {string} end - Destination node
     * @returns {object} - Path array and total distance
     */
    findShortestPath(start, end) {
        // Initialize distances and previous nodes
        const distances = {};
        const previous = {};
        const unvisited = new Set();

        // Set initial distances
        for (const node of this.nodes) {
            distances[node] = Infinity;
            previous[node] = null;
            unvisited.add(node);
        }
        distances[start] = 0;

        while (unvisited.size > 0) {
            // Find node with minimum distance
            let current = null;
            let minDistance = Infinity;
            
            for (const node of unvisited) {
                if (distances[node] < minDistance) {
                    minDistance = distances[node];
                    current = node;
                }
            }

            // If no reachable node found or reached destination
            if (current === null || current === end) {
                break;
            }

            // Remove current from unvisited
            unvisited.delete(current);

            // Update distances for neighbors
            const neighbors = this.edges[current] || [];
            for (const neighbor of neighbors) {
                if (unvisited.has(neighbor.node)) {
                    const newDistance = distances[current] + neighbor.weight;
                    if (newDistance < distances[neighbor.node]) {
                        distances[neighbor.node] = newDistance;
                        previous[neighbor.node] = current;
                    }
                }
            }
        }

        // Reconstruct path
        const path = [];
        let current = end;
        
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        // Check if path exists
        if (path[0] !== start) {
            return { path: [], distance: Infinity, found: false };
        }

        return {
            path: path,
            distance: distances[end],
            found: true
        };
    }

    /**
     * Get coordinates for a path
     * @param {array} path - Array of node names
     * @returns {array} - Array of [lat, lng] coordinates
     */
    getPathCoordinates(path) {
        return path.map(node => this.coordinates[node]);
    }

    /**
     * Find nearest node to given coordinates
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @returns {string} - Nearest node name
     */
    findNearestNode(lat, lng) {
        let nearestNode = null;
        let minDistance = Infinity;

        for (const node of this.nodes) {
            const [nodeLat, nodeLng] = this.coordinates[node];
            const distance = this.calculateDistance(lat, lng, nodeLat, nodeLng);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestNode = node;
            }
        }

        return nearestNode;
    }

    /**
     * Calculate Haversine distance between two points
     */
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLng = this.toRad(lng2 - lng1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRad(deg) {
        return deg * (Math.PI / 180);
    }
}
