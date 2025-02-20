import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts';  
  
  const app = new Application();  
  
  // Send static content  
  app.use(async (ctx, next) => {  
      try {  
          await ctx.send({  
              root: `${Deno.cwd()}/`,  
              index: 'index.js',  
          });  
      } catch {  
          await next();  
      }  
  });  
  
  // 404 handler (redirect to index.js)  
  app.use((ctx) => {  
      // handle index.js not found  
      if (  
          ctx.request.url.pathname === '/' ||  
          ctx.request.url.pathname ==='/ index.js'  
      ) {  
          ctx.response.status = 404;  
          ctx.response.body = 'Not found.\nSeems index.html is missing.';  
          return;  
      }  
      ctx.response.status = 301;  
      ctx.response.redirect('/');  
  });  
  
  console.log('App listening on port', 3000);  
  await app.listen({ port: 3000 }); 
  
