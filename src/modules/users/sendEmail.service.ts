import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as Mailgen from "mailgen";
import { AlterPasswordDto } from "./dto/alterPassword.dto";


const mailGenerator = new Mailgen({
	theme: "default",
	product: {
		name: "Motorshop",
		link: "http://localhost:3000",
	},
});

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendEmail({ to, subject, text, }: AlterPasswordDto) {
		await this.mailerService
			.sendMail({
				to,
				subject,
				html: text,
			})
			.then(() => {
				console.log("email enviado");
			})
			.catch((err) => {
				console.error(err);
				throw new InternalServerErrorException(
					"email nao enviado"
				);
			});
	}

	resetPassword(userEmail: string, userName: string, tokenReset: string) {
		const email = {
			body: {
				name: userName,
				intro:
          "RECUPERE SUA SENHA",
				action: {
					instructions: "Click the button below to reset your password:",
					button: {
						color: "#4529e6",
						text: "Reset your password",
						link: `http://localhost:3000/alterPassword/${tokenReset}`,
					},
				},
				outro:
          "If you did not request a password reset, no further action is required on your part.",
			},
		};

		const emailBody = mailGenerator.generate(email);
		const emailTemplate = {
			to: userEmail,
			subject: "Recuperação de senha",
			text: emailBody,
		};

		return emailTemplate;
	}
}
