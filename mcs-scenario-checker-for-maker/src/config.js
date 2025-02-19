import dotenv from 'dotenv';

dotenv.config();

export const config = {
    cosmosDbEndpoint: process.env.REACT_APP_COSMOS_DB_ENDPOINT,
    cosmosDbKey: process.env.REACT_APP_COSMOS_DB_KEY,
    databaseName: process.env.REACT_APP_COSMOS_DB_DATABASE_NAME,
    containerName: process.env.REACT_APP_COSMOS_DB_CONTAINER_NAME
};