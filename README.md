# Sistema Integral Académico

Aplicación web de gestión académica desarrollada con **React 19 + Vite 7**. Permite administrar estudiantes, docentes, grupos, materias y calificaciones desde un panel de administración moderno.

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2.0 | UI y gestión de estado |
| Vite | 7.x | Bundler y servidor de desarrollo |
| React Router DOM | 7.x | Navegación SPA |
| Recharts | 3.x | Gráficas de barras y dona |
| PropTypes | 15.x | Validación de props en runtime |

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## Rutas

| Ruta | Vista | Descripción |
|---|---|---|
| `/` | `LoginForm` | Inicio de sesión |
| `/register` | `RegisterForm` | Registro de nuevo usuario |
| `/reset` | `ResetPassword` | Recuperación de contraseña |
| `/dashboard` | `Dashboard` | Panel principal de administración |

### Credenciales de demo

```
Correo:     admin@academia.edu
Contraseña: Admin123*
```

---

## Estructura del proyecto

```
src/
├── App.jsx                         # Declaración de rutas (React Router)
├── main.jsx                        # Punto de entrada — BrowserRouter
│
├── pages/                          # Vistas completas (una carpeta por página)
│   ├── LoginForm/
│   │   ├── LoginForm.jsx
│   │   └── LoginForm.css
│   ├── RegisterForm/
│   │   ├── RegisterForm.jsx
│   │   └── RegisterForm.css
│   ├── ResetPassword/
│   │   ├── ResetPassword.jsx
│   │   └── ResetPassword.css
│   └── Dashboard/
│       ├── Dashboard.jsx
│       └── Dashboard.css
│
└── components/                     # Componentes puros reutilizables
    ├── Button/
    │   ├── Button.jsx
    │   └── Button.css
    ├── Checkbox/
    │   ├── Checkbox.jsx
    │   └── Checkbox.css
    ├── DatePicker/
    │   ├── DatePicker.jsx
    │   └── DatePicker.css
    ├── InputText/
    │   ├── InputText.jsx
    │   └── Input.css
    ├── InputPassword/
    │   ├── InputPassword.jsx
    │   └── Input.css
    ├── Sidebar/
    │   └── Sidebar.jsx
    ├── Topbar/
    │   └── Topbar.jsx
    ├── MetricCard/
    │   └── MetricCard.jsx
    └── Toast/
        └── Toast.jsx
```

---

## Pantallas

### Login
Formulario de autenticación con diseño split-screen. Valida credenciales contra un usuario predeterminado de demo. Errores diferenciados por usuario no encontrado o contraseña incorrecta.

### Registro
Formulario de registro con campos: nombre completo, correo, número de identificación, fecha de nacimiento, contraseña y confirmación.

### Recuperar contraseña
Pantalla centrada para solicitar el restablecimiento de contraseña por correo electrónico.

### Dashboard
Panel principal con:
- **4 tarjetas de métricas**: Estudiantes, Docentes, Materias y Grupos activos.
- **Top 5 mejores alumnos**: tabla con ranking, grupo y puntaje.
- **Promedio por grupo**: barras de progreso horizontales para 9 grupos.
- **Rendimiento académico**: gráfico de barras verticales (Recharts).
- **Distribución por grado**: gráfico de dona (Recharts) con 4 segmentos.
- **Toast** de bienvenida auto-descartable.
- **Botón de cierre de sesión** en la barra superior.

---

## Autor

**Elkis Andrés Rovira Morelo**
GA7-220501096-AA4-EV03 · ADSO 2024 · Fase 3
