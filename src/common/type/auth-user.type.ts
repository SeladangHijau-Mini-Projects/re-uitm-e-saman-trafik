import { AuthUserType } from '../enum/auth-user-type.enum';

export type AuthUser = {
    userId: string;
    type: AuthUserType;
};
