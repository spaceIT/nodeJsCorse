import { createConnection } from 'typeorm';
import { DB_CONFIG } from '../src/common/config';
import { initDB } from './init.db';

const connectToDB = async () => {
    await createConnection(DB_CONFIG);

    console.log('DataBase is connected successfully');
};

export const tryDBConnect = async (cb: () => void): Promise<void> => {

    try {
        await connectToDB();
        if (await initDB()) {
            console.log('Default user has created');
        } else {
            console.log('Fail to create user');
        }
        
        cb();
    } catch (err) {
        console.log(err);
    }
};
