import { BaseQueryFilterBuilder } from 'src/common/query-params/base.query-filter';
import { MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';

export class TransportQueryFilter extends BaseQueryFilterBuilder {
    id(value: number): object {
        return {
            id: value,
        };
    }

    studentId(value: number): object {
        return {
            studentId: value,
        };
    }

    statusId(value: number): object {
        return {
            statusId: value,
        };
    }

    plateNo(value: string): object {
        return {
            plateNo: value,
        };
    }

    passCode(value: string): object {
        return {
            passCode: value,
        };
    }

    createdAt(value: Date): object {
        return {
            createdAt: value,
        };
    }

    updatedAt(value: Date): object {
        return {
            updatedAt: value,
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
