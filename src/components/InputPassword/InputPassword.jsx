/**
 * Componente InputPassword
 * ------------------------
 * Campo de contraseña que extiende InputText con la capacidad de
 * mostrar/ocultar el texto ingresado mediante un botón de alternar.
 *
 * Props:
 *  - id        : Identificador único del input.
 *  - label     : Texto para el <label> del campo.
 *  - value     : Valor controlado de la contraseña.
 *  - onChange  : Función que actualiza el estado en el componente padre.
 *  - placeholder : Texto de ayuda.
 *  - required  : Indica si el campo es obligatorio.
 */

import PropTypes from "prop-types";
import { useState } from "react";
import "./Input.css";

const InputPassword = ({
	id,
	label,
	value,
	onChange,
	placeholder = "",
	required = false,
}) => {
	/* Estado local: controla si la contraseña es visible o no */
	const [showPassword, setShowPassword] = useState(false);

	/**
	 * Alterna entre mostrar texto plano y ocultar la contraseña.
	 * Se usa un botón de tipo "button" para evitar que haga submit del formulario.
	 */
	const toggleVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className="input-group">
			{/* Label accesible vinculado al input mediante htmlFor */}
			<label htmlFor={id} className="input-label">
				{label}
				{required && (
					<span className="required-mark" aria-hidden="true">
						{" "}
						*
					</span>
				)}
			</label>

			{/* Wrapper relativo para posicionar el ícono de ojo */}
			<div className="password-wrapper">
				<input
					id={id}
					/* Si showPassword es true, el tipo cambia a "text" para mostrar el valor */
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className="input-field"
					aria-label={label}
					aria-required={required}
					autoComplete="current-password"
				/>

				{/* Botón para alternar visibilidad — aria-label describe la acción actual */}
				<button
					type="button"
					onClick={toggleVisibility}
					className="toggle-password"
					aria-label={
						showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
					}
				>
					{/* Iconos Unicode simples para no requerir dependencias externas */}
					{showPassword ? "🙈" : "👁️"}
				</button>
			</div>
		</div>
	);
};

InputPassword.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
};

export default InputPassword;
