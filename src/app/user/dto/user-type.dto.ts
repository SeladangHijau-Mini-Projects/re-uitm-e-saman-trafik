import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UserTypeEntity } from '../repository/user-type.entity';

export class UserTypeDto {
    @ApiProperty({ description: 'User ID', example: 1 })
    @IsNumber()
    readonly id: number;

    @ApiProperty({ description: 'User type', example: 'Admin' })
    @IsString()
    readonly code: string;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    readonly description: string;

    static fromModel(model: UserTypeEntity): UserTypeDto {
        return {
            id: model?.id,
            code: model?.code,
            description: model?.description,
        } as UserTypeDto;
    }
}
