import React from 'react';
import Country from './Country';

const Countries = ({ countries, filter, setFilter }) => {
	console.log(filter);
	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	);

	if (filteredCountries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	} else if (filteredCountries.length > 1) {
		return (
			<div>
				{filteredCountries.map((country) => (
					<p key={country.cca3}>
						{country.name.common}
						<button
							onClick={() => setFilter(country.name.common.toLowerCase())}
						>
							show
						</button>
					</p>
				))}
			</div>
		);
	} else if (filteredCountries.length === 1) {
		return <Country country={filteredCountries[0]} />;
	} else {
		return <p>No matches</p>;
	}
};

export default Countries;
