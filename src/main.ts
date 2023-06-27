import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Motorshop API")
		.setDescription("The Motorshop API is a RESTful API for managing motorshop data.")
		.setVersion("1.0")
		.addTag("cars", "The cars API")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api", app, document);
	app.enableCors();

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
