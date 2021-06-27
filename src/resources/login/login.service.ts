import jwt from 'jsonwebtoken';
import { checkHash } from '../../utils/crypto';
import { getByLogin } from '../users/user.service';
import { ILogin } from '../../interfaces';
import { TOKEN_EXP } from '../../common/config';

export const getAuthToken = async ({ login, password }: ILogin): Promise<string> => {
  const user = await getByLogin(login);
  if (!user) return '';

  try {
    if (!(await checkHash(password, user.id))) return '';

    return jwt.sign({ userId: user.id, login }, 'secret-key', { expiresIn: TOKEN_EXP });
  } catch (error) {
    return '';
  }
};