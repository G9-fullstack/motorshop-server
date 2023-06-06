import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, }),
		new ValidationPipe({
			transform: true,
			transformOptions: { groups: ["transform"], },
		})
	);

	const PORT: string | number = process.env.APP_PORT || 3001;
	await app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
bootstrap();
