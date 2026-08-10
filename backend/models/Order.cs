
namespace Backend.models;

using backdend.Dtos;


public class Order
{

    public int Id { get; set; }
    public int TableNumber { get; set; }

    public List<OrderedFood> Foods { get; set; } = new();

    public string Status { get; set; } = "";

    public DateTime OrderTime { get; set; }

    public decimal TotalAmount { get; set; }







}