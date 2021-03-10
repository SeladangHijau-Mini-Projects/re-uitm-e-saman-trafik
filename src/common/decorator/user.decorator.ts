import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../type/auth-user.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthUser => {
        const { user } = ctx.switchToHttp().getRequest();

        if (!user) {
            return null;
        }

        return {
            userId:
                typeof user.userId === 'number'
                    ? (user.userId as number).toString()
                    : user.userId,
            type: user.type,
        };
    },
);
