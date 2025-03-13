import nodemailer from "nodemailer";

/**
 * Service to send emails.
 */
export default class MailerService {

	private readonly transporter: any;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'marquise.wisozk@ethereal.email',
				pass: 'jya7a5YYHrS4GRmPet'
			}
		});
	}

	public sendVerificationCodeEmail(receiver: string, code: number): void {
		this.transporter.sendMail({
			from: '"Eduardo testing api" <marquise.wisozk@ethereal.email>',
			to: receiver,
			subject: "Testing this works!",
			text: `Your validation code is ${code}`,
		})
			.then((res) => {
				console.log(res)
			})
	}
}