/**
 * App.jsx
 * -------
 * Define las rutas de la aplicación con React Router.
 *
 * Rutas:
 *   /          → LoginForm      (inicio de sesión)
 *   /register  → RegisterForm   (registro de nuevo usuario)
 *   /reset     → ResetPassword  (recuperación de contraseña)
 *   /dashboard → Dashboard      (panel principal)
 *   *          → Redirige a / si la ruta no existe
 */
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginForm from "./pages/LoginForm/LoginForm";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LoginForm />} />

			<Route path="/register" element={<RegisterForm />} />

			<Route path="/reset" element={<ResetPassword />} />

			<Route path="/dashboard" element={<Dashboard />} />

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
