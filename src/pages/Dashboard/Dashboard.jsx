/**
 * Dashboard.jsx
 * -------------
 * Vista principal del Sistema Integral Académico.
 *
 * Estructura:
 *   ┌──────────┬───────────────────────────────────────────┐
 *   │ Sidebar  │ Navbar                                    │
 *   │          ├───────────────────────────────────────────┤
 *   │          │ Métricas (4 tarjetas)                     │
 *   │          │ Top 5 alumnos │ Promedio por grupo        │
 *   │          │ Rendimiento   │ Distribución por grado    │
 *   └──────────┴───────────────────────────────────────────┘
 */

import { useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import MetricCard from "../../components/MetricCard/MetricCard";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Toast from "../../components/Toast/Toast";

import "./Dashboard.css";

/* ─────────────────────────  DATOS ESTÁTICOS  ───────────────────────── */

const METRICS = [
	{ label: "Estudiantes Registrados", value: 1653, icon: "🎓" },
	{ label: "Docentes Activos", value: 89, icon: "👥" },
	{ label: "Materias Activas", value: 156, icon: "📋" },
	{ label: "Grupos Activos", value: 42, icon: "📅" },
];

const TOP5 = [
	{ rank: 1, name: "Ana Garcia", group: "Grupo 3A", score: 9.8 },
	{ rank: 2, name: "Carlos López", group: "Grupo 2B", score: 9.6 },
	{ rank: 3, name: "María Rodríguez", group: "Grupo 3A", score: 9.5 },
	{ rank: 4, name: "Juan Pérez", group: "Grupo 1C", score: 9.3 },
	{ rank: 5, name: "Laura Martínez", group: "Grupo 2A", score: 9.2 },
];

const PROMEDIOS = [
	{ grupo: "Grupo 1A", avg: 8.2 },
	{ grupo: "Grupo 1B", avg: 8.5 },
	{ grupo: "Grupo 1C", avg: 8.8 },
	{ grupo: "Grupo 2A", avg: 8.1 },
	{ grupo: "Grupo 2B", avg: 8.1 },
	{ grupo: "Grupo 3A", avg: 7.5 },
	{ grupo: "Grupo 3B", avg: 9.1 },
	{ grupo: "Grupo 3C", avg: 8.7 },
	{ grupo: "Grupo 4A", avg: 9.0 },
];

const BAR_DATA = [
	{ name: "1A", value: 78 },
	{ name: "1B", value: 82 },
	{ name: "1C", value: 85 },
	{ name: "2A", value: 80 },
	{ name: "2B", value: 79 },
	{ name: "3A", value: 75 },
	{ name: "3B", value: 88 },
	{ name: "3C", value: 91 },
	{ name: "4A", value: 86 },
];

const DONUT_DATA = [
	{ name: "1er Grado", value: 68 },
	{ name: "2do Grado", value: 74 },
	{ name: "3er Grado", value: 62 },
	{ name: "4to Grado", value: 38 },
];
const DONUT_COLORS = ["#1a6b55", "#2d9b78", "#5cbfa0", "#a8e6cf"];

/* Radio interno del donut (porcentaje del radio externo) */
const INNER_RADIUS = "55%";
const OUTER_RADIUS = "80%";

/* ─────────────────────────  COMPONENTE  ──────────────────────────── */

const Dashboard = () => {
	/* Estado del ítem activo del sidebar */
	const [activeItem, setActiveItem] = useState("dashboard");

	/* Estado colapsado del sidebar */
	const [collapsed, setCollapsed] = useState(false);

	const handleToggleSidebar = () => setCollapsed((prev) => !prev);

	/* Estado del toast de bienvenida */
	const [toast, setToast] = useState({
		visible: true,
		message: "Bienvenido, Carlos Pérez. Último acceso: hoy a las 08:15 a.m.",
		type: "info",
	});

	/* Oculta el toast cuando expira o se cierra manualmente */
	const handleCloseToast = () =>
		setToast((prev) => ({ ...prev, visible: false }));

	return (
		<div className={`dashboard-root${collapsed ? " sidebar-collapsed" : ""}`}>
			{/* ── Sidebar ── */}
			<Sidebar
				activeItem={activeItem}
				onNavigate={setActiveItem}
				collapsed={collapsed}
			/>

			{/* ── Área principal: navbar + contenido ── */}
			<div className="dashboard-main">
				{/* Navbar */}
				<Navbar
					title="Dashboard"
					userName="Carlos Pérez"
					userRole="Administrador"
					notifCount={3}
					onMenuToggle={handleToggleSidebar}
				/>

				{/* Contenido scrollable */}
				<main className="dashboard-content">
					{/* Toast de notificación */}
					{toast.visible && (
						<Toast
							message={toast.message}
							type={toast.type}
							onClose={handleCloseToast}
						/>
					)}

					{/* ── Sección 1: Tarjetas de métricas ── */}
					<section className="metrics-grid" aria-label="Resumen de métricas">
						{METRICS.map((m) => (
							<MetricCard
								key={m.label}
								label={m.label}
								value={m.value}
								icon={m.icon}
							/>
						))}
					</section>

					{/* ── Sección 2: Top 5 alumnos + Promedio por grupo ── */}
					<section className="mid-grid">
						{/* Tarjeta: Top 5 Mejores Alumnos */}
						<div className="card">
							<h2 className="card-title">🏆 Top 5 Mejores Alumnos</h2>
							<table className="top5-table" aria-label="Top 5 mejores alumnos">
								<thead>
									<tr>
										<th>#</th>
										<th>Nombre</th>
										<th>Grupo</th>
										<th>Promedio</th>
									</tr>
								</thead>
								<tbody>
									{TOP5.map((s) => (
										<tr key={s.rank}>
											<td>
												<span className="rank-badge">{s.rank}</span>
											</td>
											<td>{s.name}</td>
											<td className="group-pill">{s.group}</td>
											<td>
												{/* Badge de puntaje: color según rendimiento */}
												<span
													className={`score-badge ${
														s.score >= 9.5
															? "score-excellent"
															: s.score >= 9.0
																? "score-good"
																: "score-regular"
													}`}
												>
													{s.score.toFixed(1)}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Tarjeta: Promedio por grupo (barras horizontales) */}
						<div className="card">
							<h2 className="card-title">📊 Promedio por Grupo</h2>
							<ul className="hbar-list" aria-label="Promedio por grupo">
								{PROMEDIOS.map((g) => {
									/* el máximo posible es 10; calculamos el % visualmente */
									const pct = (g.avg / 10) * 100;
									return (
										<li key={g.grupo} className="hbar-item">
											<span className="hbar-label">{g.grupo}</span>
											<div
												className="hbar-track"
												role="progressbar"
												aria-valuenow={g.avg}
												aria-valuemin={0}
												aria-valuemax={10}
											>
												<div
													className="hbar-fill"
													style={{ width: `${pct}%` }}
												/>
											</div>
											<span className="hbar-value">{g.avg.toFixed(1)}</span>
										</li>
									);
								})}
							</ul>
						</div>
					</section>

					{/* ── Sección 3: Gráficas ── */}
					<section className="charts-grid">
						{/* Gráfico de barras verticales: Rendimiento Académico */}
						<div className="card">
							<h2 className="card-title">📈 Rendimiento Académico</h2>
							<ResponsiveContainer width="100%" height={240}>
								<BarChart
									data={BAR_DATA}
									margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
									aria-label="Gráfico de rendimiento académico por grupo"
								>
									<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
									<XAxis
										dataKey="name"
										tick={{ fontSize: 12, fill: "#6b7280" }}
									/>
									<YAxis
										domain={[60, 100]}
										tick={{ fontSize: 12, fill: "#6b7280" }}
									/>
									<Tooltip
										contentStyle={{ fontSize: 13 }}
										formatter={(v) => [`${v}%`, "Promedio"]}
									/>
									<Bar dataKey="value" fill="#2d9b78" radius={[4, 4, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</div>

						{/* Gráfico de dona: Distribución por Grado */}
						<div className="card">
							<h2 className="card-title">🍩 Distribución por Grado</h2>
							{/* Total centrado sobre la dona */}
							<div className="donut-wrapper">
								<ResponsiveContainer width="100%" height={240}>
									<PieChart aria-label="Distribución de estudiantes por grado">
										<Pie
											data={DONUT_DATA}
											cx="50%"
											cy="50%"
											innerRadius={INNER_RADIUS}
											outerRadius={OUTER_RADIUS}
											dataKey="value"
											stroke="none"
										>
											{DONUT_DATA.map((_, idx) => (
												<Cell
													key={DONUT_DATA[idx].name}
													fill={DONUT_COLORS[idx % DONUT_COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(v, name) => [v, name]}
											contentStyle={{ fontSize: 13 }}
										/>
										<Legend
											iconType="circle"
											iconSize={10}
											wrapperStyle={{ fontSize: 12 }}
										/>
									</PieChart>
								</ResponsiveContainer>
								{/* Texto central: total de estudiantes */}
								<div className="donut-center" aria-hidden="true">
									<span className="donut-total">242</span>
									<span className="donut-sublabel">Total</span>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
