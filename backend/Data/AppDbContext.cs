using Backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;







public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Order> Orders { get; set; }


    protected void OModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>().Property(o => o.TotalAmount).HasPrecision(10, 2);
    }

}