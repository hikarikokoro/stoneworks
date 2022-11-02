const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage(from, message) {
	from = from ?? 'stephaniedufour1@hotmail.com';
	message = message ?? 'This is a test email using SendGrid from Node.js';
	return {
		to: 'noreply@stoneworkssolution.ca',
		from: 'noreply@stoneworkssolution.ca',
		subject: 'Contact us message from ' + from,
		text: message + 'sent from ' + from,
		html: `<p>${message}<br>Sent from ${from}</p>`,
	};
}

async function sendEmail(body) {
	try {
		await sendGridMail.send(getMessage(body.email, body.content));
		console.log('Test email sent successfully');
	} catch (error) {
		console.error('Error sending test email');
		console.error(error);
		if (error.response) {
			console.error(error.response.body)
		}
	}
}

async function sendEmailFromRegisterForm(body) {
	try {
		await sendGridMail.send(getMessage(body.email, body.content));
		console.log('Test email sent successfully');
	} catch (error) {
		console.error('Error sending test email');
		console.error(error);
		if (error.response) {
			console.error(error.response.body)
		}
	}
}


module.exports = { sendEmail, sendEmailFromRegisterForm };

/* (async () => {
	//console.log('Sending test email');
	//await sendEmail();
})(); */