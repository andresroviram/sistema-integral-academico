/**
 * Toast.jsx
 * ---------
 * Notificación flotante auto-descartable.
 *
 * Props:
 *  - message  : Texto del mensaje a mostrar.
 *  - type     : "success" | "error" | "info" | "warning"  (por defecto "info").
 *  - onClose  : Callback que se llama al cerrarse (para actualizar el estado padre).
 *  - duration : Milisegundos antes del auto-descarte (por defecto 4000 ms).
 */

import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";

/* Mapa de íconos por tipo de alerta */
const ICON_MAP = {
	success: "✅",
	error: "❌",
	info: "ℹ️",
	warning: "⚠️",
};

const Toast = ({ message, type = "info", onClose, duration = 4000 }) => {
	/* Auto-descarte: se dispara un temporizador al montar y se limpia al desmontar */
	const handleClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	useEffect(() => {
		const timer = setTimeout(handleClose, duration);
		return () => clearTimeout(timer); // limpia si el componente se desmonta antes
	}, [handleClose, duration]);

	return (
		/* role="alert" → lector de pantalla anuncia el mensaje automáticamente */
		<div className={`toast toast-${type}`} role="alert" aria-live="assertive">
			{/* Ícono */}
			<span className="toast-icon" aria-hidden="true">
				{ICON_MAP[type] ?? "ℹ️"}
			</span>

			{/* Texto del mensaje */}
			<span className="toast-message">{message}</span>

			{/* Botón de cierre manual */}
			<button
				type="button"
				className="toast-close"
				onClick={handleClose}
				aria-label="Cerrar notificación"
			>
				×
			</button>
		</div>
	);
};

Toast.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["success", "error", "info", "warning"]),
	onClose: PropTypes.func.isRequired,
	duration: PropTypes.number,
};

export default Toast;
