using backend.Data;
using Backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelOrderSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _db;

    public OrderController(AppDbContext db)
    {
        _db = db;
    }

    // ADD ORDER
    [HttpPost]
    public async Task<IActionResult> AddOrder(Order order)
    {
        try
        {
            _db.Orders.Add(order);

            await _db.SaveChangesAsync();

            return Ok(order);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            Console.WriteLine(ex.Message);
            return StatusCode(500, new
            {
                message = "Error while adding order",
            });
        }
    }

    // FIND ALL
    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        try
        {
            var orders = await _db.Orders.ToListAsync();

            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Error while fetching orders",
                error = ex.Message
            });
        }
    }

    // FIND BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        try
        {
            var order = await _db.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            return Ok(order);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Error while fetching order",
                error = ex.Message
            });
        }
    }

    // UPDATE STATUS
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, string status)
    {
        try
        {
            var order = await _db.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            order.Status = status;

            await _db.SaveChangesAsync();

            return Ok(order);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Error while updating order",
                error = ex.Message
            });
        }
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        try
        {
            var order = await _db.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            _db.Orders.Remove(order);

            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Order deleted successfully"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Error while deleting order",
                error = ex.Message
            });
        }
    }
}