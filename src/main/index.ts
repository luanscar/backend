import { logger } from '@shared/helpers/logger.winston';
import { prisma } from '@main/infra/database/orm/prisma/client';
import dotenv from 'dotenv';
import type { Application } from 'express';
import { createExpressApplication } from './presentation/http/app.express';
import { createHTTPServer } from './presentation/http/server';

async function bootstrap() {
    logger.info('Starting an API... 🚀');

    dotenv.config();
    const api_name = process.env.API_NAME;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;

    logger.ok('Loading environment variables from .env file');
    const app: Application = await createExpressApplication();
    logger.ok(`Aplicação Express Instanciada e Configurada`);

    const httpServer = await createHTTPServer(app);
    logger.ok('Servidor HTTP Instanciado e Configurado');

    httpServer.listen({ port: port }, async () => {
        logger.ok(`Servidor HTTP Pronto e Ouvindo em http://${host_name}:${port}`);
    });

    prisma.$connect().then(async () => {
        logger.ok(`Banco de Dados Conectado`);
    });
}

bootstrap().catch((error) => {
    console.log(error.message);
});
