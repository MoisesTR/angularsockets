import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto: string;
  subscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(private chatService: ChatService) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');
    this.subscription = this.chatService.getMessages().subscribe(
      msg => {
        this.mensajes.push(msg);

        setTimeout( () => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      }
    );
  }

  enviar() {
    if (this.texto.trim().length !== 0) {
      console.log(this.texto);
      this.chatService.enviarMensaje(this.texto);
      this.texto = '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
