import { createConnection } from 'typeorm';
import { DB_CONFIG } from '../src/common/config';

const connectToDB = async () => {
    await createConnection(DB_CONFIG);
    console.log('DataBase is connected successfully');
};

export const tryDBConnect = async (cb: () => void): Promise<void> => {
    try {
        await connectToDB();
        cb();
    } catch (err) {
        console.log(err);
    }
};
