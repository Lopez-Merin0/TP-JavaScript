// Lopez_Maria.js - Maria Fernanda Lopez Merino
// Sistema de Gestión de Biblioteca

// Punto 1: Estructura de datos principales para la biblioteca

// Lista de libros disponibles, organizados por saga o autor
const libros = [
  // Los Juegos del Hambre (Suzanne Collins)
  { id: 1, titulo: "Los Juegos del Hambre", autor: "Suzanne Collins", anio: 2008, genero: "Distopía", disponible: true },
  { id: 2, titulo: "En Llamas", autor: "Suzanne Collins", anio: 2009, genero: "Distopía", disponible: true },
  { id: 3, titulo: "Sinsajo", autor: "Suzanne Collins", anio: 2010, genero: "Distopía", disponible: true },

  // Bridgerton (Julia Quinn)
  { id: 4, titulo: "El Duque y Yo", autor: "Julia Quinn", anio: 2000, genero: "Romance Histórico", disponible: true },
  { id: 5, titulo: "El Vizconde que me Amó", autor: "Julia Quinn", anio: 2000, genero: "Romance Histórico", disponible: true },
  { id: 6, titulo: "Te Daría el Mundo", autor: "Julia Quinn", anio: 2001, genero: "Romance Histórico", disponible: true },
  { id: 7, titulo: "Cuando un Duque se Enamora", autor: "Julia Quinn", anio: 2001, genero: "Romance Histórico", disponible: true },

  // Maze Runner (James Dashner)
  { id: 8, titulo: "El Corredor del Laberinto", autor: "James Dashner", anio: 2009, genero: "Ciencia Ficción", disponible: true },
  { id: 9, titulo: "Prueba de Fuego", autor: "James Dashner", anio: 2010, genero: "Ciencia Ficción", disponible: true },
  { id: 10, titulo: "La Cura Mortal", autor: "James Dashner", anio: 2011, genero: "Ciencia Ficción", disponible: true }
];

// Lista de usuarios registrados en el sistema con sus libros prestados (vacíos inicialmente)
const usuarios = [
  { id: 1, nombre: "Maria Lopez", email: "maria.lopez@gmail.com", librosPrestados: [] },
  { id: 2, nombre: "Chimki Merino", email: "maria.merino@gmail.com", librosPrestados: [] },
  { id: 3, nombre: "Larry Oceguera", email: "larry.oc@email.com", librosPrestados: [] },
  { id: 4, nombre: "Wendy Lambur", email: "wendy.lam@gmail.com", librosPrestados: [] },
  { id: 5, nombre: "Fer Medrano", email: "fer.medrano@gmail.com", librosPrestados: [] }
];

// ------------------------------
// Punto 2: Funciones para gestionar libros en la biblioteca

// Agrega un nuevo libro al arreglo 'libros' con sus datos y disponible por default
function agregarLibro(id, titulo, autor, anio, genero) {
  libros.push({ id, titulo, autor, anio, genero, disponible: true });
  alert(`Libro "${titulo}" agregado correctamente\n\nPresiona ACEPTAR para continuar`);
}

// Busca libros según un criterio y valor; puede ser por título, autor, género, etc.
// Retorna un arreglo con los libros encontrados y muestra un alert con los resultados
function buscarLibro(criterio, valor) {
  const resultado = libros.filter(libro => libro[criterio].toString().toLowerCase().includes(valor.toLowerCase()));
  
  if (resultado.length === 0) {
    alert("No se encontraron libros que coincidan con la busqueda.\n\nPresiona ACEPTAR para continuar");
  } else {
    let mensaje = "Libros encontrados:\n";
    resultado.forEach(libro => {
      mensaje += `${libro.titulo} - ${libro.autor} (${libro.anio})\n`;
    });
    alert(mensaje + "\nPresiona ACEPTAR para continuar");
  }
  
  return resultado;
}

// Ordena los libros por título (alfabéticamente) o por año (de menor a mayor)
// Usa el método de burbuja 
// Luego muestra el listado ordenado en un alert y devuelve el arreglo ordenado
function ordenarLibros(criterio) {
  let librosOrdenados = [...libros]; // Copia para no modificar original

  for (let i = 0; i < librosOrdenados.length - 1; i++) {
    for (let j = 0; j < librosOrdenados.length - 1 - i; j++) {
      if (criterio === "titulo") {
        if (librosOrdenados[j].titulo.toLowerCase() > librosOrdenados[j + 1].titulo.toLowerCase()) {
          // Intercambia posiciones para ordenar alfabéticamente
          [librosOrdenados[j], librosOrdenados[j + 1]] = [librosOrdenados[j + 1], librosOrdenados[j]];
        }
      } else if (criterio === "anio") {
        if (librosOrdenados[j].anio > librosOrdenados[j + 1].anio) {
          // Intercambia posiciones para ordenar por año ascendente
          [librosOrdenados[j], librosOrdenados[j + 1]] = [librosOrdenados[j + 1], librosOrdenados[j]];
        }
      }
    }
  }

  let mensaje = `Libros ordenados por ${criterio}:\n`;
  librosOrdenados.forEach(libro => {
    mensaje += `${libro.titulo} - ${libro.anio}\n`;
  });
  alert(mensaje + "\nPresiona ACEPTAR para continuar");
  
  return librosOrdenados;
}

// Borra un libro según su ID, previa confirmación del usuario
// Si el libro no existe, informa que no se encontró
function borrarLibro(id) {
  const index = libros.findIndex(libro => libro.id === id);
  if (index !== -1) {
    const confirmar = confirm(`¿Seguro que quieres eliminar el libro "${libros[index].titulo}"?`);
    if (confirmar) {
      const eliminado = libros.splice(index, 1);
      alert(`Libro "${eliminado[0].titulo}" eliminado correctamente\n\nPresiona ACEPTAR para continuar`);
    } else {
      alert("Accion cancelada.\n\nPresiona OK para continuar");
    }
  } else {
    alert("No se encontro el libro con ese ID \n\nPresiona ACEPTAR para continuar");
  }
}

// ------------------------------
// Punto 3: Gestión de usuarios del sistema

// Registra un nuevo usuario con nombre y email, asignándole un ID único automáticamente
// Limpia espacios y pone el email en minúsculas para evitar duplicados raros
function registrarUsuario(nombre, email) {
  const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  usuarios.push({ id: nuevoId, nombre: nombre.trim(), email: email.toLowerCase().trim(), librosPrestados: [] });
  alert(`Usuario "${nombre}" registrado correctamente \n\nPresiona ACEPTAR para continuar`);
}

// Muestra todos los usuarios registrados en un alert resumido y más detalle en consola
function mostrarTodosLosUsuarios() {
  let mensaje = `Lista de usuarios (${usuarios.length}):\n`;
  usuarios.forEach(usuario => {
    mensaje += `ID: ${usuario.id}, Nombre: ${usuario.nombre}, Libros Prestados: [${usuario.librosPrestados.join(", ")}]\n`;
  });
  alert(mensaje + "\nRevisa la consola para mas detalles");
  
  console.log("Usuarios:");
  usuarios.forEach(usuario => {
    console.log(`ID: ${usuario.id}, Nombre: ${usuario.nombre}, Email: ${usuario.email}, Libros Prestados: [${usuario.librosPrestados.join(", ")}]`);
  });
  return usuarios;
}

// Busca un usuario por email (sin importar mayúsculas/minúsculas)
// Muestra alert con resultado y devuelve el usuario o undefined si no existe
function buscarUsuario(email) {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (usuario) {
    alert(`Usuario encontrado:\nNombre: ${usuario.nombre}\nEmail: ${usuario.email}\n\nPresiona ACEPTAR para continuar`);
  } else {
    alert("No se encontro ningun usuario con esa direccion de email.\n\nPresiona ACEPTAR para continuar");
  }
  return usuario;
}

// Elimina un usuario según nombre y email, previa confirmación
// Evita borrar accidentalmente y alerta si no se encuentra al usuario
function borrarUsuario(nombre, email) {
  const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase() && u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    const confirmar = confirm(`¿Seguro que quieres eliminar al usuario "${usuarios[index].nombre}"?`);
    if (confirmar) {
      const eliminado = usuarios.splice(index, 1);
      alert(`Usuario "${eliminado[0].nombre}" eliminado correctamente \n\nPresiona ACEPTAR para continuar`);
    } else {
      alert("Accion cancelada.\n\nPresiona ACEPTAR para continuar");
    }
  } else {
    alert("No se encontro el usuario con esos datos \n\nPresiona ACEPTAR para continuar");
  }
}

// ------------------------------
// Punto 4: Sistema de préstamos de libros

// Presta un libro a un usuario, verificando que ambos existan y que el libro esté disponible
function prestarLibro(idLibro, idUsuario) {
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);

  // Validaciones para evitar errores y malas experiencias
  if (!libro) {
    alert("No se encontro el libro con ese ID \n\nPresiona ACEPTAR para continuar");
    return;
  }
  if (!usuario) {
    alert("No se encontro el usuario con ese ID \n\nPresiona ACEPTAR para continuar");
    return;
  }
  if (!libro.disponible) {
    alert(`El libro "${libro.titulo}" no esta disponible para prestamo \n\nPresiona ACEPTAR para continuar`);
    return;
  }

  // Actualiza estado y registra préstamo
  libro.disponible = false;
  usuario.librosPrestados.push(libro.id);
  alert(`El libro "${libro.titulo}" fue prestado a ${usuario.nombre} \n\nPresiona ACEPTAR para continuar`);
}

// Devuelve un libro prestado por un usuario, verificando que exista y esté registrado el préstamo
function devolverLibro(idLibro, idUsuario) {
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);

  // Validaciones para asegurar consistencia y buen control
  if (!libro) {
    alert("No se encontro el libro con ese ID \n\nPresiona ACEPTAR para continuar");
    return;
  }
  if (!usuario) {
    alert("No se encontro el usuario con ese ID \n\nPresiona ACEPTAR para continuar");
    return;
  }

  // Busca el libro dentro de los prestados del usuario
  const indexPrestado = usuario.librosPrestados.indexOf(idLibro);
  if (indexPrestado === -1) {
    alert(`El usuario "${usuario.nombre}" no tiene prestado ese libro \n\nPresiona ACEPTAR para continuar`);
    return;
  }

  // Marca el libro como disponible y elimina el préstamo del usuario
  libro.disponible = true;
  usuario.librosPrestados.splice(indexPrestado, 1);
  alert(`El libro "${libro.titulo}" fue devuelto por ${usuario.nombre} \n\nPresiona ACEPTAR para continuar`);
}

// ------------------------------
// Punto 5: Generar un reporte completo de libros usando map, filter y reduce

function generarReporteLibros() {
  // Total de libros en la biblioteca
  const totalLibros = libros.length;
  
  // Cantidad de libros que están prestados (no disponibles)
  const librosPrestados = libros.filter(libro => !libro.disponible).length;

  // Cuenta cuántos libros hay por cada género usando reduce para acumular en un objeto
  const librosPorGenero = libros.reduce((acc, libro) => {
    acc[libro.genero] = (acc[libro.genero] || 0) + 1;
    return acc;
  }, {});

  // Encuentra el libro más antiguo comparando años con reduce
  const libroMasAntiguo = libros.reduce((min, libro) => libro.anio < min.anio ? libro : min, libros[0]);
  
  // Encuentra el libro más nuevo comparando años con reduce
  const libroMasNuevo = libros.reduce((max, libro) => libro.anio > max.anio ? libro : max, libros[0]);

  // Arma un mensaje bonito para mostrar en alerta
  let mensaje = "Reporte de libros:\n";
  mensaje += `- Total de libros: ${totalLibros}\n`;
  mensaje += `- Libros prestados: ${librosPrestados}\n`;
  mensaje += "- Libros por genero:\n";
  for (const genero in librosPorGenero) {
    mensaje += `  * ${genero}: ${librosPorGenero[genero]}\n`;
  }
  mensaje += `- Libro mas antiguo: "${libroMasAntiguo.titulo}" (${libroMasAntiguo.anio})\n`;
  mensaje += `- Libro más nuevo: "${libroMasNuevo.titulo}" (${libroMasNuevo.anio})\n`;

  alert(mensaje + "\nPresiona ACEPTAR para continuar");
}

// ------------------------------
// Punto 6: Filtrar libros cuyos títulos tienen más de una palabra y sólo contienen letras (sin números ni símbolos)

function librosConPalabrasEnTitulo() {
  const resultado = libros.filter(libro => {
    const palabras = libro.titulo.trim().split(" ");
    // El título debe tener más de una palabra
    if (palabras.length <= 1) return false;
    // Cada palabra debe contener solo letras (mayúsculas, minúsculas y letras con acento o ñ)
    return palabras.every(palabra => /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(palabra));
  }).map(libro => libro.titulo);

  alert("Libros con titulos que tienen mas de una palabra (solo letras):\n" + resultado.join("\n") + "\n\nPresiona ACEPTAR para continuar");
  return resultado;
}

// ------------------------------
// Punto 7: Cálculos estadísticos con Math y funciones de agregación

function calcularEstadisticas() {
  const totalLibros = libros.length;

  // Suma de los años de publicación de todos los libros
  const sumaAnios = libros.reduce((acc, libro) => acc + libro.anio, 0);

  // Promedio de años redondeado al entero más cercano
  const promedioAnios = Math.round(sumaAnios / totalLibros);

  // Calcula la frecuencia con la que aparece cada año de publicación
  const frecuenciaAnios = libros.reduce((acc, libro) => {
    acc[libro.anio] = (acc[libro.anio] || 0) + 1;
    return acc;
  }, {});

  // Determina la moda (el año más frecuente)
  let moda = null;
  let maxFrecuencia = 0;
  for (const anio in frecuenciaAnios) {
    if (frecuenciaAnios[anio] > maxFrecuencia) {
      maxFrecuencia = frecuenciaAnios[anio];
      moda = anio;
    }
  }

  // Año más antiguo y más nuevo usando Math con spread
  const anioMasAntiguo = Math.min(...libros.map(libro => libro.anio));
  const anioMasNuevo = Math.max(...libros.map(libro => libro.anio));
  const diferencia = anioMasNuevo - anioMasAntiguo;

  // Reporte con estadísticas clave
  let mensaje = "Estadisticas de libros:\n";
  mensaje += `- Promedio de anios: ${promedioAnios}\n`;
  mensaje += `- Anio mas frecuente: ${moda}\n`;
  mensaje += `- Diferencia entre libro mas antiguo y mas nuevo: ${diferencia} anios\n`;

  alert(mensaje + "\nPresiona ACEPTAR para continuar");
}

// ------------------------------
// Punto 8: Normalizar datos para mantener uniformidad en títulos, autores y correos

function normalizarDatos() {
  // Convierte los títulos a mayúsculas y limpia espacios de los autores
  libros.forEach(libro => {
    libro.titulo = libro.titulo.toUpperCase();   // Estilo catálogo de biblioteca
    libro.autor = libro.autor.trim();             // Elimina espacios innecesarios
  });

  // Convierte los correos de los usuarios a minúsculas
  usuarios.forEach(usuario => {
    usuario.email = usuario.email.toLowerCase();  
  });

  alert("Datos normalizados correctamente \n\nPresiona ACEPTAR para continuar");
}
// ------------------------------
// Punto 9: Menú principal para interactuar con el sistema usando prompt y switch

function menuPrincipal() {
  let opcion;

  do {
    opcion = prompt(
      "Sistema Biblioteca - Chimki Library\n" +
      "1. Agregar Libro\n" +
      "2. Buscar Libro\n" +
      "3. Ordenar Libros\n" +
      "4. Borrar Libro\n" +
      "5. Registrar Usuario\n" +
      "6. Mostrar Usuarios\n" +
      "7. Buscar Usuario\n" +
      "8. Borrar Usuario\n" +
      "9. Prestar Libro\n" +
      "10. Devolver Libro\n" +
      "11. Generar Reporte de Libros\n" +
      "12. Mostrar Libros con Títulos Especiales\n" +
      "13. Calcular Estadisticas\n" +
      "14. Normalizar Datos\n" +
      "15. Salir\n" +
      "Ingrese el numero de la opcion:"
    );

    switch (opcion) {
      case "1":
        // Agregar libro
        const idAgregar = parseInt(prompt("Ingrese ID del libro:"));
        const tituloAgregar = prompt("Ingrese titulo del libro:");
        const autorAgregar = prompt("Ingrese autor del libro:");
        const anioAgregar = parseInt(prompt("Ingrese anio de publicacion:"));
        const generoAgregar = prompt("Ingrese genero del libro:");
        agregarLibro(idAgregar, tituloAgregar, autorAgregar, anioAgregar, generoAgregar);
        break;

      case "2":
        // Buscar libro por criterio
        const criterioBusqueda = prompt("Buscar por (titulo/autor/genero):").toLowerCase();
        const valorBusqueda = prompt("Ingrese el valor a buscar:");
        buscarLibro(criterioBusqueda, valorBusqueda);
        break;

      case "3":
        // Ordenar libros por título o año
        const criterioOrden = prompt("Ordenar por (titulo/anio):").toLowerCase();
        ordenarLibros(criterioOrden);
        break;

      case "4":
        // Borrar libro por ID
        const idBorrar = parseInt(prompt("Ingrese ID del libro a eliminar:"));
        borrarLibro(idBorrar);
        break;

      case "5":
        // Registrar nuevo usuario
        const nombreUsuario = prompt("Ingrese nombre del usuario:");
        const emailUsuario = prompt("Ingrese email del usuario:");
        registrarUsuario(nombreUsuario, emailUsuario);
        break;

      case "6":
        // Mostrar todos los usuarios
        mostrarTodosLosUsuarios();
        break;

      case "7":
        // Buscar usuario por email
        const emailBuscar = prompt("Ingrese email del usuario a buscar:");
        buscarUsuario(emailBuscar);
        break;

      case "8":
        // Borrar usuario por nombre y email
        const nombreBorrar = prompt("Ingrese nombre del usuario a eliminar:");
        const emailBorrar = prompt("Ingrese email del usuario a eliminar:");
        borrarUsuario(nombreBorrar, emailBorrar);
        break;

      case "9":
        // Prestar libro a un usuario
        const idLibroPrestar = parseInt(prompt("Ingrese ID del libro a prestar:"));
        const idUsuarioPrestar = parseInt(prompt("Ingrese ID del usuario:"));
        prestarLibro(idLibroPrestar, idUsuarioPrestar);
        break;

      case "10":
        // Devolver libro por parte de un usuario
        const idLibroDevolver = parseInt(prompt("Ingrese ID del libro a devolver:"));
        const idUsuarioDevolver = parseInt(prompt("Ingrese ID del usuario:"));
        devolverLibro(idLibroDevolver, idUsuarioDevolver);
        break;

      case "11":
        // Generar reporte estadístico de libros
        generarReporteLibros();
        break;

      case "12":
        // Mostrar libros con títulos especiales (más de una palabra y solo letras)
        librosConPalabrasEnTitulo();
        break;

      case "13":
        // Calcular estadísticas generales de los libros
        calcularEstadisticas();
        break;

      case "14":
        // Normalizar datos de títulos, autores y correos
        normalizarDatos();
        break;

      case "15":
        alert("Bye Bye, regrese pronto a Chimki Library");
        break;

      default:
        alert("Opcion no valida, intenta una de las opciones disponibles");
    }

  } while (opcion !== "15"); 
}

menuPrincipal();
