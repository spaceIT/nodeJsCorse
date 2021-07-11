import { Id } from './types';

export interface IEntity {
  id: Id;
}

export interface IExtendedEntity extends IEntity {
  [_key: string]: string | Id;
}
