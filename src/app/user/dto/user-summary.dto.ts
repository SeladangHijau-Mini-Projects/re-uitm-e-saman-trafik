import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNumberString, IsString } from 'class-validator';
import { UserEntity } from '../repository/user.entity';

export class UserSummaryDto {
    @ApiProperty({ description: 'User ID', example: 1 })
    @IsNumber()
    readonly id: number;

    @ApiProperty({ description: 'User type', example: 'Admin' })
    @IsString()
    readonly type: string;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    readonly code: string;

    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'User mobile tel no', example: '0111234567' })
    @IsNumberString()
    readonly mobileTelNo: string;

    @ApiProperty({ description: 'User office tel no', example: '044911234' })
    @IsNumberString()
    readonly officeTelNo: string;

    @ApiProperty({
        description: 'User is first timer indicator',
        example: true,
    })
    @IsBoolean()
    readonly firstTimer: boolean;

    @ApiProperty({
        description: 'User email',
        example: true,
    })
    @IsBoolean()
    readonly email: string;

    static fromModel(model: UserEntity): UserSummaryDto {
        return {
            id: model?.id,
            type: model?.userType?.description,
            code: model?.code,
            name: model?.name,
            mobileTelNo: model?.mobileTelNo,
            officeTelNo: model?.officeTelNo,
            firstTimer: model?.firstTimer,
            email: model.email,
        } as UserSummaryDto;
    }
}
