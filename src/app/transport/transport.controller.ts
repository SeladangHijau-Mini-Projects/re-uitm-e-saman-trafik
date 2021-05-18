import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransportDetailDto } from './dto/transport-detail.dto';
import { TransportQueryParamDto } from './dto/transport-query-param.dto';
import { TransportSummaryDto } from './dto/transport-summary.dto';
import { TransportService } from './transport.service';

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
    ): Promise<TransportSummaryDto[]> {
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
