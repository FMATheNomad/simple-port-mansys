class Container {
    constructor(id, type, weight, status, location, arrivalTime, departureTime) {
        this.id = id;
        this.type = type;
        this.weight = weight;
        this.status = status;
        this.location = location;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
    }
}

class Ship {
    constructor(id, capacity, arrivalSchedule, departureSchedule) {
        this.id = id;
        this.capacity = capacity;
        this.arrivalSchedule = arrivalSchedule;
        this.departureSchedule = departureSchedule;
        this.containers = [];
    }

    addContainer(container) {
        if (this.containers.length < this.capacity) {
            this.containers.push(container);
        } else {
            console.log("Capacity full");
        }
    }

    removeContainer(containerId) {
        this.containers = this.containers.filter(c => c.id !== containerId);
    }
}

class Port {
    constructor() {
        this.ships = [];
        this.containers = [];
        this.storage = {};
    }

    addShip(ship) {
        this.ships.push(ship);
    }

    removeShip(shipId) {
        this.ships = this.ships.filter(s => s.id !== shipId);
    }

    addContainer(container) {
        this.containers.push(container);
        this.allocateStorage(container);
    }

    allocateStorage(container) {
        if (!this.storage[container.type]) {
            this.storage[container.type] = [];
        }
        this.storage[container.type].push(container);
    }

    optimizeLogistics() {
        // Implementasi algoritma optimisasi logistik
        // Misalnya menggunakan algoritma A* untuk menemukan jalur terpendek
    }

    displayPortData() {
        let portDataDiv = document.getElementById('portData');

        let containerHtml = '<h3>Containers</h3><table class="table" border="1"><tr><th>ID</th><th>Type</th><th>Weight</th><th>Status</th><th>Location</th><th>Arrival Time</th><th>Departure Time</th></tr>';
        this.containers.forEach(container => {
            containerHtml += `<tr>
                <td>${container.id}</td>
                <td>${container.type}</td>
                <td>${container.weight}</td>
                <td>${container.status}</td>
                <td>${container.location}</td>
                <td>${new Date(container.arrivalTime).toLocaleString()}</td>
                <td>${container.departureTime ? new Date(container.departureTime).toLocaleString() : ''}</td>
            </tr>`;
        });
        containerHtml += '</table>';

        let shipHtml = '<h3>Ships</h3><table class="table" border="1"><tr><th>ID</th><th>Capacity</th><th>Arrival Schedule</th><th>Departure Schedule</th><th>Containers</th></tr>';
        this.ships.forEach(ship => {
            let containersList = ship.containers.map(c => c.id).join(', ');
            shipHtml += `<tr>
                <td>${ship.id}</td>
                <td>${ship.capacity}</td>
                <td>${new Date(ship.arrivalSchedule).toLocaleString()}</td>
                <td>${new Date(ship.departureSchedule).toLocaleString()}</td>
                <td>${containersList}</td>
            </tr>`;
        });
        shipHtml += '</table>';

        portDataDiv.innerHTML = containerHtml + shipHtml;
    }
}

let port = new Port();

document.getElementById('containerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let id = document.getElementById('containerId').value;
    let type = document.getElementById('containerType').value;
    let weight = document.getElementById('containerWeight').value;
    let status = document.getElementById('containerStatus').value;
    let location = document.getElementById('containerLocation').value;
    let arrivalTime = new Date();
    let container = new Container(id, type, weight, status, location, arrivalTime, null);
    port.addContainer(container);
    port.displayPortData();
});

document.getElementById('shipForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let id = document.getElementById('shipId').value;
    let capacity = document.getElementById('shipCapacity').value;
    let arrivalSchedule = new Date();
    let departureSchedule = new Date(); // for simplicity, setting the same as arrival
    let ship = new Ship(id, capacity, arrivalSchedule, departureSchedule);
    port.addShip(ship);
    port.displayPortData();
});

// Mendapatkan tahun saat ini
const currentYear = new Date().getFullYear();
  
// Menampilkan tahun saat ini di dalam elemen span dengan id "copyrightYear"
document.getElementById('copyrightYear').textContent = currentYear;