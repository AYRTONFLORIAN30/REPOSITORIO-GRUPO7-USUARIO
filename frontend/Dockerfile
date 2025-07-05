# Fase de construcción
# Usamos una imagen de Node.js para construir la aplicación React
FROM node:18-alpine as build

# Establece el directorio de trabajo dentro del contenedor para la fase de construcción
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existen)
# Esto permite que Docker use el cache si las dependencias no cambian
COPY package*.json ./

# Instala las dependencias de React
RUN npm install

# Copia el resto del código de la aplicación (src, public, etc.)
COPY . .

# Ejecuta el comando de construcción de React
# Esto generará los archivos estáticos (HTML, CSS, JS) en la carpeta 'build'
RUN npm run build

# Fase de producción
# Usamos una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia la configuración predeterminada de Nginx.
# Esto es importante para aplicaciones SPA (Single Page Application) como React,
# ya que asegura que las rutas del lado del cliente funcionen correctamente.
# Este archivo `default.conf` se crea por defecto si no lo tienes.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de construcción generados por React a la ubicación de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80, que es el puerto HTTP estándar para Nginx
EXPOSE 80

# Comando para iniciar Nginx en modo 'daemon off' para que se ejecute en primer plano
CMD ["nginx", "-g", "daemon off;"]