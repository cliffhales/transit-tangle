/**
 * Transit Tangle - Game Logic
 */

// --- Constants & Data ---

const LEVEL_1 = {
    stops: [
        { id: 1, name: "Depot", x: 100, y: 300 },
        { id: 2, name: "Mall", x: 300, y: 150 },
        { id: 3, name: "Hospital", x: 400, y: 350 },
        { id: 4, name: "Station", x: 600, y: 250 }
    ],
    routes: [
        { from: 1, to: 2, time: 15 },
        { from: 2, to: 3, time: 10 },
        { from: 3, to: 4, time: 12 },
        { from: 1, to: 3, time: 20 },
        { from: 2, to: 4, time: 18 }
    ],
    buses: [
        { id: "Bus 1", startStop: 1, startTime: "08:00" },
        { id: "Bus 2", startStop: 2, startTime: "08:15" }
    ],
    trips: [
        { id: "Trip A", from: 1, to: 3, latestArrival: "08:40" },
        { id: "Trip B", from: 2, to: 4, latestArrival: "09:00" },
        { id: "Trip C", from: 3, to: 4, latestArrival: "09:15" },
        { id: "Trip D", from: 1, to: 2, latestArrival: "08:30" }
    ]
};

// --- State ---

let gameState = {
    score: 0,
    buses: [],
    trips: [],
    selectedBusId: null
};

// --- Time Utilities ---

function parseTime(timeStr) {
    const [hh, mm] = timeStr.split(':').map(Number);
    return hh * 60 + mm;
}

function formatTime(minutes) {
    const hh = Math.floor(minutes / 60);
    const mm = minutes % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

// --- Graph & Pathfinding ---

function buildGraph(stops, routes) {
    const adj = {};
    stops.forEach(s => adj[s.id] = []);
    routes.forEach(r => {
        adj[r.from].push({ to: r.to, time: r.time });
        adj[r.to].push({ to: r.from, time: r.time }); // Undirected
    });
    return adj;
}

function getTravelTime(fromId, toId) {
    if (fromId === toId) return 0;

    const adj = buildGraph(LEVEL_1.stops, LEVEL_1.routes);
    const dist = {};
    const visited = new Set();
    const pq = []; // Simple priority queue (array sorted by dist)

    LEVEL_1.stops.forEach(s => dist[s.id] = Infinity);
    dist[fromId] = 0;
    pq.push({ id: fromId, dist: 0 });

    while (pq.length > 0) {
        // Sort by distance (min-heap simulation)
        pq.sort((a, b) => a.dist - b.dist);
        const { id: u, dist: d } = pq.shift();

        if (u === toId) return d;
        if (visited.has(u)) continue;
        visited.add(u);

        if (adj[u]) {
            adj[u].forEach(neighbor => {
                const alt = d + neighbor.time;
                if (alt < dist[neighbor.to]) {
                    dist[neighbor.to] = alt;
                    pq.push({ id: neighbor.to, dist: alt });
                }
            });
        }
    }

    return dist[toId];
}

// --- Game Logic ---

function initGame() {
    // Deep copy level data to state
    gameState.score = 0;
    gameState.selectedBusId = null;

    gameState.buses = LEVEL_1.buses.map(b => ({
        ...b,
        currentStop: b.startStop,
        currentTime: parseTime(b.startTime),
        passengers: [],
        capacity: 4,
        route: [b.startStop], // Start with current location
        assignedTrips: [],
        status: 'planning', // planning, moving
        history: [] // To track completed trips
    }));

    gameState.trips = LEVEL_1.trips.map(t => ({
        ...t,
        ...t,
        status: 'pending', // pending, in-transit, completed
        assignedTo: null,
        result: null
    }));

    render();
}

function selectBus(busId) {
    gameState.selectedBusId = busId;
    render();
}

function planTrip(tripId) {
    if (!gameState.selectedBusId) return;
    const bus = gameState.buses.find(b => b.id === gameState.selectedBusId);
    const trip = gameState.trips.find(t => t.id === tripId);

    if (!bus || !trip) return;
    if (trip.status !== 'pending') return;
    if (bus.assignedTrips.includes(tripId)) return;

    // Smart Route Building
    // 1. Ensure Start is in route
    let fromIndex = bus.route.lastIndexOf(trip.from);
    if (fromIndex === -1) {
        bus.route.push(trip.from);
        fromIndex = bus.route.length - 1;
    }

    // 2. Ensure End is in route AFTER Start
    let toIndex = -1;
    for (let i = fromIndex + 1; i < bus.route.length; i++) {
        if (bus.route[i] === trip.to) {
            toIndex = i;
            break;
        }
    }

    if (toIndex === -1) {
        bus.route.push(trip.to);
    }

    // Assign Trip
    bus.assignedTrips.push(tripId);
    trip.status = 'assigned'; // Visual feedback
    trip.assignedTo = bus.id;

    render();
}

function executeRoute() {
    if (!gameState.selectedBusId) return;
    const bus = gameState.buses.find(b => b.id === gameState.selectedBusId);
    if (!bus || bus.route.length <= 1) return;

    bus.status = 'moving';
    render();

    // Simulation Loop
    let stepIndex = 0;

    function nextStep() {
        if (stepIndex >= bus.route.length - 1) {
            // Route Complete
            bus.status = 'planning';
            bus.route = [bus.currentStop]; // Reset route to current location
            bus.assignedTrips = []; // Clear assigned
            render();
            return;
        }

        const currentStopId = bus.route[stepIndex];
        const nextStopId = bus.route[stepIndex + 1];

        const travelTime = getTravelTime(currentStopId, nextStopId);

        // Animate/Delay for effect (optional, but good for "Depart" feel)
        setTimeout(() => {
            // Move Bus
            bus.currentStop = nextStopId;
            bus.currentTime += travelTime;

            // 1. Drop Offs
            const passengersToDrop = bus.passengers.filter(p => p.to === nextStopId);
            passengersToDrop.forEach(trip => {
                // Score Logic
                const latestArrivalMins = parseTime(trip.latestArrival);
                const diff = bus.currentTime - latestArrivalMins;
                let points = 0;
                let resultText = "";
                let resultClass = "";

                if (diff <= 0) {
                    points = 2;
                    resultText = `On Time (${formatTime(bus.currentTime)})`;
                    resultClass = "status-ontime";
                } else if (diff <= 5) {
                    points = 1;
                    resultText = `Late +${diff}m (${formatTime(bus.currentTime)})`;
                    resultClass = "status-late";
                } else {
                    points = 0;
                    resultText = `Very Late (${formatTime(bus.currentTime)})`;
                    resultClass = "status-missed";
                }

                gameState.score += points;
                trip.status = 'completed';
                trip.result = { text: resultText, className: resultClass, arrivalTime: bus.currentTime };
            });
            bus.passengers = bus.passengers.filter(p => p.to !== nextStopId);

            // 2. Pick Ups (from assigned trips)
            // Find assigned trips that start here AND are not yet picked up
            const tripsToPickup = gameState.trips.filter(t =>
                bus.assignedTrips.includes(t.id) &&
                t.from === nextStopId &&
                t.status === 'assigned'
            );

            tripsToPickup.forEach(trip => {
                if (bus.passengers.length < bus.capacity) {
                    bus.passengers.push(trip);
                    trip.status = 'in-transit';
                } else {
                    // Bus full warning?
                    console.log("Bus full, could not pick up", trip.id);
                }
            });

            // Check Level Complete
            const allCompleted = gameState.trips.every(t => t.status === 'completed');
            if (allCompleted) {
                setTimeout(() => alert(`Level Complete! Score: ${gameState.score}`), 100);
            }

            stepIndex++;
            render();
            nextStep(); // Continue to next step
        }, 800); // 800ms per step
    }

    // Process first stop (current location) pickups before moving
    const startStopId = bus.route[0];
    const initialPickups = gameState.trips.filter(t =>
        bus.assignedTrips.includes(t.id) &&
        t.from === startStopId &&
        t.status === 'assigned'
    );
    initialPickups.forEach(trip => {
        if (bus.passengers.length < bus.capacity) {
            bus.passengers.push(trip);
            trip.status = 'in-transit';
        }
    });
    render();

    // Start moving
    nextStep();
}

// --- Rendering ---

const canvas = document.getElementById('game-map');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const container = document.getElementById('map-container');
    canvas.width = container.clientWidth - 40;
    canvas.height = container.clientHeight - 40;
    drawMap();
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw routes
    LEVEL_1.routes.forEach(r => {
        const s1 = LEVEL_1.stops.find(s => s.id === r.from);
        const s2 = LEVEL_1.stops.find(s => s.id === r.to);

        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw weight
        const midX = (s1.x + s2.x) / 2;
        const midY = (s1.y + s2.y) / 2;
        ctx.fillStyle = '#666';
        ctx.font = '12px sans-serif';
        ctx.fillText(`${r.time}m`, midX, midY - 5);
    });

    // Draw stops
    LEVEL_1.stops.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.id, s.x, s.y);

        ctx.font = '12px sans-serif';
        ctx.fillText(s.name, s.x, s.y + 25);
    });

    // Draw click targets for movement (invisible but functional logic handled in click handler)
    // Actually, we'll handle clicks on the canvas element and check distance.

    // Highlight selected bus position
    if (gameState.selectedBusId) {
        const bus = gameState.buses.find(b => b.id === gameState.selectedBusId);
        if (bus) {
            const stop = LEVEL_1.stops.find(s => s.id === bus.currentStop);
            if (stop) {
                ctx.beginPath();
                ctx.arc(stop.x, stop.y, 22, 0, Math.PI * 2);
                ctx.strokeStyle = '#3498db'; // Accent color
                ctx.lineWidth = 4;
                ctx.stroke();
            }
        }
    }
}

function renderUI() {
    const scoreEl = document.getElementById('score-display');
    scoreEl.textContent = gameState.score;

    const busesList = document.getElementById('buses-list');
    busesList.innerHTML = '';
    gameState.buses.forEach(bus => {
        const el = document.createElement('div');
        el.className = `card ${gameState.selectedBusId === bus.id ? 'selected' : ''}`;
        el.onclick = () => selectBus(bus.id);

        const stopName = LEVEL_1.stops.find(s => s.id === bus.currentStop).name;

        const routeNames = bus.route.map(sid => LEVEL_1.stops.find(s => s.id === sid).name).join(' &rarr; ');

        el.innerHTML = `
            <div class="card-header">
                <span>${bus.id}</span>
                <span>${formatTime(bus.currentTime)}</span>
            </div>
            <div class="card-details">
                At: ${stopName} | Pax: ${bus.passengers.length}/${bus.capacity}
            </div>
            <div class="card-details" style="margin-top:5px; font-size:0.8rem; color:#3498db;">
                Route: ${routeNames}
            </div>
            ${bus.status === 'planning' && bus.route.length > 1 ?
                `<button onclick="event.stopPropagation(); executeRoute()" style="margin-top:5px; width:100%; font-size:0.8rem;">Depart</button>` : ''}
        `;
        busesList.appendChild(el);
    });

    const tripsList = document.getElementById('trips-list');
    tripsList.innerHTML = '';
    gameState.trips.forEach(trip => {
        const el = document.createElement('div');
        el.className = `card ${trip.status === 'completed' ? 'disabled' : ''}`;
        if (trip.status === 'pending') {
            el.onclick = () => planTrip(trip.id);
        }

        const fromName = LEVEL_1.stops.find(s => s.id === trip.from).name;
        const toName = LEVEL_1.stops.find(s => s.id === trip.to).name;

        let statusHtml = '';
        if (trip.result) {
            statusHtml = `<span class="status-badge ${trip.result.className}">${trip.result.text}</span>`;
        }

        el.innerHTML = `
            <div class="card-header">
                <span>${trip.id}</span>
                <span>By ${trip.latestArrival}</span>
            </div>
            <div class="card-details">
                ${fromName} &rarr; ${toName}
                ${trip.status === 'in-transit' ? `<br>On Bus: ${trip.assignedTo}` : ''}
                ${trip.status === 'assigned' ? `<br>Planned: ${trip.assignedTo}` : ''}
            </div>
            ${statusHtml ? `<div style="margin-top:5px">${statusHtml}</div>` : ''}
        `;
        tripsList.appendChild(el);
    });
}

function render() {
    drawMap();
    renderUI();
}

// --- Initialization ---

window.addEventListener('load', () => {
    initGame();
    resizeCanvas();
});

window.addEventListener('resize', resizeCanvas);

document.getElementById('reset-btn').addEventListener('click', initGame);

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked a stop
    // Disabled manual move for Route Planning mode
    /*
    const clickedStop = LEVEL_1.stops.find(s => {
        const dx = s.x - x;
        const dy = s.y - y;
        return Math.sqrt(dx*dx + dy*dy) < 20; // 20px radius
    });

    if (clickedStop) {
        moveBus(clickedStop.id);
    }
    */
});
