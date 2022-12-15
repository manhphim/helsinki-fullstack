import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import phonebookService from './services/phonebook';
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		phonebookService.getAll().then((response) => {
			setPersons(response);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		if (persons.some((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const person = persons.find((person) => person.name === newName);
				const changedPerson = { ...person, number: newNumber };
				phonebookService
					.update(person.id, changedPerson)
					.then((response) => {
						setMessage(() => ({
							message: `Updated ${response.name}`,
							type: 'success',
						}));
						setTimeout(() => {
							setMessage(null);
							console.log(message);
						}, 5000);
						setPersons(
							persons.map((person) =>
								person.id !== response.id ? person : response
							)
						);
					})
					.catch((error) => {
						setMessage(() => ({
							message: `Information of ${person.name} has already been removed from server`,
							type: 'error',
						}));
						setTimeout(() => {
							setMessage(null);
							console.log(message);
						}, 5000);
						setPersons(
							persons.filter((person) => person.id !== changedPerson.id)
						);
					});
			}
		}

		const personObject = {
			name: newName,
			number: newNumber,
		};

		phonebookService
			.create(personObject)
			.then((response) => {
				setPersons(persons.concat(response));
				setNewName('');
				setNewNumber('');
				setMessage({
					message: `Added ${response.name}`,
					type: 'success',
				});
			})
			.catch((error) => {
				setMessage({
					message: 'error occured: ' + error.response.data.error,
					type: 'error',
				});

				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const personsToShow = filter
		? persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase())
		  )
		: persons;
	return (
		<div>
			<h2>Phonebook</h2>
			{message && <Notification message={message} />}
			<Filter filter={filter} handleFilterChange={handleFilterChange} />

			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				addPerson={addPerson}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>
			<Persons
				personsToShow={personsToShow}
				setPersons={setPersons}
				setMessage={setMessage}
			/>
		</div>
	);
};

export default App;
