import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) {}

  enviarMensaje(mensaje: string) {
    const payload = {
      de: 'Moises Trigueros'
      , cuerpo: mensaje
    };
    this.wsService.emitir('mensaje', payload);
  }

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
