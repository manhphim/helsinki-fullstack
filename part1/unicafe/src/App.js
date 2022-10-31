import { useState } from 'react';

import Button from './Button';
import Statistics from './Statistics';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
	};

	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};

	const handleBadClick = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button buttonName='good' setFeedback={handleGoodClick} />
			<Button buttonName='neutral' setFeedback={handleNeutralClick} />
			<Button buttonName='bad' setFeedback={handleBadClick} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
