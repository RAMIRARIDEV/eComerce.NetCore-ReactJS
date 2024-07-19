using Application.Categories;
using Application.Contracts;
using Application.Products;
using Application.Users;
using Carter;
using Domain.Abstractions;
using Infrastructure.Context;
using Infrastructure.Helpers;
using Infrastructure.UnitOfWork;
using MediatR;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace IoContainer;

public static class IoC
{
    public static void AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies()); 
        #region db
        string connectionString = ConnectionStringHelper.GetConnectionString(configuration);
        services.AddDbContext<EcomerceContext>(x => x.UseSqlServer(connectionString));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        #endregion 
        services.AddRouting();
        services.AddEndpointsApiExplorer();
        services.AddCarter();
        services.AddSwaggerGen();

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IUserService, UserService>();
        services.AddCors();
        services.Configure<JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

    }
}
