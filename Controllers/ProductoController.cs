using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactVentas.Models;
using System.Data;
using FluentValidation;
using FluentValidation.Results;

namespace ReactVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly DBREACT_VENTAContext _context;
        private IValidator<Producto> _validator;
        private ValidationResult validationResult;

        public ProductoController(DBREACT_VENTAContext context, IValidator<Producto> validator)
        {
            _context = context;
            _validator = validator;
            validationResult = new ();
        }
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Producto> lista = new List<Producto>();
            try
            {
                lista = await _context.Productos.Include(c => c.IdCategoriaNavigation).OrderByDescending(c => c.IdProducto).ToListAsync();

                return StatusCode(StatusCodes.Status200OK, lista);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, lista);
            }
        }        
        [HttpGet]
        [Route("Buscar/{codigoBarra}")]
        public async Task<IActionResult> Buscar(string codigoBarra)
        {
            try
            {
                Producto producto = await _context.Productos.FirstAsync(c => String.Equals(c.codigoBarra, codigoBarra));
                validationResult = await _validator.ValidateAsync(producto);
                if (!validationResult.IsValid)
                {
                    //log
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return StatusCode(StatusCodes.Status200OK, producto);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Producto request)
        {
            try
            {
                await _context.Productos.AddAsync(request);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Producto request)
        {
            try
            {
                _context.Productos.Update(request);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                Producto? producto = _context.Productos.Find(id);
                if (producto is not null)
                {
                    _context.Productos.Remove(producto);
                    await _context.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, "ok");
                }
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
