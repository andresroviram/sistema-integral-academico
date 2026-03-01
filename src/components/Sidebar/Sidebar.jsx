/**
 * Sidebar.jsx
 * -----------
 * Barra lateral de navegación del dashboard.
 * Soporta modo expandido y colapsado (solo iconos).
 *
 * Props:
 *  - activeItem : string — clave del item activo
 *  - onNavigate : función — callback al hacer clic
 *  - collapsed  : boolean — true = modo icono estrecho
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

const Sidebar = ({ activeItem, onNavigate, collapsed = false }) => {
	return (
		<nav
			className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}
			aria-label="Menú principal"
		>
			{/* ── Logo ── */}
			<div className="sidebar-logo">
				<div className="sidebar-logo-icon" aria-hidden="true">
					🎓
				</div>
				{!collapsed && (
					<div className="sidebar-logo-text">
						<span className="sidebar-logo-title">Sistema Integral</span>
						<span className="sidebar-logo-subtitle">Académico</span>
					</div>
				)}
			</div>

			{/* ── Navegación ── */}
			<ul className="sidebar-nav">
				{NAV_ITEMS.map((item) => (
					<li key={item.key}>
						<button
							type="button"
							className={`sidebar-nav-item${activeItem === item.key ? " active" : ""}`}
							onClick={() => onNavigate(item.key)}
							aria-current={activeItem === item.key ? "page" : undefined}
							title={collapsed ? item.label : undefined}
						>
							<span className="sidebar-nav-icon" aria-hidden="true">
								{item.icon}
							</span>
							{!collapsed && (
								<span className="sidebar-nav-label">{item.label}</span>
							)}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

Sidebar.propTypes = {
	activeItem: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
	collapsed: PropTypes.bool,
};

export default Sidebar;
