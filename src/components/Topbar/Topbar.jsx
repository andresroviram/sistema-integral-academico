/**
 * Topbar.jsx
 * ----------
 * Barra de navegación superior del dashboard.
 * Muestra el título de la vista, acciones rápidas (tema, notificaciones)
 * y la información del usuario autenticado.
 *
 * Props:
 *  - title        : Título de la sección activa (ej. "Dashboard").
 *  - userName     : Nombre del usuario (ej. "Carlos Pérez").
 *  - userRole     : Rol del usuario (ej. "Administrador").
 *  - onMenuToggle : Función para mostrar/ocultar el sidebar en móvil.
 *  - notifCount   : Número de notificaciones sin leer.
 */

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Topbar = ({
	title,
	userName,
	userRole,
	onMenuToggle,
	notifCount = 0,
}) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		/* Simulación de cierre de sesión: en producción aquí
		   se limpiaría el token/sesión antes de redirigir. */
		navigate("/");
	};

	return (
		<header className="topbar">
			{/* ── Lado izquierdo: botón hamburguesa + título ───────────────────── */}
			<div className="topbar-left">
				{/* Botón para colapsar/expandir el sidebar en pantallas pequeñas */}
				<button
					type="button"
					className="topbar-menu-btn"
					onClick={onMenuToggle}
					aria-label="Abrir o cerrar menú lateral"
				>
					☰
				</button>
				<h1 className="topbar-title">{title}</h1>
			</div>

			{/* ── Lado derecho: modo oscuro, notificaciones y perfil ──────────── */}
			<div className="topbar-right">
				{/* Botón de alternancia de tema (decorativo en esta versión) */}
				<button
					type="button"
					className="topbar-icon-btn"
					aria-label="Alternar modo oscuro"
				>
					🌙
				</button>

				{/* Campana de notificaciones con badge de conteo */}
				<button
					type="button"
					className="topbar-icon-btn topbar-notif"
					aria-label={`${notifCount} notificaciones sin leer`}
				>
					🔔{/* Solo muestra el badge si hay notificaciones */}
					{notifCount > 0 && (
						<span className="notif-badge" aria-hidden="true">
							{notifCount}
						</span>
					)}
				</button>

				{/* Información del usuario autenticado */}
				<div className="topbar-user" title={`${userName} — ${userRole}`}>
					<div className="topbar-user-info">
						<span className="topbar-user-name">{userName}</span>
						<span className="topbar-user-role">{userRole}</span>
					</div>
					{/* Avatar con iniciales del usuario */}
					<div className="topbar-avatar" aria-hidden="true">
						{userName.charAt(0)}
					</div>
				</div>
				{/* Botón de cerrar sesión */}
				<button
					type="button"
					className="topbar-logout-btn"
					onClick={handleLogout}
					aria-label="Cerrar sesión"
					title="Cerrar sesión"
				>
					🚪 Cerrar sesión
				</button>
			</div>
		</header>
	);
};

Topbar.propTypes = {
	title: PropTypes.string.isRequired,
	userName: PropTypes.string.isRequired,
	userRole: PropTypes.string.isRequired,
	onMenuToggle: PropTypes.func.isRequired,
	notifCount: PropTypes.number,
};

export default Topbar;
