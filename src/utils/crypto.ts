import bcrypt from 'bcrypt';
import { DB_SALT } from '../common/config';

export const getHash = async (text: string): Promise<string> => {
    const hashedText: string = await bcrypt.hash(text, DB_SALT);

    return hashedText;
};

export const checkHash = async (text: string, hash: string): Promise<boolean> => {
    const result: boolean = await bcrypt.compare(text, hash);

    return result;
};
