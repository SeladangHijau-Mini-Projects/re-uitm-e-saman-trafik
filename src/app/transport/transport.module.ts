import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportStatusEntity } from './repository/transport-status.entity';
import { TransportTypeEntity } from './repository/transport-type.entity';
import { TransportEntity } from './repository/transport.entity';
import { TransportController } from './transport.controller';
import { TransportService } from './transport.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransportEntity,
            TransportTypeEntity,
            TransportStatusEntity,
        ]),
    ],
    controllers: [TransportController],
    providers: [TransportService],
    exports: [TransportService],
})
export class TransportModule {}
