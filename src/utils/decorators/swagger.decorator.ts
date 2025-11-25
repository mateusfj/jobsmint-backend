import { applyDecorators, Type } from '@nestjs/common';
import { ApiQuery, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface Response {
  status: number;
  description: string;
  type?: Type<any>;
}

interface QueryParamSchema {
  name: string;
  type?: Type<any>;
  enum?: string[];
  required?: boolean;
}

interface SwaggerDocsOptions {
  summary: string;
  description?: string;
  method: HttpMethod;
  bodyType?: Type<any>;
  queryParams?: QueryParamSchema[];
  response?: Response[];
}

export function SwaggerDocs(options: SwaggerDocsOptions) {
  const decorators: MethodDecorator[] = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  if (options.queryParams) {
    options.queryParams.forEach((param): void => {
      decorators.push(
        ApiQuery({
          name: param.name,
          required: param.required ?? false,
          type: param.type,
          enum: param.enum,
        }),
      );
    });
  }

  if (options.response) {
    options.response.forEach((response: Response): void => {
      decorators.push(ApiResponse(response));
    });
  }

  if (['post', 'put', 'patch'].includes(options.method) && options.bodyType) {
    decorators.push(ApiBody({ type: options.bodyType }));
  }

  return applyDecorators(...decorators);
}
