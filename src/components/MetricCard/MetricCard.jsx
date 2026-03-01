/**
 * MetricCard.jsx
 * --------------
 * Tarjeta de métrica reutilizable para el dashboard.
 * Muestra un valor numérico destacado con su etiqueta e ícono.
 *
 * Props:
 *  - label : Texto descriptivo de la métrica (ej. "Estudiantes Registrados").
 *  - value : Valor numérico a destacar (ej. 1653).
 *  - icon  : Emoji o símbolo representativo.
 */

import PropTypes from "prop-types";

const MetricCard = ({ label, value, icon }) => {
	return (
		/* article semántico: cada tarjeta es una pieza de contenido independiente */
		<article className="metric-card">
			<div className="metric-card-body">
				<div>
					{/* Etiqueta de la métrica */}
					<p className="metric-label">{label}</p>
					{/* Valor principal en tipografía grande */}
					<p className="metric-value">
						{/* Formatea el número con separador de miles */}
						{Number(value).toLocaleString("es-CO")}
					</p>
				</div>
				{/* Ícono decorativo en la esquina derecha */}
				<div className="metric-icon" aria-hidden="true">
					{icon}
				</div>
			</div>
		</article>
	);
};

MetricCard.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	icon: PropTypes.string.isRequired,
};

export default MetricCard;
