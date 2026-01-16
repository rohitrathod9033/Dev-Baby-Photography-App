import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('lockSlot')
    handleLockSlot(client: Socket, payload: { date: string; time: string }): void {
        this.logger.log(`Slot lock requested: ${payload.date} ${payload.time}`);
        // Broadcast to all other clients to disable this slot visually
        client.broadcast.emit('slotLocked', payload);
    }

    @SubscribeMessage('releaseSlot')
    handleReleaseSlot(client: Socket, payload: { date: string; time: string }): void {
        this.logger.log(`Slot release requested: ${payload.date} ${payload.time}`);
        client.broadcast.emit('slotReleased', payload);
    }
}
