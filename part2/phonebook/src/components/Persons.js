import React from 'react';
import phonebookService from '../services/phonebook';

const Persons = ({ personsToShow, setPersons, setMessage }) => {
	const handleDelete = (id, name) => {
		if (window.confirm(`Delete person ${name} with id ${id}?`)) {
			phonebookService
				.deletePerson(id)
				.then((response) => {
					console.log(response);
					setPersons(personsToShow.filter((person) => person.id !== id));
				})
				.catch((error) => {
					setMessage(() => ({
						message: `Information of ${name} has already been removed from server`,
						type: 'error',
					}));
					setTimeout(() => {
						setMessage(null);
					}, 5000);
				});
		}
	};

	return (
		<div>
			{personsToShow.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
					<button
						type='button'
						onClick={() => handleDelete(person.id, person.name)}
					>
						delete
					</button>
				</p>
			))}
		</div>
	);
};

export default Persons;
