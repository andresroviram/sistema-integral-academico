/**
 * Componente RegisterForm
 * =======================
 * Formulario de registro de nuevo usuario que incluye:
 *   - InputText      → nombre completo, correo electrónico, número de identificación
 *   - DatePicker     → fecha de nacimiento
 *   - InputPassword  → contraseña y confirmación de contraseña
 *   - Button         → "Crear mi cuenta"
 *
 * Comparte el mismo layout split (panel de marca izquierdo + panel de formulario
 * derecho) que LoginForm, reutilizando las clases CSS de LoginForm.css.
 *
 * Gestión de estado:
 *   Un único useState con objeto agrupa todos los campos para facilitar
 *   el envío y reseteo del formulario.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import DatePicker from "../../components/DatePicker/DatePicker";
import InputPassword from "../../components/InputPassword/InputPassword";
/* ── Componentes reutilizables ── */
import InputText from "../../components/InputText/InputText";

/* ── Estilos compartidos del layout y del formulario de registro ── */
import "./RegisterForm.css";

const RegisterForm = () => {
	/* Hook de React Router para navegar a otras rutas */
	const navigate = useNavigate();
	/* ── Estado del formulario ──────────────────────────────────────────────
	 * Cada propiedad corresponde a un campo visible en el formulario.
	 * Se agrupa en un solo objeto para facilitar el envío a una API.
	 * ────────────────────────────────────────────────────────────────────── */
	const [formData, setFormData] = useState({
		fullName: "", // Nombre y apellido del usuario
		email: "", // Correo electrónico
		idNumber: "", // Número de identificación (cédula / pasaporte)
		birthDate: "", // Fecha de nacimiento en formato YYYY-MM-DD
		password: "", // Contraseña elegida
		confirmPwd: "", // Confirmación de la contraseña
	});

	/* Estado de retroalimentación devuelto al usuario tras el submit */
	const [feedback, setFeedback] = useState("");

	/* ── Manejador genérico de cambio para inputs de texto ─────────────────
	 * Recibe el nombre del campo como parámetro y devuelve la función
	 * onChange que actualiza solo ese campo en el estado.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleChange = (field) => (e) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	/* ── Validación y envío del formulario ─────────────────────────────────
	 * Comprueba que todos los campos estén completos y que las contraseñas
	 * coincidan antes de procesar el registro.
	 * En un proyecto real aquí se llamaría a una API de creación de usuario.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleSubmit = (e) => {
		/* Evitar recarga de la página */
		e.preventDefault();

		const { fullName, email, idNumber, birthDate, password, confirmPwd } =
			formData;

		/* Validación: todos los campos son obligatorios */
		if (
			!fullName.trim() ||
			!email.trim() ||
			!idNumber.trim() ||
			!birthDate ||
			!password ||
			!confirmPwd
		) {
			setFeedback("Por favor completa todos los campos obligatorios.");
			return;
		}

		/* Validación: formato de correo electrónico */
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setFeedback("Ingresa un correo electrónico válido.");
			return;
		}

		/* Validación: longitud mínima de contraseña */
		if (password.length < 8) {
			setFeedback("La contraseña debe tener al menos 8 caracteres.");
			return;
		}

		/* Validación: las contraseñas deben coincidir */
		if (password !== confirmPwd) {
			setFeedback("Las contraseñas no coinciden. Verifícalas.");
			return;
		}

		/* Registro exitoso (simulado) */
		setFeedback(`✅ Cuenta creada para ${email}. ¡Bienvenido/a!`);
		console.log("Registro exitoso:", formData);
	};

	/* ── Renderizado ────────────────────────────────────────────────────────
	 * Reutiliza las clases .login-screen, .login-brand y .login-panel
	 * para mantener el mismo layout split que LoginForm.
	 * ────────────────────────────────────────────────────────────────────── */
	return (
		<div className="login-screen">
			{/* ════════════════════════════════════════════
          PANEL IZQUIERDO — identidad visual / marca
          ════════════════════════════════════════════ */}
			<aside className="login-brand" aria-hidden="true">
				<div className="brand-logo">
					<div className="brand-logo-circle">
						<span className="brand-logo-text">SIA</span>
					</div>
				</div>
			</aside>

			{/* ════════════════════════════════════════════
          PANEL DERECHO — formulario de registro
          ════════════════════════════════════════════ */}
			<main className="login-panel">
				{/* Círculos decorativos de fondo (mismos que en LoginForm) */}
				<div className="brand-deco-top" aria-hidden="true" />
				<div className="brand-deco-right" aria-hidden="true" />
				<div className="brand-deco-bottom-sm" aria-hidden="true" />
				<div className="brand-deco-bottom-lg" aria-hidden="true" />

				<div className="login-form-inner">
					{/* ── Encabezado ──────────────────────────────────────────── */}
					<header className="login-header">
						<h1 className="login-title">Registrar cuenta</h1>
						<p className="login-subtitle">
							¡Bienvenido al Sistema Integral Académico! Por favor, ingresa tus
							datos.
						</p>
					</header>

					{/* ── Formulario principal ───────────────────────────────── */}
					<form
						onSubmit={handleSubmit}
						noValidate /* Validación controlada por React */
						aria-describedby="register-feedback"
					>
						{/* Campo: Nombre y apellido */}
						<InputText
							id="fullName"
							label="Nombre y apellido"
							type="text"
							value={formData.fullName}
							onChange={handleChange("fullName")}
							placeholder="John Doe"
							required
						/>

						{/* Campo: Correo electrónico */}
						<InputText
							id="email"
							label="Correo Electrónico"
							type="email"
							value={formData.email}
							onChange={handleChange("email")}
							placeholder="johndoe@gmail.com"
							required
						/>

						{/* Campo: Número de identificación (cédula, pasaporte, etc.) */}
						<InputText
							id="idNumber"
							label="Numero de identificación"
							type="text"
							value={formData.idNumber}
							onChange={handleChange("idNumber")}
							placeholder="Ingresar identificación"
							required
						/>

						{/* Campo: Fecha de nacimiento — usa input type="date" nativo */}
						<DatePicker
							id="birthDate"
							label="Fecha de nacimiento"
							value={formData.birthDate}
							onChange={handleChange("birthDate")}
							/* El usuario debe ser mayor de 5 años */
							max={
								new Date(new Date().setFullYear(new Date().getFullYear() - 5))
									.toISOString()
									.split("T")[0]
							}
							required
						/>

						{/* Campo: Contraseña */}
						<InputPassword
							id="password"
							label="Contraseña"
							value={formData.password}
							onChange={handleChange("password")}
							placeholder="Ingresar contraseña"
							required
						/>

						{/* Campo: Confirmación de contraseña */}
						<InputPassword
							id="confirmPwd"
							label="Confirmar contraseña"
							value={formData.confirmPwd}
							onChange={handleChange("confirmPwd")}
							placeholder="Confirmar la contraseña"
							required
						/>

						{/* Mensaje de retroalimentación — role="alert" para lectores de pantalla */}
						{feedback && (
							<p
								id="register-feedback"
								className={`feedback ${feedback.startsWith("✅") ? "success" : "error"}`}
								role="alert"
							>
								{feedback}
							</p>
						)}

						{/* Botón de envío — ancho completo */}
						<div className="login-actions">
							<Button
								type="submit"
								variant="primary"
								ariaLabel="Crear cuenta con los datos ingresados"
							>
								Crear mi cuenta
							</Button>
						</div>
					</form>

					{/* Enlace para volver al login — navigate('/') de React Router */}
					<p className="register-login-link">
						¿Ya tienes cuenta?{" "}
						<button
							type="button"
							className="link-btn"
							onClick={() => navigate("/")}
							aria-label="Ir al formulario de inicio de sesión"
						>
							Inicia sesión
						</button>
					</p>
				</div>

				{/* Número de versión al pie del panel */}
				<span className="login-version">v 1.0.0</span>
			</main>
		</div>
	);
};

export default RegisterForm;
