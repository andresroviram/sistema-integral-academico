/**
 * Componente LoginForm
 * ====================
 * Formulario de inicio de sesión que integra los componentes:
 *   - InputText      → campo de correo electrónico
 *   - InputPassword  → campo de contraseña con visibilidad alternada
 *   - Checkbox       → opción "Recordar por 30 días"
 *   - Button         → "Iniciar sesión" (submit) y "Registrarme" (redirección)
 *   - Enlace         → "Olvidé mi contraseña"
 *
 * Gestión de estado:
 *   useState maneja de forma independiente cada campo del formulario para
 *   que React pueda reflejar los cambios en tiempo real (componentes controlados).
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import InputPassword from "../../components/InputPassword/InputPassword";
/* ── Componentes reutilizables ────────────────────────────────────────────── */
import InputText from "../../components/InputText/InputText";

/* ── Estilos del formulario ───────────────────────────────────────────────── */
import "./LoginForm.css";

const LoginForm = () => {
	/* Hook de React Router para navegar entre rutas sin recargar la página */
	const navigate = useNavigate();
	/* ── Estado del formulario ──────────────────────────────────────────────
	 * Cada propiedad corresponde a un campo del formulario.
	 * Usamos un único objeto de estado para agrupar campos relacionados,
	 * lo que facilita el envío y el reseteo del formulario.
	 * ────────────────────────────────────────────────────────────────────── */
	const [formData, setFormData] = useState({
		email: "admin@academia.edu", // Usuario predeterminado para demo
		password: "Admin123*", // Contraseña predeterminada para demo
		rememberMe: false,
	});

	/* Estado del mensaje de retroalimentación tras el submit */
	const [feedback, setFeedback] = useState("");

	/* ── Manejadores de cambio ──────────────────────────────────────────────
	 * handleChange → actualiza campos de texto (email, password)
	 * handleCheckbox → actualiza el estado booleano del checkbox
	 *
	 * Se usa el "spread" (...formData) para no perder los demás valores
	 * al actualizar un único campo.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleChange = (field) => (e) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	const handleCheckbox = (e) => {
		setFormData({ ...formData, rememberMe: e.target.checked });
	};

	/* ── Credenciales válidas (simulación) ────────────────────────────────── */
	const VALID_EMAIL = "admin@academia.edu";
	const VALID_PASSWORD = "Admin123*";

	/* ── Validación básica del formulario ───────────────────────────────────
	 * Verifica campos vacíos, formato de correo y credenciales correctas.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleSubmit = (e) => {
		e.preventDefault();

		const { email, password } = formData;

		/* Campos obligatorios */
		if (!email.trim() || !password.trim()) {
			setFeedback("Por favor completa todos los campos obligatorios.");
			return;
		}

		/* Formato de correo */
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setFeedback("Ingresa un correo electrónico válido.");
			return;
		}

		/* Usuario incorrecto */
		if (email !== VALID_EMAIL) {
			setFeedback("❌ Usuario no encontrado. Verifica tu correo electrónico.");
			return;
		}

		/* Contraseña incorrecta */
		if (password !== VALID_PASSWORD) {
			setFeedback("❌ Contraseña incorrecta. Inténtalo de nuevo.");
			return;
		}

		/* Credenciales correctas → redirige al dashboard */
		setFeedback("");
		navigate("/dashboard");
	};

	/* ── Manejador del botón "Registrarme" ──────────────────────────────────
	 * useNavigate navega a la ruta /register sin recargar la página.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleRegister = () => {
		navigate("/register");
	};

	/* ── Renderizado del componente ─────────────────────────────────────────
	 * Layout split: panel izquierdo de marca + panel derecho con el formulario.
	 * En móvil (<768 px) el panel de marca se oculta via CSS.
	 * ────────────────────────────────────────────────────────────────────── */
	return (
		<div className="login-screen">
			{/* ════════════════════════════════════════════
			    PANEL IZQUIERDO — identidad visual / marca
			    ════════════════════════════════════════════ */}
			<aside className="login-brand" aria-hidden="true">
				{/* Logo central */}
				<div className="brand-logo">
					<div className="brand-logo-circle">
						<span className="brand-logo-text">SIA</span>
					</div>
				</div>
			</aside>

			{/* ════════════════════════════════════════════
			    PANEL DERECHO — formulario de login
			    ════════════════════════════════════════════ */}
			<main className="login-panel">
				{/* Círculos decorativos de fondo */}
				<div className="brand-deco-top" aria-hidden="true" />
				<div className="brand-deco-right" aria-hidden="true" />
				<div className="brand-deco-bottom-sm" aria-hidden="true" />
				<div className="brand-deco-bottom-lg" aria-hidden="true" />
				<div className="login-form-inner">
					{/* ── Encabezado ──────────────────────────────────────────── */}
					<header className="login-header">
						<h1 className="login-title">Accede a tu cuenta</h1>
						<p className="login-subtitle">
							¡Bienvenido al Sistema Integral Académico! Por favor, ingresa tus
							datos.
						</p>
					</header>

					{/* ── Formulario principal ───────────────────────────────── */}
					<form
						onSubmit={handleSubmit}
						noValidate
						aria-labelledby="form-title"
						aria-describedby="form-feedback"
					>
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

						{/* Campo: Contraseña con toggle de visibilidad */}
						<InputPassword
							id="password"
							label="Contraseña"
							value={formData.password}
							onChange={handleChange("password")}
							placeholder="ingresar contraseña"
							required
						/>

						{/* Fila: checkbox "Recordar" + enlace "Olvidé mi contraseña" */}
						<div className="login-options">
							<Checkbox
								id="rememberMe"
								label="Recordar por 30 días"
								checked={formData.rememberMe}
								onChange={handleCheckbox}
							/>
							<Link
								to="/reset"
								className="forgot-link"
								aria-label="Recuperar contraseña olvidada"
							>
								Olvidé mi contraseña
							</Link>
						</div>

						{/* Mensaje de retroalimentación — role="alert" para lectores de pantalla */}
						{feedback && (
							<p
								id="form-feedback"
								className={`feedback ${feedback.startsWith("✅") ? "success" : "error"}`}
								role="alert"
							>
								{feedback}
							</p>
						)}

						{/* Botones apilados a ancho completo */}
						<div className="login-actions">
							<Button
								type="submit"
								variant="primary"
								ariaLabel="Iniciar sesión con las credenciales ingresadas"
							>
								Iniciar Sesión
							</Button>

							<Button
								type="button"
								variant="secondary"
								onClick={handleRegister}
								ariaLabel="Ir al formulario de registro de nuevo usuario"
							>
								Registrarme
							</Button>
						</div>
					</form>
				</div>

				{/* Número de versión al pie del panel */}
				<span className="login-version">v 1.0.0</span>
			</main>
		</div>
	);
};

export default LoginForm;
