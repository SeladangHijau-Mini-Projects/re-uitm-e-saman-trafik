import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransportDetailDto } from './dto/transport-detail.dto';
import { TransportService } from './transport.service';

@Controller()
export class TransportController {
    constructor(private readonly transportService: TransportService) {}

    // TODO: get multiple transport endpoint
    // @Get()
    // @ApiOperation({ summary: 'Get multiple transport.' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Success',
    //     type: [TransportSummaryDto],
    // })
    // @ApiResponse({ status: 401, description: 'Unauthorized.' })
    // @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    // async findAll(): Promise<TransportSummaryDto> {}

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
