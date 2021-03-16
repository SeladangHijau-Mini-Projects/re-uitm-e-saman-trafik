import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficErrorEntity } from './repository/traffic-error.entity';
import { TrafficErrorService } from './traffic-error.service';

@Module({
    imports: [TypeOrmModule.forFeature([TrafficErrorEntity])],
    providers: [TrafficErrorService],
    exports: [TrafficErrorService],
})
export class TrafficErrorModule {}
