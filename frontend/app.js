const API_URL = "http://localhost:5019/api/Tickets";

async function loadTickets() {
    const response = await fetch(API_URL);
    const tickets = await response.json();
    document.getElementById("totalCount").textContent = tickets.length;
document.getElementById("openCount").textContent = tickets.filter(t => t.status === "Open").length;
document.getElementById("progressCount").textContent = tickets.filter(t => t.status === "In Progress").length;
document.getElementById("resolvedCount").textContent = tickets.filter(t => t.status === "Resolved").length;
    const ticketsDiv = document.getElementById("tickets");
    ticketsDiv.innerHTML = "";

    tickets.forEach(ticket => {
        ticketsDiv.innerHTML += `
            <div class="ticket">
                <h3>${ticket.title}</h3>
                <p>${ticket.description}</p>
                <p><strong>Status:</strong> ${ticket.status}</p>
                <p><strong>Assigned To:</strong> ${ticket.assignedTo}</p>

                <select onchange="updateStatus(${ticket.id}, this.value)">
                    <option ${ticket.status === "Open" ? "selected" : ""}>Open</option>
                    <option ${ticket.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option ${ticket.status === "Resolved" ? "selected" : ""}>Resolved</option>
                </select>

                <button onclick="deleteTicket(${ticket.id})">Delete</button>
            </div>
        `;
    });
}

async function createTicket() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const assignedTo = document.getElementById("assignedTo").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            description,
            status: "Open",
            assignedTo
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("assignedTo").value = "";

    loadTickets();
}

async function updateStatus(id, newStatus) {
    const tickets = await fetch(API_URL).then(res => res.json());
    const ticket = tickets.find(t => t.id === id);

    ticket.status = newStatus;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket)
    });

    loadTickets();
}

async function deleteTicket(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTickets();
}

loadTickets();