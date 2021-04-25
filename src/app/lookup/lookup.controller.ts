import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LookupListQueryParamDto } from './dto/lookup-list-query-param.dto';
import { LookupListDto } from './dto/lookup-list.dto';
import { LookupQueryParamDto } from './dto/lookup-query-param.dto';
import { LookupDto } from './dto/lookup.dto';
import { Lookupservice } from './lookup.service';

@ApiTags('Lookup')
@Controller()
export class LookupController {
    constructor(private readonly lookupService: Lookupservice) {}

    @Get('all')
    @ApiOperation({ summary: 'Get lookup list.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [LookupDto],
    })
    findAllLookupByCodeList(
        @Query() query: LookupListQueryParamDto,
    ): Promise<LookupListDto> {
        return this.lookupService.findAllByCodeList(query.codeList);
    }

    @Get()
    @ApiOperation({ summary: 'Get lookups.' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [LookupDto],
    })
    findAllLookupByCode(
        @Query() query: LookupQueryParamDto,
    ): Promise<LookupDto[]> {
        return this.lookupService.findAllByCode(query.code);
    }
}
