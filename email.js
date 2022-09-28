const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage(to, message) {
	to = to ?? 'stephaniedufour1@hotmail.com';
	message = message ?? 'This is a test email using SendGrid from Node.js';
	return {
		to: to,
		from: 'noreply@stoneworkssolution.ca',
		subject: 'Test email with Node.js and SendGrid',
		text: message,
		html: `<p>${message}</p>`,
	};
}

async function sendEmail(to, message) {
	try {
		await sendGridMail.send(getMessage(to, message));
		console.log('Test email sent successfully');
	} catch (error) {
		console.error('Error sending test email');
		console.error(error);
		if (error.response) {
			console.error(error.response.body)
		}
	}
}

(async () => {
	//console.log('Sending test email');
	//await sendEmail();
})();