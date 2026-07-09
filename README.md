
# ChambeYa

Plataforma web que conecta postulantes y empleadores, con servicios de autenticación, gestión de vacantes y perfiles optimizados mediante IA.

## 🧭 Descripción

ChambeYAv2 es una aplicación multi-sitio que ofrece una landing page estática y una web app React/TypeScript destinada a facilitar el encuentro entre talento y empresas. Incluye autenticación Firebase, base de datos Firestore y optimización de perfiles con Google Gemini AI.

## 🚀 Características principales

### Para Postulantes

- Registro e inicio de sesión con Firebase Authentication.
- Exploración de vacantes y búsqueda de empleo.
- Gestión de perfil profesional y habilidades.
- Postulación a ofertas laborales.
- Visualización de notificaciones y conversaciones.
- Optimización de perfil mediante IA para mejorar visibilidad.

### Para Empleadores

- Registro e inicio de sesión con Firebase Authentication.
- Creación y edición de vacantes.
- Gestión de candidatos y evaluación de postulaciones.
- Administración de información de la empresa.
- Visualización de métricas, notificaciones y chat empresarial.

## 🧱 Stack Tecnológico

- Frontend: React + TypeScript (TSX)
- Bundler / Dev Server: Vite
- Estilos: Tailwind CSS
- Landing page estática: HTML, CSS y JavaScript
- Backend / BaaS: Firebase Authentication + Firestore Database
- IA integrada: Google Gemini AI (vía API Key)
- Despliegue: Firebase Hosting (multi-sitio)

## ✅ Requisitos previos

- Node.js instalado
- Firebase CLI instalado y autenticado
- Cuenta de Firebase configurada
- Clave de Google Gemini AI (API Key)

## 🛠️ Instalación y configuración local

1. Clonar el repositorio:

   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd ChambeYAv2
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear archivo de variables de entorno en la raíz del proyecto:

   ```bash
   cp .env.example .env
   ```

   Si no existe `.env.example`, crea un archivo `.env` con el contenido mínimo:

   ```env
   VITE_GEMINI_API_KEY=tu_api_key_de_gemini
   VITE_FIREBASE_API_KEY=tu_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_firebase_app_id
   ```

   > No compartas ni subas las claves reales al repositorio.

4. Vincular el proyecto local con Firebase:

   ```bash
   firebase use <ID-DEL-PROYECTO>
   ```

## 📦 Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo de Vite.
- `npm run build` — Genera la versión de producción en `dist/`.

## 🗂️ Estructura del repositorio

- `index.html` — Landing page estática alojada en el mismo proyecto.
- `src/` — Código fuente de la Web App React.
  - `src/main.tsx` — Entrada principal de la aplicación.
  - `src/app/` — Componentes de la aplicación, páginas y rutas.
  - `src/services/` — Integraciones con Firebase, IA y lógica de negocio.
  - `src/styles/` — Estilos globales y temas.
- `package.json` — Dependencias y scripts.
- `firebase.json` — Configuración de Firebase Hosting.

## 🚢 Despliegue a producción

1. Asegúrate de tener el proyecto Firebase seleccionado y configurado.
2. Genera la build de producción:

   ```bash
   npm run build
   ```

3. Despliega usando Firebase Hosting con el target del sitio:

   ```bash
   firebase deploy --only hosting:site-name
   ```

   Si el proyecto usa configuración multi-sitio, reemplaza `site-name` por el nombre del target configurado en `.firebaserc`.

4. Revisa el resultado y el dominio final que provee Firebase.

---

## 💡 Notas adicionales

- Esta plataforma mezcla una landing page estática con una aplicación web moderna basada en React.
- Firebase ofrece el backend sin servidor necesario para autenticación y datos en tiempo real.
- La integración con Gemini AI se usa para optimizar perfiles y mejorar la experiencia de los postulantes.

  
