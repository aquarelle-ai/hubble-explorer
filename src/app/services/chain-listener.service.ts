import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BlockItem } from '../model/block-item';

@Injectable({
  providedIn: 'root'
})
export class ChainListenerService {

  private socket: WebSocket;

  public BlockEvent = new Subject<BlockItem>();

  constructor() {

    this.socket = new WebSocket('ws://localhost:8080/price');
    // Abre la conexión
    this.socket.addEventListener('open', (event: any) => {
      this.socket.send('Hello Server!');
    });

    // Escucha por mensajes
    this.socket.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      this.BlockEvent.next(data);
    });

  }
}
