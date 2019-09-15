using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace JsonRpcNet.AspNetCore
{
    public static class JsonRpcApplicationBuilder
    {
        public static IApplicationBuilder AddJsonRpcHandler<TJsonRpcWebSocketHandler>(this IApplicationBuilder app)
            where TJsonRpcWebSocketHandler : JsonRpcWebSocketConnection
        {
            var routePrefixAttr = typeof(TJsonRpcWebSocketHandler).GetCustomAttribute<JsonRpcRoutePrefixAttribute>();
            var handler = app.ApplicationServices.GetRequiredService<TJsonRpcWebSocketHandler>();
            return app.Map(routePrefixAttr.RoutePrefix, a => a.UseMiddleware<JsonRpcWebSocketMiddleware>(handler));
        }

        public static IServiceCollection AddWebSocketHandlers(this IServiceCollection services)
        {
            foreach(var type in Assembly.GetEntryAssembly().ExportedTypes)
            {
                if(type.GetTypeInfo().BaseType == typeof(JsonRpcWebSocketConnection))
                {
                    services.AddTransient(type);
                }
            }

            return services;
        }
    }
    
}