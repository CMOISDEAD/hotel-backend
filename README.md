# Hotels Cocora (Backend)

Backend de el proyecto de hoteles de cocora, desarrollado en Express, MongoDB y NodeJS.

## Requerimientos

- NodeJS
- NPM
- MongoDB
- Frontend de la aplicación, [Frontend](https://github.com/CMOISDEAD/hotels-frontend)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CMOISDEAD/hotels-backend.git

# Entrar al directorio
cd hotels-backend

# Instalar dependencias
npm install

```

Conectar con MongoDB Atlas, crear un archivo .env y agregar la variable de entorno `DATABASE_URL`, y agrega tu url de conexión.

```bash
# Crea los modelos de prisma en Atlas
npx prisma db push

# Compilar y ejecutar el proyecto
npm run build && npm run start
```

## Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.
