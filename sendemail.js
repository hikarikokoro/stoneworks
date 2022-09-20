const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
var args = process.argv.slice(2);

if (args === undefined || args === null) {
	console.error("MUST CONTAIN AN EMAIL AS AN ARGUMENT");
}
const msg = {
	to: args[0], // Change to your recipient
	from: 'noreply@stoneworkssolution.ca', // Change to your verified sender
	subject: 'Hi fuck face',
	text: 'and easy to do anywhere, even with Node.js',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
	.send(msg)
	.then((response) => {
		console.log(response[0].statusCode)
		console.log(response[0].headers)
	})
	.catch((error) => {
		console.error(error)
	})