import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { PaginationBuilder } from 'src/common/pagination/builder.pagination';
import { TransportDetailDto } from './dto/transport-detail.dto';
import { TransportQueryParamDto } from './dto/transport-query-param.dto';
import { TransportSummaryDto } from './dto/transport-summary.dto';
import { TransportService } from './transport.service';

@ApiTags('Transport')
@UseGuards(AuthGuard)
@Controller()
export class TransportController {
    constructor(private readonly transportService: TransportService) {}

    @Get()
    @ApiOperation({ summary: 'Get multiple transport.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [TransportSummaryDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async findAll(
        @Query() param: TransportQueryParamDto,
    ): Promise<TransportSummaryDto[] | PaginationBuilder> {
        if (param.paginationMeta) {
            const tempLimit = param.limit;
            const tempPage = param.page;

            delete param.limit;
            delete param.page;

            const result = await this.transportService.findAll(param);

            param.limit = tempLimit;
            param.page = tempPage;

            return PaginationBuilder.build(result.length, param);
        }

        return (await this.transportService.findAll(param)).map(
            TransportSummaryDto.fromModel,
        );
    }

    @Get(':transportId')
    @ApiOperation({ summary: 'Get single transport.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: TransportDetailDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async findOne(
        @Param('transportId', ParseIntPipe) transportId: number,
    ): Promise<TransportDetailDto> {
        return TransportDetailDto.fromModel(
            await this.transportService.findOne(transportId),
        );
    }
}
