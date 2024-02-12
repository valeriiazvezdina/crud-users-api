import * as dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const PORT = process.env.PORT ?? 3030;

app().listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

