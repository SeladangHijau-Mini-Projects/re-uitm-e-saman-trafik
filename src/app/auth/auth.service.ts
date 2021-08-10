import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AuthEntity } from './repository/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
    ) {}

    generateJwtToken(userId: number, userType: string): string {
        return jwt.sign({ userId, userType }, process.env.APP_API_SECRET, {
            expiresIn: '24h',
        });
    }

    generateResetToken(userId: number, userType: string): string {
        return jwt.sign({ userId, userType }, process.env.APP_API_SECRET, {
            expiresIn: '1h',
        });
    }

    async findOneByUserId(userId: number): Promise<AuthEntity> {
        return this.authRepository.findOne({ userId });
    }

    async findByResetToken(resetToken: string): Promise<AuthEntity> {
        return this.authRepository.findOne({ resetToken });
    }

    async findByUserIdAndResetToken(
        userId: number,
        resetToken: string,
    ): Promise<AuthEntity> {
        return this.authRepository.findOne({ userId, resetToken });
    }

    async generateAuth(userId: number, userType: string): Promise<AuthEntity> {
        let auth = await this.authRepository.findOne({ userId });

        if (auth) {
            auth = {
                ...auth,
                resetToken: this.generateResetToken(userId, userType),
            } as AuthEntity;
        } else {
            auth = {
                userId,
                password: 'new password',
                resetToken: this.generateResetToken(userId, userType),
            } as AuthEntity;
        }

        return this.authRepository.save(auth);
    }

    async resetPassword(
        authId: number,
        newPassword: string,
    ): Promise<AuthEntity> {
        const auth = await this.authRepository.findOne(authId);

        return this.authRepository.save({
            id: auth.id,
            password: newPassword,
            resetToken: null,
        });
    }
}
