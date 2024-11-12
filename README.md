# Productos-financieros

# Productos Financieros

**Productos Financieros** es una aplicación web para gestionar productos financieros, construida utilizando **Angular** para el frontend y **Node.js** con **Express** y **Routing-Controllers** para el backend.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** Angular 18, Reactive Forms, TypeScript
- **Backend:** Node.js, Express, Routing-Controllers
- **Base de Datos:** Simulación con un array en memoria
- **Estilos:** CSS personalizado, diseño responsivo
- **Comunicación HTTP:** HTTPClient, Servicios REST
- **Validaciones:** Validaciones personalizadas en frontend con Angular y validaciones en el backend

## ⚙️ Funcionalidades

- **Listado de Productos:** Visualización de productos financieros con búsqueda filtrada.
- **Creación de Productos:** Modal para agregar un nuevo producto con validaciones robustas.
- **Edición de Productos:** Modal para editar un producto existente.
- **Eliminación de Productos:** Confirmación de eliminación con un modal de confirmación.
- **Validaciones de Formulario:** Validaciones en tiempo real para todos los campos del formulario.
- **CORS:** Configuración para permitir solicitudes desde el frontend al backend.

## 📋 Requisitos

- Node.js v18 o superior
- Angular CLI v18 o superior
- NPM v9 o superior

## 🚀 Instalación

### 1. Clona el Repositorio

```bash
git clone https://github.com/tu-usuario/productos-financieros.git
cd productos-financieros
```

### 2. Configuración del Backend
```
cd backend
npm install
```
### 3. Ejecutar el Backend
```
npm start
El servidor estará corriendo en http://localhost:3002.
```
### 4. Configuración del Frontend
```
cd frontend
npm install
```

### 5.  Ejecutar el front-End
```
ng serve
```

### 6. Configurar Cors del Backe-end
```
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 7. Ejecutar test del Front-End
```
npm test
```
