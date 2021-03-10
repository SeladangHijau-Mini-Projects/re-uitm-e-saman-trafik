import { ResponseDTO } from 'src/common/dto/response.dto';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

class ResponseOption {
    isArray: boolean = false;
}

// eslint-disable-next-line
export const ApiResponseTyped = <TModel extends Type<any>>(
    model: TModel,
    option: ResponseOption = { isArray: true },
) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDTO) },
                    {
                        properties: {
                            data: option.isArray
                                ? {
                                      type: 'array',
                                      items: {
                                          $ref: getSchemaPath(model),
                                      },
                                  }
                                : {
                                      $ref: getSchemaPath(model),
                                  },
                        },
                    },
                ],
            },
        }),
    );
};
