import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route,Routes,Link} from 'react-router-dom';

import Displaypage from "./components/displaypage";
import Createpage from "./components/createpage";
import Deletepage from "./components/deletepage";
import Searchpage from "./components/searchpage";
import UpdatePage from "./components/updatepage";
import HomePage from "./components/homepage";
import LoginPage from "./components/loginoage";
import Stopwatch from "./components/stopwatch";
import CurrencyConverter from "./components/currnecyconversion";
import WelcomePage from "./components/welcome";
import FormValidationExample from "./components/formvalidation";
function App() {
	//CustomerName, CustomerNumber (Unique for a customer), City, State and Pincode.  
	const [customers, setCustomers] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		fetch("http://localhost:3000/items")
			.then((response) => response.json())
			.then((data) => setCustomers(data))
			.catch((error) => console.error("Error fetching data:", error));
	};

	return (
		<div>
			<h4>CRUD Application</h4>
			<Router>
			<nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
          <Link to="/" className="btn btn-dark btn-outline-light mr-2">Home</Link>
          <Link to="/createpage" className="btn btn-dark btn-outline-light mr-2">Create</Link>
          <Link to="/displaypage" className="btn btn-dark btn-outline-light mr-2">Display</Link>
          <Link to="/deletepage" className="btn btn-dark btn-outline-light mr-2">Delete</Link>
          <Link to="/searchpage" className="btn btn-dark btn-outline-light mr-2">Search</Link>
          <Link to="/updatepage" className="btn btn-dark btn-outline-light">Update</Link>
		  <Link to="/loginpage" className="btn btn-dark btn-outline-light">Login</Link>
		  <Link to="/stopwatch" className="btn btn-dark btn-outline-light">Stop Watch</Link>
		  <Link to="/currencycon" className="btn btn-dark btn-outline-light">Currency Converter</Link>
		  <Link to="/formvalidation" className="btn btn-dark btn-outline-light">form </Link>

        </nav>
				<Routes>
					<Route path="/" element={<HomePage/>}/><Route  />
					<Route path="/createpage" element={<Createpage/>}/><Route  />
					<Route path="/displaypage" element={<Displaypage/>}/><Route  />
					<Route path="/deletepage" element={<Deletepage/>}/><Route  />
					<Route path="/searchpage" element={<Searchpage/>}/><Route  />
					<Route path="/updatepage" element={<UpdatePage/>}/><Route  />
					<Route path="/loginpage" element={<LoginPage/>}/><Route  />
					<Route path="/stopwatch" element={<Stopwatch/>}/><Route  />
					<Route path="/currencycon" element={<CurrencyConverter/>}/>
					<Route path="/welcome/:username" element={<WelcomePage />} />
					<Route path="/formvalidation" element={<FormValidationExample />} />
				</Routes>
			</Router>
		    
			
			
		</div>
	);
}
export default App;
