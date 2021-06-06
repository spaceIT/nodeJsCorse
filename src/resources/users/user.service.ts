import * as usersRepo from './user.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';
import { TypeUser } from './user.model';

const getAll = () => usersRepo.getAll();
const getById = (id: string) => usersRepo.getById(id);
const createUser = (user: TypeUser) => usersRepo.createUser(user);
const updateById = (id: string, user: TypeUser) => usersRepo.updateById(id, user);
const deleteById = (id: string) => {
    tasksRepo.removeUserById(id);
    usersRepo.deleteById(id);
};

export { getAll, getById, createUser, updateById, deleteById };
