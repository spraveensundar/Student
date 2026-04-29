export interface SocketEventMap {
  'connection_change': { isConnected: boolean };
  'connection_error': Error;
  'reconnect_attempt': { attempt: number };
  'reconnection_failed': void;
  'CREATE_ROOM': string

}


export interface SocketOptions {
  transports?: string[];
  forceNew?: boolean;
  reconnectionAttempts?: number;
  timeout?: number;
  query?: Record<string, string>;
}

export type EventCallback<T = any> = (data: T) => void;
export type GenericEventCallback = (...args: any[]) => void;




// services/SocketService.ts
import io, { Socket } from 'socket.io-client';


class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private eventListeners: Map<string, GenericEventCallback[]> = new Map();
  private reconnectionAttempts: number = 0;
  private readonly maxReconnectionAttempts: number = 5;

  initializeSocket = (url: string, options: SocketOptions = {}): void => {
    if (this.socket) {
      this.disconnect();
    }

    const defaultOptions: SocketOptions = {
      // transports: ['websocket'],
      forceNew: true,
      reconnectionAttempts: Infinity,
      timeout: 10000,
      ...options
    };

    this.socket = io(url, defaultOptions as any);
    this.setupEventListeners();
  };

  private setupEventListeners = (): void => {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', this.handleConnect);
    this.socket.on('disconnect', this.handleDisconnect);
    this.socket.on('connect_error', this.handleConnectError);
    this.socket.on('reconnect_attempt', this.handleReconnectAttempt);
    this.socket.on('reconnect_failed', this.handleReconnectFailed);

    // Custom event forwarding
    this.socket.onAny(this.forwardEvent);
  };

  private handleConnect = (): void => {
    console.log('Socket connected');
    this.isConnected = true;
    this.reconnectionAttempts = 0;
    this.emitToListeners('connection_change', { isConnected: true });
  };

  private handleDisconnect = (reason: string): void => {
    console.log('Socket disconnected:', reason);
    this.isConnected = false;
    this.emitToListeners('connection_change', { isConnected: false });
  };

  private handleConnectError = (error: Error): void => {
    console.log('Connection error:', error);
    this.emitToListeners('connection_error', error);
  };

  private handleReconnectAttempt = (attemptNumber: number): void => {
    this.reconnectionAttempts = attemptNumber;
    console.log(`Reconnection attempt ${attemptNumber}`);
    this.emitToListeners('reconnect_attempt', { attempt: attemptNumber });
  };

  private handleReconnectFailed = (): void => {
    console.log('Reconnection failed');
    this.emitToListeners('reconnection_failed', undefined);
  };

  // Event management with type safety
  addEventListener = <K extends keyof SocketEventMap>(
    event: K,
    callback: EventCallback<SocketEventMap[K]>
  ): void => {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback as GenericEventCallback);
  };

  removeEventListener = <K extends keyof SocketEventMap>(
    event: K,
    callback: EventCallback<SocketEventMap[K]>
  ): void => {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event)!;
      const index = listeners.indexOf(callback as GenericEventCallback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  };

  private forwardEvent = (eventName: string, ...args: any[]): void => {
    if (this.eventListeners.has(eventName)) {
      this.eventListeners.get(eventName)!.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in event listener for ${eventName}:`, error);
        }
      });
    }
  };

  private emitToListeners = <K extends keyof SocketEventMap>(
    event: K,
    data: SocketEventMap[K]
  ): void => {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event)!.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  };

  // Socket methods
  emit = <T = any>(
    event: string,
    data?: T,
    callback?: (response: any) => void
  ): void => {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data, callback);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  };

  disconnect = (): void => {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
    this.eventListeners.clear();
  };

  getConnectionStatus = (): boolean => this.isConnected;

  getSocket = (): Socket | null => this.socket;
}

export default new SocketService();