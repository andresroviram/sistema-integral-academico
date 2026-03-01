/**
 * Componente Button
 * -----------------
 * Botón reutilizable con soporte para variantes visuales.
 *
 * Props:
 *  - children  : Texto o contenido del botón.
 *  - type      : Tipo HTML del botón: "submit" | "button" | "reset" (default "button").
 *  - onClick   : Función opcional para manejar el click.
 *  - variant   : Estilo visual: "primary" (azul) | "secondary" (contorno).
 *  - disabled  : Deshabilita el botón cuando es true.
 *  - ariaLabel : Descripción para lectores de pantalla cuando el texto no sea suficiente.
 */

import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
	children,
	type = "button",
	onClick,
	variant = "primary",
	disabled = false,
	ariaLabel,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			/* La clase dinámica aplica el estilo según la variante recibida */
			className={`btn btn-${variant}`}
			aria-label={ariaLabel || undefined}
			/* aria-disabled refleja el estado deshabilitado para tecnología asistiva */
			aria-disabled={disabled}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf(["submit", "button", "reset"]),
	onClick: PropTypes.func,
	variant: PropTypes.oneOf(["primary", "secondary"]),
	disabled: PropTypes.bool,
	ariaLabel: PropTypes.string,
};

export default Button;
