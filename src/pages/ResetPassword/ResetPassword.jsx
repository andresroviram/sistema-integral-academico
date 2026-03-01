/**
 * Componente ResetPassword
 * ========================
 * Pantalla de recuperación de contraseña. Solicita el correo del usuario
 * para enviarle un enlace de restablecimiento.
 *
 * Incluye:
 *   - InputText  → campo de correo electrónico
 *   - Button     → "Restablecer contraseña" (submit)
 *   - Link       → "Regresar al inicio de sesión"
 *
 * Layout: centrado en pantalla completa (sin panel de marca dividido),
 * igual al diseño de referencia.
 *
 * Props:
 *   - onGoToLogin : función recibida del padre para volver al LoginForm.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
/* ── Componentes reutilizables ── */
import InputText from "../../components/InputText/InputText";

/* ── Estilos propios de esta pantalla ── */
import "./ResetPassword.css";

const ResetPassword = () => {
	/* Hook de React Router para navegar sin recargar la página */
	const navigate = useNavigate();
	/* ── Estado del campo de correo ─────────────────────────────────────────
	 * Un solo campo controlado; se actualiza con cada pulsación de tecla.
	 * ────────────────────────────────────────────────────────────────────── */
	const [email, setEmail] = useState("");

	/* Estado del mensaje de retroalimentación al usuario */
	const [feedback, setFeedback] = useState("");

	/* ── Manejador del envío del formulario ─────────────────────────────────
	 * e.preventDefault() evita que el navegador recargue la página.
	 * Se valida el formato del correo antes de simular el envío del enlace.
	 * En un proyecto real aquí se llamaría a una API de recuperación.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleSubmit = (e) => {
		/* Prevenir comportamiento por defecto del formulario */
		e.preventDefault();

		/* Validación: el campo no puede estar vacío */
		if (!email.trim()) {
			setFeedback("Por favor ingresa tu correo electrónico.");
			return;
		}

		/* Validación: formato básico de correo electrónico */
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setFeedback("Ingresa un correo electrónico válido.");
			return;
		}

		/* Envío simulado exitoso */
		setFeedback(
			`✅ Enviamos un enlace de recuperación a ${email}. Revisa tu bandeja de entrada.`,
		);
		console.log("Recuperación solicitada para:", email);
	};

	/* ── Manejador del enlace "Regresar al inicio de sesión" ────────────────
	 * useNavigate navega a la ruta raíz / (LoginForm) sin recargar.
	 * ────────────────────────────────────────────────────────────────────── */
	const handleGoBack = (e) => {
		e.preventDefault();
		navigate("/");
	};

	/* ── Renderizado ────────────────────────────────────────────────────────
	 * Layout de pantalla completa centrado (sin panel de marca dividido).
	 * ────────────────────────────────────────────────────────────────────── */
	return (
		<div className="reset-screen">
			{/* Logo de la marca en la esquina superior izquierda */}
			<header className="reset-brand-bar">
				<span className="reset-brand-name">SIA</span>
			</header>

			{/* Tarjeta central con el formulario */}
			<main className="reset-card" aria-labelledby="reset-title">
				{/* ── Encabezado ──────────────────────────────────────────────── */}
				<header className="reset-header">
					<h1 id="reset-title" className="reset-title">
						¿Olvidaste tu contraseña?
					</h1>
					<p className="reset-subtitle">
						No te preocupes, te ayudaremos a cambiarla.
					</p>
				</header>

				{/* ── Formulario principal ──────────────────────────────────── */}
				<form
					onSubmit={handleSubmit}
					noValidate /* La validación la maneja React */
					aria-describedby="reset-feedback"
				>
					{/* Campo: correo electrónico al que se enviará el enlace */}
					<InputText
						id="reset-email"
						label="Correo Electrónico"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="johndoe@gmail.com"
						required
					/>

					{/* Mensaje de retroalimentación — role="alert" para lectores de pantalla */}
					{feedback && (
						<p
							id="reset-feedback"
							className={`feedback ${feedback.startsWith("✅") ? "success" : "error"}`}
							role="alert"
						>
							{feedback}
						</p>
					)}

					{/* Botón de envío — ancho completo */}
					<div className="reset-actions">
						<Button
							type="submit"
							variant="primary"
							ariaLabel="Enviar enlace de recuperación de contraseña"
						>
							Restablecer contraseña
						</Button>
					</div>
				</form>

				{/* ── Enlace para volver al login ──────────────────────────────
				 * Usa <button type="button"> para no interferir con el submit
				 * pero visualmente se muestra como un enlace de texto.            */}
				<button
					type="button"
					onClick={handleGoBack}
					className="reset-back-link"
					aria-label="Regresar al formulario de inicio de sesión"
				>
					<span className="reset-back-arrow" aria-hidden="true">
						‹
					</span>
					Regresar al inicio de sesión
				</button>
			</main>
		</div>
	);
};

export default ResetPassword;
