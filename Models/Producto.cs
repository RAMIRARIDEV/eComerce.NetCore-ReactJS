﻿using FluentValidation;
using System;
using System.Collections.Generic;

namespace ReactVentas.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetalleVenta = new HashSet<DetalleVenta>();
        }

        public int IdProducto { get; set; }
        public string? Codigo { get; set; }
        public string? Marca { get; set; }
        public string? Descripcion { get; set; }
        public int? IdCategoria { get; set; }
        public int? Stock { get; set; }
        public decimal? PrecioCompra { get; set; }
        public decimal? PrecioVenta { get; set; }
        public bool? EsActivo { get; set; }
        public DateTime? FechaRegistro { get; set; }

        public string? codigoBarra { get; set; }

        public virtual Categoria? IdCategoriaNavigation { get; set; }
        public virtual ICollection<DetalleVenta> DetalleVenta { get; set; }
    }

    public class ProductoValidator : AbstractValidator<Producto>
    {
        public ProductoValidator()
        {
            RuleFor(x => x.EsActivo).Equal(true);
            RuleFor(x => x.codigoBarra).NotEmpty();
            RuleFor(x => x.IdProducto).GreaterThan(1);
        }
    }
}
