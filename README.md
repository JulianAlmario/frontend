# 📚 Biblioteca Digital - Frontend Astro

Una interfaz moderna y atractiva para tu sistema de gestión de biblioteca, construida con Astro, React y Tailwind CSS.

## ✨ Características

- 🎨 **Diseño Eye-Catching**: Interfaz moderna con gradientes, animaciones y efectos visuales
- 📱 **Responsive Design**: Totalmente adaptable a dispositivos móviles y tablets
- 🔐 **Sistema de Autenticación**: Login y registro de usuarios integrados
- 📚 **Catálogo de Libros**: Exploración visual de libros con imágenes generadas por IA
- 🔍 **Búsqueda y Filtros**: Encuentra libros por título, autor o género
- 📊 **Dashboard Personal**: Panel de control para usuarios y administradores
- ⚡ **Rendimiento Óptimo**: Construido con Astro para máxima velocidad

## 🚀 Tecnologías Utilizadas

- **Astro**: Framework moderno para sitios web estáticos
- **React**: Componentes interactivos
- **Tailwind CSS**: Estilos modernos y utility-first
- **TypeScript**: Seguridad de tipos
- **Lucide Icons**: Iconografía elegante

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre el navegador**
   Visita `http://localhost:4321`

## 🎯 Páginas Principales

### 🏠 Inicio
- Hero section con animaciones
- Características destacadas
- Libros populares
- Diseño atractivo con gradientes

### 🔐 Autenticación
- **Login**: `/login`
- **Registro**: `/register`
- Formularios con validación
- Integración con backend API

### 📚 Catálogo de Libros
- **Catálogo completo**: `/libros`
- Grid responsivo de libros
- Búsqueda y filtros por género
- Información detallada de cada libro

### 📊 Dashboard
- **Panel de control**: `/dashboard`
- Estadísticas personales
- Gestión de reservas
- Acceso según roles de usuario

## 🔧 Configuración del Backend

Asegúrate de que tu backend esté ejecutándose en `http://localhost:3000`. El frontend está configurado para conectarse a esta URL por defecto.

### Variables de Entorno
Crea un archivo `.env` si necesitas cambiar la URL del backend:
```
PUBLIC_API_URL=http://localhost:3000/api
```

## 🎨 Estilos y Diseño

### Paleta de Colores
- **Primario**: Azul cielo (#0ea5e9)
- **Secundario**: Púrpura (#d946ef)
- **Acento**: Ámbar (#f59e0b)
- **Fondo**: Gradiente oscuro con púrpura

### Tipografías
- **Inter**: Para texto general
- **Lexend**: Para títulos y display

### Efectos Visuales
- Glass morphism en tarjetas
- Animaciones suaves de entrada
- Gradientes dinámicos
- Hover effects modernos

## 📱 Responsive Design

El diseño se adapta perfectamente a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🔒 Seguridad

- Autenticación basada en JWT
- Validación de formularios
- Protección de rutas privadas
- Manejo seguro de tokens

## 🚀 Despliegue

### Construir para producción
```bash
npm run build
```

### Vista previa de producción
```bash
npm run preview
```

### Despliegue recomendado
- **Vercel**: Despliegue automático con Git
- **Netlify**: Hosting gratuito para proyectos open source
- **Astro Studio**: Hosting oficial de Astro

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 🎨 Inspiración

Diseño inspirado en las mejores prácticas de UX/UI modernas:
- Glass morphism design
- Aurora gradients
- Floating animations
- Modern minimalism

---

**¡Disfruta explorando la biblioteca digital! 📖✨**
