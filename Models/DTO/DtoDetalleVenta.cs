namespace ReactVentas.Models.DTO
{
    public class DtoDetalleVenta
    {
        public string? Producto { get; set; }
        public string? PrecioCompra { get; set; }
        public string? PrecioVenta { get; set; }

        public string? Cantidad { get; set; }

        public string? Total { get; set; }
    }
}
