import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FullBlockItem } from '../model/full-block-item';


const SERVER_URL_BASE = 'localhost:6877/v1';


@Injectable({
  providedIn: 'root'
})
export class ChainListenerService {

  private socket: WebSocket;

  public BlockEvent = new Subject<FullBlockItem>();

  constructor(private httpClient: HttpClient) {

    this.socket = new WebSocket(`ws://${SERVER_URL_BASE}/socket/latest`);
    // Abre la conexión
    this.socket.addEventListener('open', (event: any) => {
      this.socket.send('Hubble Web Client v0.0.1'); // TODO: Send the client data
    });

    // Escucha por mensajes
    this.socket.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      this.BlockEvent.next(data);
    });

  }

  getBlockByHash(hash: string): Observable<FullBlockItem> {
    const regex = /^dd[0-9,a-f]*$/gm;
    if (regex.test(hash)) {
      return this.httpClient.get<FullBlockItem> (`http://${SERVER_URL_BASE}/chain?hash=${hash}`);
    } else {
      return Observable.throw('Hash not valid');
    }
  }

  getBlockByHeight(height: number) {
      return this.httpClient.get<FullBlockItem> (`http://${SERVER_URL_BASE}/chain?height=${height}`);
  }

  getBlockByTimestamp(timestamp: number) {
    return this.httpClient.get<FullBlockItem> (`http://${SERVER_URL_BASE}/chain?timestamp=${timestamp}`);
  }

  getLatestBlocks(timestamp: number) {
    return this.httpClient.get<FullBlockItem[]> (`http://${SERVER_URL_BASE}/latest`);
  }

}
