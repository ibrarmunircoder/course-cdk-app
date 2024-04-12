import ksuid from 'ksuid';
import { v4 } from 'uuid';

export const KSUID = () => ksuid.randomSync().string;
export const UUID = () => v4();

export const ISO_DATE = () => new Date().toISOString();
export const EPOCH_DATE = () =>
  Math.ceil(new Date().getTime() / 1000).toString();
