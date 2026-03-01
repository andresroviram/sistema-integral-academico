/**
 * Componente InputText
 * -------------------
 * Campo de texto reutilizable que acepta un label, valor, manejador de cambio
 * y atributos de accesibilidad.
 *
 * Props:
 *  - id        : Identificador único del input (vincula el <label>).
 *  - label     : Texto visible sobre el campo.
 *  - type      : Tipo de input (default "text"). Puede ser "email", "text", etc.
 *  - value     : Valor controlado del input.
 *  - onChange  : Función que se ejecuta cuando el usuario escribe.
 *  - placeholder : Texto de ayuda dentro del campo.
 *  - required  : Indica si el campo es obligatorio.
 */

import PropTypes from "prop-types";
import "./Input.css";

const InputText = ({
	id,
	label,
	type = "text",
	value,
	onChange,
	placeholder = "",
	required = false,
}) => {
	return (
		/* Contenedor semántico del campo */
		<div className="input-group">
			{/* Etiqueta accesible: htmlFor vincula el label con el input por su id */}
			<label htmlFor={id} className="input-label">
				{label}
				{required && (
					<span className="required-mark" aria-hidden="true">
						{" "}
						*
					</span>
				)}
			</label>

			<input
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className="input-field"
				/* aria-label redundante sólo cuando no hay label visible */
				aria-label={label}
				aria-required={required}
				autoComplete={type === "email" ? "email" : "on"}
			/>
		</div>
	);
};

/* Validación de tipos de props para facilitar la detección de errores */
InputText.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
};

export default InputText;
