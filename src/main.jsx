import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios";

// CSS
import "./index.css"

// PAGES
import Home from "./pages/Home/Home";
import Lost from "./pages/Lost/Lost";
import Enigmas from "./pages/Enigmas/Enigmas";
import Enigma from "./pages/Enigma/Enigma";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

axios.defaults.baseURL = "http://localhost:8000/api";

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/admin" element={<Admin/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/enigmas" element={<Enigmas/>}/>
				<Route path="/enigma/:id" element={<Enigma/>}/>
				<Route path="*" element={<Lost/>}/>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
