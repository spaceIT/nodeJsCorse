import { v4 } from 'uuid';



export interface TypeUser {
  id: string,
  name?: string | undefined,
  login?: string | undefined,
  password?: string | undefined,
}

class User implements TypeUser {
  id: string;

  name?: string | undefined;

  login?: string | undefined;

  password?: string | undefined;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
