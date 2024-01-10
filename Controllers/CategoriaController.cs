using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactVentas.Models;
using System.Linq.Expressions;

namespace ReactVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private IValidator<Categoria> _validator;
        private readonly DBREACT_VENTAContext _context;
        private ValidationResult validationResult;
        public CategoriaController(IValidator<Categoria> validator, DBREACT_VENTAContext context)
        {
            _context = context;
            _validator = validator;
            validationResult = new();
        }
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Categoria> lista = new List<Categoria>();
            try
            {
                lista = await _context.Categoria.OrderByDescending(c => c.IdCategoria).AsNoTracking().ToListAsync();
                return StatusCode(StatusCodes.Status200OK, lista);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, lista);
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Categoria request) {
            try
            {
                validationResult =  await _validator.ValidateAsync(request);
                if (validationResult.IsValid)
                {
                    await _context.Categoria.AddAsync(request);
                    await _context.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, "ok");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
            catch {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Categoria request) {
            try
            {
                _context.Categoria.Update(request);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id) {
            try
            {
                Categoria ?categoria = _context.Categoria.Find(id);
                if (categoria is not null)
                {
                    _context.Categoria.Remove(categoria);
                    await _context.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, "ok");
                }
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
