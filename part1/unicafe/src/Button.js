import React from 'react';

const Button = ({ buttonName, setFeedback }) => {
	return <button onClick={setFeedback}>{buttonName}</button>;
};

export default Button;
