import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public nombre = '';
  constructor(private wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    this.wsService.loginWs(this.nombre)
      .then(
        () => {
          this.router.navigate(['/mensajes']);
        }
      );
  }

}
