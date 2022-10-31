import React from 'react';
import StatisticLine from './StatisticLine';

const Statistics = ({ good, bad, neutral }) => {
	return (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					{good === 0 && bad === 0 && neutral === 0 ? (
						<tr>
							<td>No feedback given</td>
						</tr>
					) : (
						<>
							<StatisticLine text='good' value={good} />
							<StatisticLine text='neutral' value={neutral} />
							<StatisticLine text='bad' value={bad} />
							<StatisticLine text='all' value={good + neutral + bad} />
							<StatisticLine
								text='average'
								value={(good - bad) / (good + neutral + bad)}
							/>
							<StatisticLine
								text='positive'
								value={(good / (good + neutral + bad)) * 100}
							/>
						</>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Statistics;
