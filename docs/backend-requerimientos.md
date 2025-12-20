## 1. Contexto del backend

- Nombre del proyecto: **JIWASA** (backend).
- Objetivo: Exponer una **API REST** para una app tipo “Tripadvisor de comida paceña”, centrada en La Paz – Bolivia, que gestione:
  - Lugares de comida (puestos callejeros, mercados, restaurantes, cafés) en zonas como Centro, Sopocachi, Miraflores, San Pedro, etc.[1][2]
  - Platos típicos que se venden en esos lugares (salteñas, api, anticuchos, etc.).[3][4]
  - Reseñas de usuarios, promociones y favoritos.
- Consumidor principal: frontend Next.js desplegado como app web pública.

---

## 2. Tecnologías del backend

- **Node.js** como entorno de ejecución.
- **Express** como framework para crear la API REST.[5][6]
- **MongoDB Atlas** como base de datos NoSQL (cluster free).
- **Mongoose** como ODM para definir esquemas y modelos.
- **dotenv** para variables de entorno.
- **cors** para permitir acceso desde el frontend.
- **bcrypt** (o similar) para hash de contraseñas.
- **jsonwebtoken (JWT)** para autenticación basada en tokens.
- Despliegue: servicio Node (por ejemplo **Render Free Tier**) + MongoDB Atlas Free Tier.[7][8]

---

## 3. Modelado de datos (colecciones principales)

### 3.1. Usuario

Representa a un usuario de la app (paceño o turista).

**Campos sugeridos:**

- `nombre`: String, requerido.
- `email`: String, requerido, único.
- `passwordHash`: String, requerido.
- `rol`: String, enum: `["usuario", "admin"]`, por defecto `"usuario"`.
- `fotoPerfil`: String, opcional (URL).
- `preferenciasComida`: [String], opcional (ej. `["salteñas", "anticuchos"]`).
- `fechaRegistro`: Date, por defecto ahora.

**Relaciones:**

- Un usuario puede tener muchas reseñas, favoritos y reportes.

### 3.2. Lugar

Representa un punto gastronómico de La Paz.

**Campos sugeridos:**

- `nombre`: String, requerido.
- `tipo`: String, enum: `["callejero", "mercado", "restaurante", "café", "otro"]`, requerido.[9][10]
- `direccion`: String, requerido (ej. “Calle Comercio esquina Yanacocha”).
- `zona`: String, enum con valores como:
  - `"Centro"`, `"Sopocachi"`, `"Miraflores"`, `"San Pedro"`, `"Villa Fátima"`, `"El Alto"`, `"Calacoto"`, etc.[2][1]
- `coordenadas`: objeto GeoJSON:
  - `{ type: { type: String, enum: ["Point"], required: true }, coordinates: { type: [Number], required: true } }`
  - `coordinates` = `[longitud, latitud]` (La Paz).
- `descripcion`: String, opcional.
- `tiposComida`: [String], opcional (ej. `["salteñas", "api", "anticuchos"]`).[4][3]
- `rangoPrecios`: String, enum: `["bajo", "medio", "alto"]` o similar.
- `horario`: String (ej. “Lun–Sáb 07:00–22:00”).
- `fotos`: [String] (URLs).
- `promedioRating`: Number, por defecto 0.
- `cantidadResenas`: Number, por defecto 0.
- `estado`: String, enum: `["activo", "cerrado", "pendiente"]`, por defecto `"activo"`.
- `fechaCreacion`: Date.

**Relaciones:**

- Un lugar tiene muchos `Plato`, muchas `Reseña` y muchas `Promocion`.

### 3.3. Plato (o MenuItem)

Permite detallar qué se vende en cada lugar.

**Campos sugeridos:**

- `lugarId`: ObjectId → referencia a `Lugar`, requerido.
- `nombre`: String, requerido (ej. “Salteña de carne”).
- `descripcion`: String, opcional.
- `precio`: Number, requerido (en Bs).
- `categoria`: String (ej. “desayuno”, “almuerzo”, “snack”).[11]
- `etiquetas`: [String] (ej. “picante”, “típico paceño”, “vegano”).[4]
- `disponible`: Boolean, por defecto `true`.

### 3.4. Reseña

Opinión de un usuario sobre un lugar.

**Campos sugeridos:**

- `usuarioId`: ObjectId → `Usuario`, requerido.
- `lugarId`: ObjectId → `Lugar`, requerido.
- `rating`: Number (1–5), requerido.
- `comentario`: String, requerido.
- `fotos`: [String], opcional.
- `util`: Number, por defecto 0 (veces marcada como útil).
- `fecha`: Date, por defecto ahora.

### 3.5. Promoción

Ofertas temporales asociadas a lugares o platos.

**Campos sugeridos:**

- `lugarId`: ObjectId → `Lugar`, requerido.
- `platoId`: ObjectId → `Plato`, opcional.
- `titulo`: String, requerido.
- `descripcion`: String, requerido.
- `precioPromo`: Number, opcional.
- `descuentoPorcentaje`: Number, opcional.
- `fechaInicio`: Date, requerido.
- `fechaFin`: Date, requerido.
- `activa`: Boolean (se puede derivar de las fechas).[12][13]

### 3.6. Favorito (opcional)

Lista de lugares que un usuario marcó como favoritos.

**Campos:**

- `usuarioId`: ObjectId → `Usuario`, requerido.
- `lugarId`: ObjectId → `Lugar`, requerido.
- `fecha`: Date.

### 3.7. Reporte (opcional)

Para moderación (lugar o reseña reportados).

**Campos:**

- `tipo`: String, enum: `["lugar", "reseña"]`.
- `lugarId`: ObjectId → `Lugar`, opcional.
- `reseñaId`: ObjectId → `Reseña`, opcional.
- `usuarioId`: ObjectId → `Usuario` (quien reporta).
- `motivo`: String.
- `estado`: String, enum: `["pendiente", "resuelto"]`.
- `fecha`: Date.

---

## 4. Requerimientos funcionales del backend (RF – detallados)

### 4.1. Usuarios y autenticación

- **RF-B1 – Registro de usuario**

  - Endpoint `POST /api/auth/register`.
  - Recibe `nombre`, `email`, `password`.
  - Valida que el email no exista y guarda `passwordHash`.
  - Devuelve datos básicos del usuario y opcionalmente un token JWT.

- **RF-B2 – Login**

  - Endpoint `POST /api/auth/login`.
  - Valida credenciales, genera JWT con id y rol.
  - Devuelve token y datos básicos (nombre, email, rol).

- **RF-B3 – Perfil del usuario autenticado**

  - Endpoint `GET /api/users/me`.
  - Requiere JWT.
  - Devuelve datos del usuario (nombre, email, preferencias, foto).

- **RF-B4 – Actualizar perfil**

  - Endpoint `PUT /api/users/me`.
  - Permite cambiar nombre, foto y preferencias de comida.

- **RF-B5 – Gestión de roles (admin)**
  - Los usuarios con rol `admin` pueden acceder a endpoints de administración (lugares, reportes, etc.).

### 4.2. Gestión de lugares

- **RF-B6 – Crear lugar (admin)**

  - `POST /api/lugares`.
  - Crea un lugar con todos los campos necesarios; inicializa `promedioRating` y `cantidadResenas` en 0.

- **RF-B7 – Sugerir lugar (usuario)**

  - `POST /api/lugares/sugerencias`.
  - Usuarios pueden enviar nueva propuesta de lugar; se guarda como `estado: "pendiente"` para revisión de admin.

- **RF-B8 – Listar lugares**

  - `GET /api/lugares`.
  - Soporta filtros:
    - `zona` (Centro, Sopocachi, etc.).
    - `tipo` (callejero, mercado, restaurante).
    - `tipoComida` (buscar “salteñas”, “api”, etc.).[9][11]
  - Soporta paginación: `page`, `limit`.
  - Devuelve lista de lugares con datos básicos + rating promedio.

- **RF-B9 – Buscar por texto**

  - `GET /api/lugares/buscar?q=...`.
  - Busca por nombre de lugar, dirección o tipos de comida (ej. “anticuchos”, “Mercado Lanza”).[14][15]

- **RF-B10 – Detalle de lugar**

  - `GET /api/lugares/:id`.
  - Devuelve toda la información del lugar, incluyendo promedioRating, cantidadResenas y, opcionalmente, algunas reseñas recientes y platos.

- **RF-B11 – Actualizar lugar (admin)**

  - `PUT /api/lugares/:id`.
  - Permite modificar datos para mantener actualizados puestos y restaurantes (por ejemplo, si se mudan de calle).

- **RF-B12 – Eliminar/cerrar lugar (admin)**
  - `DELETE /api/lugares/:id` o cambio de `estado` a `"cerrado"` (mejor que borrado físico).

### 4.3. Platos / menú

- **RF-B13 – Crear plato**

  - `POST /api/lugares/:lugarId/platos`.
  - Permite añadir platos asociados a un lugar (ej. menús del día, platos típicos).[16][11]

- **RF-B14 – Listar platos de un lugar**

  - `GET /api/lugares/:lugarId/platos`.
  - Devuelve el menú de ese puesto/restaurante.

- **RF-B15 – Actualizar / eliminar plato**
  - `PUT /api/platos/:id`, `DELETE /api/platos/:id`.
  - Permite mantener el menú actualizado.

### 4.4. Reseñas

- **RF-B16 – Crear reseña**

  - `POST /api/lugares/:lugarId/reseñas`.
  - Usuario autenticado envía rating (1–5) y comentario.
  - Backend recalcula `promedioRating` y `cantidadResenas` del lugar.

- **RF-B17 – Listar reseñas**

  - `GET /api/lugares/:lugarId/reseñas`.
  - Paginación y orden (por fecha, por “más útiles”).[17][18]

- **RF-B18 – Marcar reseña como útil**
  - `POST /api/reseñas/:id/util`.
  - Incrementa contador `util`.

### 4.5. Promociones

- **RF-B19 – Crear promoción**

  - `POST /api/lugares/:lugarId/promociones`.
  - Admin crea promo para un lugar y opcionalmente para un plato concreto.

- **RF-B20 – Listar promociones**

  - `GET /api/lugares/:lugarId/promociones` → promos de un lugar.
  - `GET /api/promociones/activas` → promos activas en toda La Paz (filtro por zona opcional).

- **RF-B21 – Actualizar / desactivar promoción**
  - `PUT /api/promociones/:id`, `DELETE /api/promociones/:id` o marcar `activa` en `false`.

### 4.6. Favoritos (opcional)

- **RF-B22 – Añadir favorito**
  - `POST /api/favoritos`. (body: `lugarId`)
- **RF-B23 – Listar favoritos del usuario**
  - `GET /api/favoritos`.

### 4.7. Reportes y moderación (opcional)

- **RF-B24 – Reportar contenido**
  - `POST /api/reportes` con tipo, ids y motivo.
- **RF-B25 – Gestionar reportes (admin)**
  - `GET /api/reportes`, `PUT /api/reportes/:id`.

---

## 5. Requerimientos no funcionales (RNF – detallados)

- **RNF-B1 – Seguridad**

  - Contraseñas hasheadas.
  - JWT para protección de endpoints.
  - Validación de entradas y sanitización.

- **RNF-B2 – Rendimiento**

  - Paginación en listados de lugares, reseñas y platos.
  - Índices Mongo en:
    - `zona`, `tipo`, `tiposComida`, `coordenadas` (geospatial).[19][14]

- **RNF-B3 – Disponibilidad**

  - API desplegada en un PaaS (Render) accesible 24/7 para tráfico bajo–medio.

- **RNF-B4 – Mantenibilidad**

  - Estructura en capas:
    - `routes/`, `controllers/`, `models/`, `middlewares/`.
  - Documentación de endpoints en un archivo `docs/api-endpoints.md` (o Swagger).[20][21]

- **RNF-B5 – Escalabilidad**
  - Posibilidad de añadir nuevas colecciones (`EventoGastronomico`, `ListadoCurado`, etc.) sin rediseñar todo el sistema.
  - Uso de MongoDB Atlas para escalar capacidad de forma gradual.[22]
