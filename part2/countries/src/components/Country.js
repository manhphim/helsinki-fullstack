import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

const Country = ({ country }) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((response) => {
				setWeather(response.data);
			});
	}, [country.latlng]);
	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h2>languages</h2>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt='flag' width='100' />
			<h2>Weather in {country.capital}</h2>
			<p>
				<b>temperature:</b> {weather.main?.temp} Kelvin
			</p>
			<img
				src={`http://openweathermap.org/img/w/${weather.weather?.[0].icon}.png`}
				alt='weather icon'
			/>
			<p>
				<b>wind:</b> {weather.wind?.speed} m/s, direction {weather.wind?.deg}{' '}
				degrees
			</p>
		</div>
	);
};

export default Country;
