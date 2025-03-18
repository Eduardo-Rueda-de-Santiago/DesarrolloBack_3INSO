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
			secure: false,
			auth: {
				user: process.env.SMPTP_USER,
				pass: process.env.SMPTP_PASSWORD,
			}
		});
	}

	/**
	 * Sends the verification code email to a user.
	 * @param receiver The user to receive the verification code.
	 * @param code The code to verify
	 */
	public sendVerificationCodeEmail(receiver: string, code: number): void {
		this.transporter.sendMail({
			from: process.env.SMTP_FROM,
			to: receiver,
			subject: "Testing this works!",
			text: `Your validation code is ${code}`,
		})
			.catch(error => {
				console.error(error)
			})
	}
}