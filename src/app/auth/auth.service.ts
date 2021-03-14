import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    generateToken(userId: number, userType: string): string {
        return jwt.sign({ userId, userType }, process.env.APP_API_SECRET, {
            expiresIn: '24h',
        });
    }
}
