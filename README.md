# 🎯 QRGen Serverless

Generador de códigos QR serverless construido con AWS Lambda, Express, TypeScript y Vue 3. Una aplicación full-stack moderna que genera códigos QR en formato SVG a través de una API REST y los visualiza con una interfaz web elegante.

## 🚀 Características

- ✨ **API REST Serverless** - Desplegable en AWS Lambda
- 🎨 **Interfaz Web Moderna** - Frontend con Vue 3 + Vite
- 📱 **Diseño Responsive** - Optimizado para todos los dispositivos
- 🔒 **Validación Robusta** - Schema validation con Zod
- ⚡ **Desarrollo Local** - Serverless Offline + Vite HMR
- 🎭 **SVG de Alta Calidad** - Códigos QR escalables sin pérdida
- 🌈 **UI Glassmorphism** - Diseño visual atractivo y moderno

## 📁 Estructura del Proyecto

```
qrgen-serverless/
├── src/                    # Backend serverless
│   ├── handler.ts         # Lambda handler principal
│   └── app.ts             # Express app con endpoints
├── web/                    # Frontend Vue
│   ├── src/
│   │   ├── App.vue        # Componente principal
│   │   ├── main.ts        # Entry point
│   │   └── style.css      # Estilos globales
│   ├── vite.config.ts     # Configuración Vite
│   └── package.json       # Dependencias frontend
├── serverless.yml         # Configuración Serverless Framework
├── tsconfig.json          # TypeScript config backend
└── package.json           # Dependencias backend
```

## 🛠️ Tecnologías

### Backend
- **Node.js 20** - Runtime
- **Express 5** - Framework web
- **TypeScript** - Tipado estático
- **Serverless Framework** - Despliegue en AWS
- **QRCode** - Generación de códigos QR
- **Zod** - Validación de schemas

### Frontend
- **Vue 3** - Framework reactivo
- **Vite** - Build tool y dev server
- **TypeScript** - Tipado estático
- **CSS3** - Animaciones y glassmorphism

## 📦 Instalación

### Prerrequisitos
- Node.js 20+
- npm o pnpm

### Backend (API)
```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Frontend (Web)
```bash
# Navegar al directorio web
cd web

# Instalar dependencias
npm install

# Desarrollo local
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🔌 API Endpoints

### `GET /health`
Health check del servicio

**Response:**
```json
{
  "ok": true,
  "service": "qrgen"
}
```

### `GET /qr`
Genera un código QR a partir de query parameters

**Query Parameters:**
- `text` (string, requerido) - Texto a codificar (1-500 caracteres)
- `size` (number, opcional) - Tamaño del QR en píxeles (128-1024, default: 256)

**Ejemplo:**
```bash
curl "http://localhost:3000/qr?text=Hello%20World&size=512"
```

**Response:**
- Content-Type: `image/svg+xml`
- Body: SVG del código QR

### `POST /qr`
Genera un código QR a partir del body

**Body:**
```json
{
  "text": "Hello World",
  "size": 512
}
```

**Response:**
- Status: 201
- Content-Type: `image/svg+xml`
- Body: SVG del código QR

**Errores:**
```json
{
  "error": {
    "formErrors": [],
    "fieldErrors": {
      "text": ["text es requerido"]
    }
  }
}
```

## 🎨 Uso del Frontend

1. Abre la aplicación en tu navegador
2. Escribe el texto que quieres codificar
3. Ajusta el tamaño con el slider (128-1024px)
4. Haz clic en "Generar QR"
5. Descarga el SVG con el botón "Descargar SVG"

## 🚀 Despliegue

### Configurar AWS Credentials
```bash
# Configurar AWS CLI
aws configure
```

### Desplegar a AWS Lambda
```bash
npm run deploy
```

El comando desplegará:
- Lambda Function con Node.js 20
- API Gateway HTTP API
- Todos los recursos necesarios en AWS

### Build Frontend para Producción
```bash
cd web
npm run build
```

Los archivos estáticos estarán en `web/dist/`

## 🔧 Configuración

### Serverless Framework
Edita `serverless.yml` para cambiar:
- Región de AWS
- Stage (dev/prod)
- Memoria y timeout del Lambda
- Variables de entorno

### Vite Proxy
El frontend usa un proxy para desarrollo local (ver `web/vite.config.ts`):
```typescript
server: {
  proxy: {
    '/qr': 'http://localhost:3000',
    '/health': 'http://localhost:3000'
  }
}
```

## 📝 Scripts Disponibles

### Backend
```bash
npm run dev       # Serverless offline (localhost:3000)
npm run deploy    # Desplegar a AWS
```

### Frontend
```bash
npm run dev       # Dev server con HMR (localhost:5173)
npm run build     # Build para producción
npm run preview   # Preview del build
```

## 🧪 Validación

El proyecto usa **Zod** para validación robusta:

```typescript
{
  text: string (1-500 chars),
  size?: number (128-1024, default: 256)
}
```

## 🎯 Características Técnicas

- **Serverless Architecture** - Sin gestión de servidores
- **TypeScript Strict Mode** - Máxima seguridad de tipos
- **ESBuild** - Build ultra rápido
- **Hot Module Replacement** - Desarrollo ágil
- **Responsive Design** - Mobile-first approach
- **Animaciones CSS** - Transiciones suaves y profesionales
- **Error Handling** - Gestión robusta de errores

## 📄 Licencia

Este proyecto es de código abierto.

## 👨‍💻 Desarrollo

```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend
cd web && npm run dev
```

Abre `http://localhost:5173` y empieza a desarrollar! 🎉

---

**Hecho con ❤️ usando Vue, Express y Serverless Framework**
