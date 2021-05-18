import { BaseQueryFilterBuilder } from 'src/common/query-params/base.query-filter';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class ReportQueryFilter extends BaseQueryFilterBuilder {
    id(value: number): object {
        return {
            id: value,
        };
    }

    statusId(value: number): object {
        return {
            statusId: value,
        };
    }

    transportId(value: number): object {
        return {
            transportId: value,
        };
    }

    studentId(value: number): object {
        return {
            studentId: value,
        };
    }

    userId(value: number): object {
        return {
            userId: value,
        };
    }

    location(value: string): object {
        return {
            location: value,
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
