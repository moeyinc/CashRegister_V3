import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./app.global.css";
import MainPage from "./app/pages/mainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentPage from "./app/pages/paymentPage";
import { Provider } from "react-redux";
import store from "./app/redux/store";


export default function App() {
	return (
		<div className="wrapper">
			<Provider store={store}>
				<MainPage />
			</Provider>
		</div>
	);
}