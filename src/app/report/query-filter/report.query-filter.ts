import { BaseQueryFilterBuilder } from 'src/common/query-params/base.query-filter';

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
}
