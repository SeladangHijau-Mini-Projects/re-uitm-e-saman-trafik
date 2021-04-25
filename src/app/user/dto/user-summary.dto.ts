import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNumberString, IsString } from 'class-validator';
import { UserRank } from '../enum/user-rank.enum';
import { UserType } from '../enum/user-type.enum';
import { UserEntity } from '../repository/user.entity';

export class UserSummaryDto {
    @ApiProperty({ description: 'User ID', example: 1 })
    @IsNumber()
    readonly id: number;

    @ApiProperty({ description: 'User rank', enum: UserRank, example: 'ur1' })
    @IsString()
    readonly rank: string;

    @ApiProperty({ description: 'User type', enum: UserType, example: 'admin' })
    @IsString()
    readonly type: string;

    @ApiProperty({ description: 'User staff code', example: 'K380' })
    @IsString()
    readonly userCode: string;

    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsString()
    readonly fullname: string;

    @ApiProperty({ description: 'User phone tel no', example: '0111234567' })
    @IsNumberString()
    readonly phoneTelNo: string;

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
            rank: model?.userRank?.description,
            type: model?.userType?.description,
            userCode: model?.userCode,
            fullname: model?.fullname,
            phoneTelNo: model?.phoneTelNo,
            officeTelNo: model?.officeTelNo,
            firstTimer: model?.firstTimer,
            email: model.email,
        } as UserSummaryDto;
    }
}
