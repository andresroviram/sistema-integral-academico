/**
 * Componente DatePicker
 * ---------------------
 * Campo de fecha nativo reutilizable con label accesible.
 *
 * Props:
 *  - id       : Identificador único (vincula label ↔ input).
 *  - label    : Texto del <label> visible.
 *  - value    : Valor controlado en formato "YYYY-MM-DD".
 *  - onChange : Función que actualiza el estado en el padre.
 *  - required : Indica si el campo es obligatorio.
 *  - min      : Fecha mínima permitida (formato "YYYY-MM-DD").
 *  - max      : Fecha máxima permitida (formato "YYYY-MM-DD").
 */

import PropTypes from "prop-types";
import "./DatePicker.css";

const DatePicker = ({
	id,
	label,
	value,
	onChange,
	required = false,
	min,
	max,
}) => {
	return (
		/* Contenedor del grupo label + input, reutiliza misma estructura que InputText */
		<div className="input-group">
			{/* htmlFor vincula el label al input para accesibilidad */}
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
				type="date"
				value={value}
				onChange={onChange}
				required={required}
				min={min}
				max={max}
				className="input-field date-field"
				aria-label={label}
			/>
		</div>
	);
};

DatePicker.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	min: PropTypes.string,
	max: PropTypes.string,
};

export default DatePicker;
