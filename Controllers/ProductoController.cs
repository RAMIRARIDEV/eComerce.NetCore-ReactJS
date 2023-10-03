using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactVentas.Models;

namespace ReactVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly DBREACT_VENTAContext _context;
        public ProductoController(DBREACT_VENTAContext context)
        {
            _context = context;

        }
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<DtoProducto> lista = new List<DtoProducto>();
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
        [Route("Buscar")]
        public async Task<IActionResult> Buscar(string codigoBarra)
        {
            DtoProducto producto = new DtoProducto();
            try
            {
               // producto = await _context.Productos.Include(c => c.IdCategoriaNavigation).OrderByDescending(c => c.IdProducto).Where(c => c.codigoBarra = codigoBarra);

                return StatusCode(StatusCodes.Status200OK, producto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, producto);
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] DtoProducto request)
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
        public async Task<IActionResult> Editar([FromBody] DtoProducto request)
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
                DtoProducto usuario = _context.Productos.Find(id);
                _context.Productos.Remove(usuario);
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
