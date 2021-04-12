import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthEntity } from './repository/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
