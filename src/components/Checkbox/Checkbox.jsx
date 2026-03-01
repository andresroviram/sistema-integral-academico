/**
 * Componente Checkbox
 * -------------------
 * Casilla de verificación reutilizable y accesible.
 *
 * Props:
 *  - id       : Identificador único (vincula label ↔ input).
 *  - label    : Texto descriptivo que aparece junto al checkbox.
 *  - checked  : Estado controlado (true/false).
 *  - onChange : Función que actualiza el estado en el padre.
 */

import PropTypes from "prop-types";
import "./Checkbox.css";

const Checkbox = ({ id, label, checked, onChange }) => {
	return (
		/* role="group" opcional; aquí usamos el vínculo htmlFor como método accesible */
		<div className="checkbox-group">
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={onChange}
				className="checkbox-input"
				/* aria-checked refleja el estado para lectores de pantalla */
				aria-checked={checked}
			/>
			{/* htmlFor debe coincidir con el id del input para garantizar accesibilidad */}
			<label htmlFor={id} className="checkbox-label">
				{label}
			</label>
		</div>
	);
};

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default Checkbox;
