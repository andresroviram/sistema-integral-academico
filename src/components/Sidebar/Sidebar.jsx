/**
 * Sidebar.jsx
 * -----------
 * Barra lateral de navegación del dashboard.
 * Muestra el logo del sistema y los enlaces de navegación según el rol.
 *
 * Props:
 *  - activeItem : string — clave del item activo (ej. "dashboard")
 *  - onNavigate : función — callback al hacer clic en un item
 */

import PropTypes from "prop-types";

/* ── Definición de las secciones de navegación ──────────────────────────────
 * Cada objeto define: key (identificador), label (texto visible) e icon (emoji/SVG).
 * En un proyecto real los iconos se importarían de lucide-react o similar.
 * ─────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
	{ key: "dashboard", label: "Dashboard", icon: "⊞" },
	{ key: "estudiantes", label: "Estudiantes", icon: "🎓" },
	{ key: "docentes", label: "Docentes", icon: "👥" },
	{ key: "grupos", label: "Grupos y horarios", icon: "📅" },
	{ key: "materias", label: "Materias", icon: "📋" },
	{ key: "calificaciones", label: "Calificaciones", icon: "📊" },
	{ key: "reportes", label: "Reportes", icon: "📈" },
	{ key: "configuraciones", label: "Configuraciones", icon: "⚙️" },
];

const Sidebar = ({ activeItem, onNavigate }) => {
	return (
		<nav className="sidebar" aria-label="Menú principal">
			{/* ── Logo / Identidad del sistema ─────────────────────────────────── */}
			<div className="sidebar-logo">
				<div className="sidebar-logo-icon" aria-hidden="true">
					🎓
				</div>
				<div className="sidebar-logo-text">
					<span className="sidebar-logo-title">Sistema Integral</span>
					<span className="sidebar-logo-subtitle">Académico</span>
				</div>
			</div>

			{/* ── Lista de opciones de navegación ─────────────────────────────── */}
			<nav>
				<ul className="sidebar-nav">
					{NAV_ITEMS.map((item) => (
						<li key={item.key}>
							<button
								type="button"
								/* Aplica clase activa cuando la key coincide con activeItem */
								className={`sidebar-nav-item ${activeItem === item.key ? "active" : ""}`}
								onClick={() => onNavigate(item.key)}
								aria-current={activeItem === item.key ? "page" : undefined}
							>
								<span className="sidebar-nav-icon" aria-hidden="true">
									{item.icon}
								</span>
								<span className="sidebar-nav-label">{item.label}</span>
							</button>
						</li>
					))}
				</ul>
			</nav>
		</nav>
	);
};

Sidebar.propTypes = {
	activeItem: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

export default Sidebar;
