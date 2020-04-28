import { WebSocketServer, SubscribeMessage, MessageBody, WsResponse, WebSocketGateway, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { Logger } from '@nestjs/common';



@WebSocketGateway(90, { namespace: 'EventsGateway' })
//@WebSocketGateway(89)
export class EventsGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger("EventsGateway")
    afterInit() {
        this.logger.log("init")
        this.server.emit("msgToClient", "text")

    }

    @SubscribeMessage("msgToServer")
    handleMessage(client: any, text: string): void {
        this.server.emit("msgToClient", "text")
        // return {event:"msgToClient",data:"text"};
    }

    // @WebSocketServer()
    // server: Server;

    // @SubscribeMessage('events')
    // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    //     return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    // }

    // @SubscribeMessage('identity')
    // async identity(@MessageBody() data: number): Promise<number> {
    //     return data;
    // }

    // @SubscribeMessage('EventsGateway')
    // handleEvent(@MessageBody() data: "unknown"): WsResponse<unknown> {
    //     const event = 'events';
    //    // this.server.emit('EventsGateway', { name: 'Nest' },data => console.log("DATaaaaaaaaaaaaaaaaaaaaaa:",data));

    //     return { event, data };
    // }


}