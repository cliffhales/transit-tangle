/**
 * Transit Tangle - Levels Data
 */

const LEVELS = [
    {
        id: 1,
        name: "Getting Started",
        description: "A simple route to learn the ropes.",
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
            { id: "Bus 1", startStop: 1, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 3, latestArrival: "08:40" },
            { id: "Trip B", from: 2, to: 4, latestArrival: "09:00" },
            { id: "Trip C", from: 3, to: 4, latestArrival: "09:15" },
            { id: "Trip D", from: 1, to: 2, latestArrival: "08:30" }
        ]
    },
    {
        id: 2,
        name: "The Loop",
        description: "Round and round we go.",
        stops: [
            { id: 1, name: "North", x: 350, y: 100 },
            { id: 2, name: "East", x: 600, y: 300 },
            { id: 3, name: "South", x: 350, y: 500 },
            { id: 4, name: "West", x: 100, y: 300 }
        ],
        routes: [
            { from: 1, to: 2, time: 15 },
            { from: 2, to: 3, time: 15 },
            { from: 3, to: 4, time: 15 },
            { from: 4, to: 1, time: 15 },
            { from: 1, to: 3, time: 25 }, // Shortcut
            { from: 2, to: 4, time: 25 }  // Shortcut
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 3, latestArrival: "08:30" },
            { id: "Trip B", from: 2, to: 4, latestArrival: "08:30" },
            { id: "Trip C", from: 3, to: 1, latestArrival: "08:45" },
            { id: "Trip D", from: 4, to: 2, latestArrival: "08:45" },
            { id: "Trip E", from: 1, to: 2, latestArrival: "09:00" }
        ]
    },
    {
        id: 3,
        name: "Double Trouble",
        description: "Manage two buses at once.",
        stops: [
            { id: 1, name: "Depot A", x: 100, y: 100 },
            { id: 2, name: "Depot B", x: 700, y: 500 },
            { id: 3, name: "City Center", x: 400, y: 300 },
            { id: 4, name: "Park", x: 100, y: 500 },
            { id: 5, name: "Airport", x: 700, y: 100 }
        ],
        routes: [
            { from: 1, to: 3, time: 20 },
            { from: 2, to: 3, time: 20 },
            { from: 4, to: 3, time: 15 },
            { from: 5, to: 3, time: 25 },
            { from: 1, to: 4, time: 10 },
            { from: 2, to: 5, time: 10 }
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "08:00" },
            { id: "Bus 2", startStop: 2, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 2, latestArrival: "09:00" },
            { id: "Trip B", from: 2, to: 1, latestArrival: "09:00" },
            { id: "Trip C", from: 4, to: 5, latestArrival: "09:15" },
            { id: "Trip D", from: 5, to: 4, latestArrival: "09:15" },
            { id: "Trip E", from: 3, to: 1, latestArrival: "08:30" },
            { id: "Trip F", from: 3, to: 2, latestArrival: "08:30" }
        ]
    },
    {
        id: 4,
        name: "The Hub",
        description: "All roads lead to the center.",
        stops: [
            { id: 1, name: "Hub", x: 400, y: 300 },
            { id: 2, name: "North Spoke", x: 400, y: 100 },
            { id: 3, name: "East Spoke", x: 600, y: 300 },
            { id: 4, name: "South Spoke", x: 400, y: 500 },
            { id: 5, name: "West Spoke", x: 200, y: 300 }
        ],
        routes: [
            { from: 1, to: 2, time: 10 },
            { from: 1, to: 3, time: 10 },
            { from: 1, to: 4, time: 10 },
            { from: 1, to: 5, time: 10 },
            { from: 2, to: 3, time: 15 }, // Outer ring
            { from: 3, to: 4, time: 15 },
            { from: 4, to: 5, time: 15 },
            { from: 5, to: 2, time: 15 }
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "08:00" },
            { id: "Bus 2", startStop: 1, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 2, to: 4, latestArrival: "08:30" },
            { id: "Trip B", from: 3, to: 5, latestArrival: "08:30" },
            { id: "Trip C", from: 5, to: 3, latestArrival: "08:45" },
            { id: "Trip D", from: 4, to: 2, latestArrival: "08:45" },
            { id: "Trip E", from: 1, to: 2, latestArrival: "08:15" },
            { id: "Trip F", from: 1, to: 3, latestArrival: "08:15" },
            { id: "Trip G", from: 1, to: 4, latestArrival: "08:15" },
            { id: "Trip H", from: 1, to: 5, latestArrival: "08:15" }
        ]
    },
    {
        id: 5,
        name: "Cross Town",
        description: "Navigate the grid.",
        stops: [
            { id: 1, name: "NW", x: 200, y: 200 },
            { id: 2, name: "N", x: 400, y: 200 },
            { id: 3, name: "NE", x: 600, y: 200 },
            { id: 4, name: "W", x: 200, y: 400 },
            { id: 5, name: "C", x: 400, y: 400 },
            { id: 6, name: "E", x: 600, y: 400 }
        ],
        routes: [
            { from: 1, to: 2, time: 10 }, { from: 2, to: 3, time: 10 },
            { from: 4, to: 5, time: 10 }, { from: 5, to: 6, time: 10 },
            { from: 1, to: 4, time: 10 }, { from: 2, to: 5, time: 10 }, { from: 3, to: 6, time: 10 },
            { from: 1, to: 5, time: 15 }, { from: 2, to: 6, time: 15 } // Diagonals
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "08:00" },
            { id: "Bus 2", startStop: 6, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 6, latestArrival: "08:40" },
            { id: "Trip B", from: 6, to: 1, latestArrival: "08:40" },
            { id: "Trip C", from: 3, to: 4, latestArrival: "08:40" },
            { id: "Trip D", from: 4, to: 3, latestArrival: "08:40" },
            { id: "Trip E", from: 2, to: 5, latestArrival: "08:20" },
            { id: "Trip F", from: 5, to: 2, latestArrival: "08:20" }
        ]
    },
    {
        id: 6,
        name: "Rush Hour",
        description: "Lots of passengers, little time.",
        stops: [
            { id: 1, name: "Suburb A", x: 100, y: 100 },
            { id: 2, name: "Suburb B", x: 100, y: 500 },
            { id: 3, name: "Downtown", x: 600, y: 300 },
            { id: 4, name: "Office Park", x: 700, y: 100 },
            { id: 5, name: "Stadium", x: 700, y: 500 }
        ],
        routes: [
            { from: 1, to: 3, time: 30 },
            { from: 2, to: 3, time: 30 },
            { from: 3, to: 4, time: 10 },
            { from: 3, to: 5, time: 10 },
            { from: 4, to: 5, time: 15 }
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "07:00" },
            { id: "Bus 2", startStop: 2, startTime: "07:00" },
            { id: "Bus 3", startStop: 3, startTime: "07:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 4, latestArrival: "07:50" },
            { id: "Trip B", from: 1, to: 5, latestArrival: "07:50" },
            { id: "Trip C", from: 2, to: 4, latestArrival: "07:50" },
            { id: "Trip D", from: 2, to: 5, latestArrival: "07:50" },
            { id: "Trip E", from: 3, to: 1, latestArrival: "08:00" },
            { id: "Trip F", from: 3, to: 2, latestArrival: "08:00" },
            { id: "Trip G", from: 4, to: 5, latestArrival: "07:30" },
            { id: "Trip H", from: 5, to: 4, latestArrival: "07:30" }
        ]
    },
    {
        id: 7,
        name: "Night Shift",
        description: "Long distances, few buses.",
        stops: [
            { id: 1, name: "A", x: 50, y: 300 },
            { id: 2, name: "B", x: 250, y: 300 },
            { id: 3, name: "C", x: 450, y: 300 },
            { id: 4, name: "D", x: 650, y: 300 },
            { id: 5, name: "E", x: 850, y: 300 }
        ],
        routes: [
            { from: 1, to: 2, time: 20 },
            { from: 2, to: 3, time: 20 },
            { from: 3, to: 4, time: 20 },
            { from: 4, to: 5, time: 20 },
            { from: 1, to: 3, time: 35 },
            { from: 3, to: 5, time: 35 }
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "23:00" },
            { id: "Bus 2", startStop: 5, startTime: "23:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 5, latestArrival: "00:30" },
            { id: "Trip B", from: 5, to: 1, latestArrival: "00:30" },
            { id: "Trip C", from: 2, to: 4, latestArrival: "00:00" },
            { id: "Trip D", from: 4, to: 2, latestArrival: "00:00" },
            { id: "Trip E", from: 3, to: 1, latestArrival: "23:45" },
            { id: "Trip F", from: 3, to: 5, latestArrival: "23:45" }
        ]
    },
    {
        id: 8,
        name: "The Sprawl",
        description: "A large map with many stops.",
        stops: [
            { id: 1, name: "1", x: 100, y: 100 }, { id: 2, name: "2", x: 300, y: 100 }, { id: 3, name: "3", x: 500, y: 100 },
            { id: 4, name: "4", x: 100, y: 300 }, { id: 5, name: "5", x: 300, y: 300 }, { id: 6, name: "6", x: 500, y: 300 },
            { id: 7, name: "7", x: 100, y: 500 }, { id: 8, name: "8", x: 300, y: 500 }, { id: 9, name: "9", x: 500, y: 500 }
        ],
        routes: [
            { from: 1, to: 2, time: 10 }, { from: 2, to: 3, time: 10 },
            { from: 4, to: 5, time: 10 }, { from: 5, to: 6, time: 10 },
            { from: 7, to: 8, time: 10 }, { from: 8, to: 9, time: 10 },
            { from: 1, to: 4, time: 10 }, { from: 4, to: 7, time: 10 },
            { from: 2, to: 5, time: 10 }, { from: 5, to: 8, time: 10 },
            { from: 3, to: 6, time: 10 }, { from: 6, to: 9, time: 10 }
        ],
        buses: [
            { id: "Bus 1", startStop: 5, startTime: "08:00" },
            { id: "Bus 2", startStop: 1, startTime: "08:00" },
            { id: "Bus 3", startStop: 9, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 9, latestArrival: "09:00" },
            { id: "Trip B", from: 3, to: 7, latestArrival: "09:00" },
            { id: "Trip C", from: 7, to: 3, latestArrival: "09:00" },
            { id: "Trip D", from: 9, to: 1, latestArrival: "09:00" },
            { id: "Trip E", from: 2, to: 8, latestArrival: "08:40" },
            { id: "Trip F", from: 4, to: 6, latestArrival: "08:40" }
        ]
    },
    {
        id: 9,
        name: "Complex Web",
        description: "Highly interconnected.",
        stops: [
            { id: 1, name: "A", x: 200, y: 100 }, { id: 2, name: "B", x: 600, y: 100 },
            { id: 3, name: "C", x: 400, y: 300 },
            { id: 4, name: "D", x: 200, y: 500 }, { id: 5, name: "E", x: 600, y: 500 }
        ],
        routes: [
            { from: 1, to: 2, time: 20 }, { from: 2, to: 5, time: 20 },
            { from: 5, to: 4, time: 20 }, { from: 4, to: 1, time: 20 },
            { from: 1, to: 3, time: 15 }, { from: 2, to: 3, time: 15 },
            { from: 4, to: 3, time: 15 }, { from: 5, to: 3, time: 15 },
            { from: 1, to: 5, time: 30 }, { from: 2, to: 4, time: 30 }
        ],
        buses: [
            { id: "Bus 1", startStop: 1, startTime: "08:00" },
            { id: "Bus 2", startStop: 2, startTime: "08:00" },
            { id: "Bus 3", startStop: 4, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 1, to: 5, latestArrival: "08:40" },
            { id: "Trip B", from: 2, to: 4, latestArrival: "08:40" },
            { id: "Trip C", from: 4, to: 2, latestArrival: "08:40" },
            { id: "Trip D", from: 5, to: 1, latestArrival: "08:40" },
            { id: "Trip E", from: 3, to: 1, latestArrival: "08:20" },
            { id: "Trip F", from: 3, to: 2, latestArrival: "08:20" },
            { id: "Trip G", from: 3, to: 4, latestArrival: "08:20" },
            { id: "Trip H", from: 3, to: 5, latestArrival: "08:20" }
        ]
    },
    {
        id: 10,
        name: "Grand Central",
        description: "The ultimate challenge.",
        stops: [
            { id: 1, name: "Central", x: 400, y: 300 },
            { id: 2, name: "N1", x: 400, y: 150 }, { id: 3, name: "N2", x: 400, y: 50 },
            { id: 4, name: "E1", x: 550, y: 300 }, { id: 5, name: "E2", x: 700, y: 300 },
            { id: 6, name: "S1", x: 400, y: 450 }, { id: 7, name: "S2", x: 400, y: 600 },
            { id: 8, name: "W1", x: 250, y: 300 }, { id: 9, name: "W2", x: 100, y: 300 }
        ],
        routes: [
            { from: 1, to: 2, time: 10 }, { from: 2, to: 3, time: 10 },
            { from: 1, to: 4, time: 10 }, { from: 4, to: 5, time: 10 },
            { from: 1, to: 6, time: 10 }, { from: 6, to: 7, time: 10 },
            { from: 1, to: 8, time: 10 }, { from: 8, to: 9, time: 10 },
            { from: 2, to: 4, time: 15 }, { from: 4, to: 6, time: 15 },
            { from: 6, to: 8, time: 15 }, { from: 8, to: 2, time: 15 }
        ],
        buses: [
            { id: "Bus 1", startStop: 3, startTime: "08:00" },
            { id: "Bus 2", startStop: 5, startTime: "08:00" },
            { id: "Bus 3", startStop: 7, startTime: "08:00" },
            { id: "Bus 4", startStop: 9, startTime: "08:00" }
        ],
        trips: [
            { id: "Trip A", from: 3, to: 7, latestArrival: "09:00" },
            { id: "Trip B", from: 5, to: 9, latestArrival: "09:00" },
            { id: "Trip C", from: 9, to: 5, latestArrival: "09:00" },
            { id: "Trip D", from: 7, to: 3, latestArrival: "09:00" },
            { id: "Trip E", from: 2, to: 6, latestArrival: "08:40" },
            { id: "Trip F", from: 4, to: 8, latestArrival: "08:40" },
            { id: "Trip G", from: 1, to: 3, latestArrival: "08:30" },
            { id: "Trip H", from: 1, to: 5, latestArrival: "08:30" },
            { id: "Trip I", from: 1, to: 7, latestArrival: "08:30" },
            { id: "Trip J", from: 1, to: 9, latestArrival: "08:30" }
        ]
    }
];
