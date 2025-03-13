import nodemailer from "nodemailer";

/**
 * Service to send emails.
 */
export default class MailerService {

	private readonly transporter: any;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: "smtp.mailersend.net",
			port: 587,
			auth: {
				user: "MS_kjTeZ4@trial-jy7zpl92k9p45vx6.mlsender.net",
				pass: "mssp.adWhtJm.neqvygm9d5zl0p7w.pfu8nQO",
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
			.catch((error) => {
				console.error(error)
			})
	}
}