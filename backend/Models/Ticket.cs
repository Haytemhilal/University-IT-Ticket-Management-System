namespace backend.Models;

public class Ticket
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Status { get; set; } = "Open";

    public string AssignedTo { get; set; } = "Unassigned";

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}