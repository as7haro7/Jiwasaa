

# Requisitos Generales – Sabores de La Paz

## 1. Visión general del sistema

**Sabores de La Paz** es una plataforma web que permite descubrir, valorar y recomendar lugares de comida en la ciudad de La Paz – Bolivia, con foco en puestos callejeros, mercados, restaurantes y cafés.[1][2]

El sistema busca:

- Facilitar a habitantes de La Paz y turistas encontrar comida típica paceña (salteñas, api, anticuchos, sándwich de chola, etc.).[3][4]
- Visibilizar puestos callejeros y mercados locales (Mercado Lanza, Rodríguez, etc.) como parte de la identidad gastronómica de la ciudad.[5][6]
- Centralizar reseñas, menús y promociones de lugares de comida en La Paz.

Componentes principales:

- **Frontend**: aplicación web Next.js, con mapa interactivo (React‑Leaflet + OpenStreetMap), búsqueda, filtros, fichas de lugares, reseñas y autenticación de usuarios.  
- **Backend**: API REST desarrollada en Node.js + Express, con base de datos MongoDB Atlas, que gestiona usuarios, lugares, platos, reseñas, promociones, favoritos y reportes.  

***

## 2. Alcance del sistema

- Ámbito geográfico:  
  - Exclusivamente **La Paz – Bolivia** y zonas aledañas (por ejemplo, algunos puntos en El Alto cuando corresponda al circuito gastronómico).[6][5]

- Tipos de lugares cubiertos:  
  - Puestos de comida callejera.  
  - Mercados (ej. Lanza, Rodríguez, otros mercados barriales).  
  - Restaurantes, pensiones, cafés y locales de comida rápida.  

- Tipos de información manejada:  
  - Datos básicos de lugares (nombre, tipo, zona, dirección, horario, rango de precios).  
  - Ubicación geográfica (coordenadas) para mostrar en el mapa.  
  - Platos/menú y promociones.  
  - Reseñas y calificaciones de usuarios.  
  - Favoritos y sugerencias de nuevos lugares.  

Usuarios principales:

- **Usuarios finales** (paceños y turistas): usan el sistema para buscar lugares, ver reseñas, menús y promociones, así como dejar opiniones.  
- **Administradores**: gestionan la información de lugares, moderan reseñas y reportes, y aprueban sugerencias de nuevos lugares.

---

## 3. Requerimientos funcionales generales (RF-G)

### 3.1. Descubrimiento de lugares

- **RF-G1**: El sistema debe permitir listar lugares de comida de La Paz en un mapa y en una lista, mostrando datos básicos: nombre, tipo, zona, rating promedio, rango de precios y una foto.[2][1]
- **RF-G2**: El sistema debe permitir filtrar lugares por:
  - Zona (Centro, Sopocachi, Miraflores, San Pedro, etc.).  
  - Tipo de lugar (callejero, mercado, restaurante, café).  
  - Tipo de comida (salteñas, api, anticuchos, vegano, etc.).[7][2]
- **RF-G3**: El sistema debe permitir buscar lugares por nombre y por platos o comidas típicas (ej. “anticuchos”, “salteñas”).[8][2]

### 3.2. Información detallada de lugares

- **RF-G4**: El sistema debe mostrar una ficha detallada para cada lugar con:
  - Datos generales: nombre, tipo, dirección, zona, horario, descripción, rango de precios.  
  - Ubicación geográfica en mapa.  
  - Menú/platos (nombre, descripción, precio, categoría).  
  - Promociones activas (si las hay).  
  - Reseñas de usuarios (rating, comentarios, fotos, fecha).[9][2]

### 3.3. Participación de usuarios

- **RF-G5**: El sistema debe permitir a los usuarios registrarse, iniciar sesión y gestionar su perfil básico (nombre, foto, preferencias de comida).  
- **RF-G6**: El sistema debe permitir a usuarios autenticados:
  - Crear reseñas para lugares (rating 1–5, comentario, fotos opcionales).  
  - Marcar reseñas de otros como “útiles”.  
  - Marcar lugares como favoritos y ver su lista de favoritos.  
- **RF-G7**: El sistema debe permitir a usuarios autenticados sugerir nuevos lugares de comida en La Paz mediante un formulario con datos básicos y ubicación en el mapa.  

### 3.4. Administración y moderación

- **RF-G8**: El sistema debe permitir a administradores:
  - Crear, editar y cerrar lugares (ej. si un puesto deja de funcionar).  
  - Aprobar o rechazar sugerencias de nuevos lugares enviadas por usuarios.  
  - Revisar y eliminar reseñas inapropiadas.  
- **RF-G9**: El sistema debe contar con un mecanismo de reporte mediante el cual usuarios puedan informar:
  - Lugares que ya no existen o tienen datos incorrectos.  
  - Reseñas ofensivas o inadecuadas.  

***

## 4. Requerimientos no funcionales generales (RNF-G)

### 4.1. Usabilidad y experiencia

- **RNF-G1**: El sistema debe ser **responsive**, accesible desde dispositivos móviles, tablets y escritorios.[10][2]
- **RNF-G2**: La interfaz debe estar completamente en español y usar nombres reales de zonas y mercados de La Paz (ej. Mercado Lanza, Mercado Rodríguez, Sopocachi, Miraflores, etc.).[5][6]
- **RNF-G3**: La información clave (tipo de lugar, zona, horario, rango de precios, rating) debe ser fácil de encontrar y entender para usuarios no técnicos.

### 4.2. Rendimiento

- **RNF-G4**: La pantalla principal (mapa + lista) debe cargar en un tiempo razonable (alrededor de 3 segundos) en una conexión móvil 4G típica.[11][12]
- **RNF-G5**: El sistema debe soportar un número moderado de usuarios concurrentes sin degradación significativa de la experiencia (dimensionado según los recursos de despliegue inicial).  

### 4.3. Seguridad

- **RNF-G6**: El sistema debe garantizar:
  - Almacenamiento seguro de contraseñas (hash, nunca texto plano).  
  - Autenticación mediante tokens JWT en el backend.  
  - Uso de HTTPS en producción para proteger datos en tránsito.[13][14]

### 4.4. Mantenibilidad y escalabilidad

- **RNF-G7**: La arquitectura debe permitir añadir nuevas funcionalidades en el futuro (por ejemplo, eventos gastronómicos, rutas turísticas de comida) sin rediseñar completamente el sistema.[15][16]
- **RNF-G8**: La separación frontend–backend debe estar claramente definida mediante una API REST documentada, facilitando la posibilidad de añadir aplicaciones móviles que consuman la misma API.  


## 5. Tecnologías generales del sistema

### 5.1. Frontend

- **Framework principal**:  
  - **Next.js** (sobre React) para construir la aplicación web, aprovechando renderizado híbrido (SSR/SSG) y buen soporte de SEO.[1][2]

- **Librería de mapas**:  
  - **React‑Leaflet** como wrapper de Leaflet para React/Next.js, para mostrar el mapa y los marcadores de lugares.[3][4]
  - **Leaflet** para manejo de mapas interactivos (zoom, pan, popups, capas).

- **Proveedor de mapas (tiles)**:  
  - **OpenStreetMap** como fuente de datos de mapa (tiles gratuitos para entorno de bajo tráfico y prototipo).[5][3]
  - Posibilidad futura de usar un proveedor como **MapTiler** u otro servicio de tiles si se requiere mejor rendimiento/estilos a escala mayor.

- **Otras tecnologías frontend**:  
  - HTML5, CSS3 (o framework CSS a definir: TailwindCSS/Chakra/etc.).[6]
  - Fetch o Axios para consumir la API REST del backend.  

### 5.2. Backend

- **Lenguaje y entorno**:  
  - **Node.js** (JavaScript) como entorno de ejecución.  

- **Framework web**:  
  - **Express** para definir rutas HTTP, middlewares y controladores de la API REST.[7][8]

- **Base de datos**:  
  - **MongoDB Atlas** como servicio de base de datos NoSQL en la nube (cluster free para el inicio).[9][10]
  - **Mongoose** como ODM para modelar colecciones (`Usuario`, `Lugar`, `Plato`, `Reseña`, `Promocion`, etc.).

- **Autenticación y seguridad**:  
  - **JWT (jsonwebtoken)** para autenticación basada en tokens.  
  - **bcrypt** (o similar) para hash de contraseñas.  
  - **dotenv** para gestionar variables de entorno.  
  - **cors** para permitir comunicaciones controladas desde el frontend.

### 5.3. Mapeo y geolocalización

- **Datos geoespaciales**:  
  - Uso de campos GeoJSON `Point` en los documentos `Lugar` (coordenadas `[longitud, latitud]` de La Paz).  
  - Índices geoespaciales en MongoDB para consultas de lugares cercanos (funciones futuras).[11][9]

- **Frontend de geolocalización**:  
  - Uso de la API de geolocalización del navegador para obtener la ubicación del usuario (con su consentimiento) y centrar el mapa alrededor suyo.

### 5.4. Infraestructura y despliegue

- **Frontend (Next.js)**:  
  - Despliegue previsto en **Vercel** (plan Hobby gratuito) u otra plataforma compatible con Next.js.[12][13]

- **Backend (Node + Express)**:  
  - Despliegue previsto en **Render** (Free Tier) u otro PaaS similar para aplicaciones Node.js.[14][15]

- **Base de datos**:  
  - **MongoDB Atlas** (Free Tier) como instancia de base de datos gestionada.



***



Este documento sirve como marco **global** del sistema. Los detalles específicos de implementación se desarrollan en:

- `docs/backend-requisitos.md` – requisitos del backend.  
- `docs/frontend-requisitos.md` – requisitos del frontend.
