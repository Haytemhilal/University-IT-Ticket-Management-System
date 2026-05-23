using backend.Models;

namespace backend.Data;

public static class TicketStore
{
    public static List<Ticket> Tickets = new()
    {
        new Ticket
        {
            Id = 1,
            Title = "VPN Access Issue",
            Description = "Student unable to connect to VPN.",
            Status = "Open",
            AssignedTo = "IT Support"
        }
    };
}