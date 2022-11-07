import React from 'react';

const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}
	return (
		<div
			className={`notification-box ${
				message.type === 'error' ? 'error' : 'success'
			}`}
		>
			{message.message}
		</div>
	);
};

export default Notification;
