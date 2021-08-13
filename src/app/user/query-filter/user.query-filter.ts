import { BaseQueryFilterBuilder } from 'src/common/query-params/base.query-filter';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class UserQueryFilter extends BaseQueryFilterBuilder {
    typeId(value: number): object {
        return {
            typeId: value,
        };
    }

    code(value: string): object {
        return {
            code: value,
        };
    }

    name(value: string): object {
        return {
            name: value,
        };
    }

    mobileTelNo(value: string): object {
        return {
            mobileTelNo: value,
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
