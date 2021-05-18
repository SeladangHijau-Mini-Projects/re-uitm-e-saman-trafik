import { BaseQueryFilterBuilder } from 'src/common/query-params/base.query-filter';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class UserQueryFilter extends BaseQueryFilterBuilder {
    rankId(value: number): object {
        return {
            rankId: value,
        };
    }

    typeId(value: number): object {
        return {
            typeId: value,
        };
    }

    userCode(value: string): object {
        return {
            userCode: value,
        };
    }

    fullname(value: string): object {
        return {
            fullname: value,
        };
    }

    phoneTelNo(value: string): object {
        return {
            phoneTelNo: value,
        };
    }

    officeTelNo(value: string): object {
        return {
            officeTelNo: value,
        };
    }

    firstTimer(value: string): object {
        return {
            firstTimer: value ? value.toLowerCase() == 'true' : null,
        };
    }

    from(value: Date): object {
        return {
            createdAt: MoreThanOrEqual(value),
        };
    }

    to(value: Date): object {
        return {
            createdAt: LessThanOrEqual(value),
        };
    }

    between(from: Date, to: Date): object {
        return {
            createdAt: Between(from, to),
        };
    }
}
