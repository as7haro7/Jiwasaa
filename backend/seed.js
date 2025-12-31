import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

dotenv.config();

// IMPORTA TUS MODELOS REALES (Corrected to English filenames)
import Usuario from "./src/models/User.js";
import Lugar from "./src/models/Place.js";
import Plato from "./src/models/Dish.js";
import Review from "./src/models/Review.js";
import Favorito from "./src/models/Favorite.js";
import Promocion from "./src/models/Promotion.js";
import SponsoredPlacement from "./src/models/SponsoredPlacement.js";


async function seed() {
  try {
    await connectDB();
    // console.log("Conectado a MongoDB"); // connectDB already logs this

    // Limpia colecciones (opcional)
    await Promise.all([
      Usuario.deleteMany({}),
      Lugar.deleteMany({}),
      Plato.deleteMany({}),
      Review.deleteMany({}),
      Favorito.deleteMany({}),
      Promocion.deleteMany({}),
      SponsoredPlacement.deleteMany({})
    ]);

    // 1) Usuarios
    const [carlos, donaRita, admin] = await Usuario.insertMany([
      {
        nombre: "Carlos Mamani",
        email: "carlos@jiwasa.com",
        password: "$2b$10$QYPflmw6F0wEIHtb9efDa.x1StKsYgFR4F18QPa3ZedV24U0nU/vC",
        // googleId: null, // Removed to avoid unique index conflict if sparse doesn't handle explicit nulls well in this setup
        authProvider: "local",
        biografia: "Paceño fan de la comida callejera y mercados.",
        telefono: "+59170123456",
        rol: "usuario",
        fotoPerfil: "",
        preferenciasComida: ["salteñas", "anticuchos", "sopa de maní"],
        esPropietario: false
      },
      {
        nombre: "Doña Rita Anticuchos",
        email: "rita@jiwasa.com",
        password: "$2b$10$QYPflmw6F0wEIHtb9efDa.x1StKsYgFR4F18QPa3ZedV24U0nU/vC",
        // googleId: null,
        authProvider: "local",
        biografia: "Atiendo anticuchos en Sopocachi hace más de 20 años.",
        telefono: "+59171111111",
        rol: "usuario",
        fotoPerfil: "",
        preferenciasComida: ["anticuchos", "api con buñuelo"],
        esPropietario: true
      },
      {
        nombre: "Admin Jiwasa",
        email: "erick@jiwasa.com",
        password: "$2b$10$QYPflmw6F0wEIHtb9efDa.x1StKsYgFR4F18QPa3ZedV24U0nU/vC",
        // googleId: null,
        authProvider: "local",
        biografia: "Administrador de la plataforma Sabores de La Paz.",
        telefono: "+59170000000",
        rol: "admin",
        fotoPerfil: "",
        preferenciasComida: [],
        esPropietario: false
      }
    ]);

    // 2) Lugares
    const [anticuchosRita, saltenasCentro, comedorLanza] = await Lugar.insertMany([
      {
        propietarioId: donaRita._id,
        nombre: "Anticuchos Doña Rita",
        tipo: "callejero",
        direccion: "Av. 20 de Octubre esquina Aspiazu",
        zona: "Sopocachi",
        coordenadas: {
          type: "Point",
          coordinates: [-68.1285, -16.5130] // Longitude, Latitude
        },
        descripcion: "Puesto tradicional de anticuchos paceños con papita y ají de maní.",
        tiposComida: ["anticuchos", "comida nocturna", "comida típica"],
        rangoPrecios: "bajo",
        horario: {
            lunes: { apertura: "18:00", cierre: "23:30", cerrado: false },
            martes: { apertura: "18:00", cierre: "23:30", cerrado: false },
            miercoles: { apertura: "18:00", cierre: "23:30", cerrado: false },
            jueves: { apertura: "18:00", cierre: "23:30", cerrado: false },
            viernes: { apertura: "18:00", cierre: "23:59", cerrado: false },
            sabado: { apertura: "18:00", cierra: "23:59", cerrado: false },
            domingo: { apertura: "19:00", cierre: "22:30", cerrado: true }
        },
        fotos: [],
        promedioRating: 4.7,
        cantidadResenas: 3,
        estado: "activo",
        destacado: true,
        nivelVisibilidad: "premium",
        telefonoContacto: "+59171111111",
        emailContacto: "rita.anticuchos@jiwasa.com",
        sitioWeb: "",
        redesSociales: {
          instagram: "https://instagram.com/anticuchos_dona_rita"
        }
      },
      {
        propietarioId: admin._id, // Assigning to admin as placeholder since null might fail if required=true in strict validatin, but Place says required=true. Let's use Admin or create one.
        nombre: "Salteñería Paceña La Salteña",
        tipo: "restaurante",
        direccion: "Calle Comercio esquina Ayacucho",
        zona: "Centro",
        coordenadas: {
          type: "Point",
          coordinates: [-68.1330, -16.4975]
        },
        descripcion: "Salteñas de pollo y carne con ají, jugosas y tradicionales.",
        tiposComida: ["salteñas", "desayuno", "snack"],
        rangoPrecios: "medio",
        horario: {
            lunes: { apertura: "08:00", cierre: "13:00", cerrado: false },
            martes: { apertura: "08:00", cierre: "13:00", cerrado: false },
            miercoles: { apertura: "08:00", cierre: "13:00", cerrado: false },
            jueves: { apertura: "08:00", cierre: "13:00", cerrado: false },
            viernes: { apertura: "08:00", cierre: "13:00", cerrado: false },
            sabado: { apertura: "08:00", cierre: "12:00", cerrado: false },
            domingo: { apertura: "00:00", cierre: "00:00", cerrado: true }
        },
        fotos: [],
        promedioRating: 4.5,
        cantidadResenas: 2,
        estado: "activo",
        destacado: true,
        nivelVisibilidad: "patrocinado",
        telefonoContacto: "+59171234567",
        emailContacto: "contacto@lasaltena.com",
        sitioWeb: "https://lasaltena.com",
        redesSociales: {
          facebook: "https://facebook.com/lasaltena"
        }
      },
      {
        propietarioId: admin._id,
        nombre: "Comedor Doña Elvira - Mercado Lanza",
        tipo: "mercado",
        direccion: "Mercado Lanza, piso 2, puesto 45",
        zona: "Centro",
        coordenadas: {
          type: "Point",
          coordinates: [-68.1322, -16.4990]
        },
        descripcion: "Comidas típicas paceñas: sopas, segundos y sándwich de chorizo.",
        tiposComida: ["almuerzo", "sopa de maní", "sándwich de chorizo", "plato paceño"],
        rangoPrecios: "bajo",
        horario: {
            lunes: { apertura: "11:30", cierre: "15:30", cerrado: false },
            martes: { apertura: "11:30", cierre: "15:30", cerrado: false },
            miercoles: { apertura: "11:30", cierre: "15:30", cerrado: false },
            jueves: { apertura: "11:30", cierre: "15:30", cerrado: false },
            viernes: { apertura: "11:30", cierre: "15:30", cerrado: false },
            sabado: { apertura: "11:30", cierre: "15:30", cerrado: false },
            domingo: { apertura: "00:00", cierre: "00:00", cerrado: true }
        },
        fotos: [],
        promedioRating: 4.3,
        cantidadResenas: 1,
        estado: "activo",
        destacado: false,
        nivelVisibilidad: "normal",
        telefonoContacto: "",
        emailContacto: "",
        sitioWeb: "",
        redesSociales: {}
      }
    ]);

    // 3) Platos
    const [anticucho, saltenaCarne, saltenaPollo, sopaMani] = await Plato.insertMany([
      {
        lugarId: anticuchosRita._id,
        nombre: "Anticucho de corazón",
        descripcion: "Brochetas de corazón de res con papa y ají de maní.",
        precio: 12,
        categoria: "cena",
        etiquetas: ["anticuchos", "típico", "picante"],
        disponible: true,
        destacado: true
      },
      {
        lugarId: saltenasCentro._id,
        nombre: "Salteña de carne",
        descripcion: "Salteña jugosa de carne con papa y ají.",
        precio: 8,
        categoria: "desayuno",
        etiquetas: ["salteñas", "típico"],
        disponible: true,
        destacado: true
      },
      {
        lugarId: saltenasCentro._id,
        nombre: "Salteña de pollo",
        descripcion: "Salteña de pollo ligeramente picante.",
        precio: 8,
        categoria: "desayuno",
        etiquetas: ["salteñas"],
        disponible: true,
        destacado: false
      },
      {
        lugarId: comedorLanza._id,
        nombre: "Sopa de maní",
        descripcion: "Sopa de maní con papas y carne, estilo paceño.",
        precio: 14,
        categoria: "almuerzo",
        etiquetas: ["sopa de maní", "típico"],
        disponible: true,
        destacado: true
      }
    ]);

    // 4) Reseñas
    await Review.insertMany([
      {
        usuarioId: carlos._id,
        lugarId: anticuchosRita._id,
        rating: 5,
        comentario: "Los mejores anticuchos de Sopocachi, ají de maní brutal.",
        fotos: [],
        util: 3
      },
      {
        usuarioId: carlos._id,
        lugarId: saltenasCentro._id,
        rating: 4,
        comentario: "Salteñas muy buenas, pero se acaban rápido si llegas tarde.",
        fotos: [],
        util: 1
      },
      {
        usuarioId: carlos._id,
        lugarId: comedorLanza._id,
        rating: 4,
        comentario: "Almuerzo barato en el Mercado Lanza, sopa de maní recomendada.",
        fotos: [],
        util: 0
      }
    ]);

    // 5) Favoritos
    await Favorito.insertMany([
      { usuarioId: carlos._id, lugarId: anticuchosRita._id },
      { usuarioId: carlos._id, lugarId: saltenasCentro._id }
    ]);

    // 6) Promoción
    await Promocion.insertMany([
      {
        lugarId: saltenasCentro._id,
        platoId: saltenaCarne._id,
        titulo: "Promo desayuno paceño",
        descripcion: "2 salteñas de carne + jugo de naranja.",
        precioPromo: 18,
        descuentoPorcentaje: 10,
        tipo: "combo",
        fechaInicio: new Date("2025-01-05T00:00:00Z"),
        fechaFin: new Date("2025-01-31T23:59:59Z"),
        activa: true
      }
    ]);

    // 7) Sponsored placement
    await SponsoredPlacement.insertMany([
      {
        lugarId: saltenasCentro._id,
        posicion: "home_top",
        fechaInicio: new Date("2025-01-10T00:00:00Z"),
        fechaFin: new Date("2025-02-10T23:59:59Z"),
        activo: true,
        peso: 10
      }
    ]);

    console.log("Seed completado.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error en seed:", err);
    process.exit(1);
  }
}

seed();
