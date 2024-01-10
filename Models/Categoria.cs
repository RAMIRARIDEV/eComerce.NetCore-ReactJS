using FluentValidation;

namespace ReactVentas.Models;
    public partial class Categoria 
    {
        public Categoria()
        {
            Productos = new HashSet<Producto>();
        }

        public int IdCategoria { get; set; }
        public string? Descripcion { get; set; }
        public bool? EsActivo { get; set; }
        public DateTime? FechaRegistro { get; set; }

        public virtual ICollection<Producto> Productos { get; set; }

    }

    public class CategoriaValidator : AbstractValidator<Categoria>
    {   
        public CategoriaValidator()
        {
            RuleFor(x=>x.Descripcion).NotEmpty();
        }   
    }


