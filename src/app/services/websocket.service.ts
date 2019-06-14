import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: (resp) => any) {
    console.log('Emitiendo', evento);
    this.socket.emit(evento, payload, callback);
    // emit
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWs(nombreUsuario: string) {

    return new Promise( (resolve, reject) => {
      this.emit('configurar-usuario', {nombreUsuario}, resp => {
        this.usuario = new Usuario(nombreUsuario);
        this.guardarStorage();
        resolve();
      });
    });
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre);
    }
  }

  getUsuario() {
    return this.usuario;
  }
}
