import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Countries from './components/Countries';
const App = () => {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
			console.log(response.data);
		});
	}, []);

	const handleFilterChange = (event) => {
		console.log(event.target.value);
		setFilter(event.target.value);
	};

	return (
		<div>
			<p>
				find countries
				<input type='text' onChange={handleFilterChange} />
			</p>
			<Countries countries={countries} filter={filter} setFilter={setFilter} />
		</div>
	);
};

export default App;
