import { io } from 'socket.io-client';
import { urlBackend } from './utils/baseUrl';

export const socket = io(urlBackend);
