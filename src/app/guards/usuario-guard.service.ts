import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {WebsocketService} from '../services/websocket.service';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, OnInit {

  public usuario: Usuario;
  constructor(private wsService: WebsocketService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.usuario = this.wsService.getUsuario();
    if (this.usuario) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  ngOnInit(): void {

  }
}
