import { LoggerService, ConfiguredTransport } from 'nest-logger';

/**
 * Serve as base logging class.
 * In future when we have centralise logging such as ELK, we can implement it here
 */
export class AppLogger extends LoggerService {
    constructor(level: string, loggers: ConfiguredTransport[]) {
        super(level, loggers);
    }
}
