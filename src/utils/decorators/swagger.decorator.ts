import { applyDecorators, Type } from '@nestjs/common';
import { ApiQuery, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface Response {
  status: number;
  description: string;
  type?: Type<any>;
}

interface SwaggerDocsOptions {
  summary: string;
  description?: string;
  method: HttpMethod;
  bodyType?: Type<any>;
  queryParams?: string[];
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
    options.queryParams.forEach((param: string): void => {
      decorators.push(ApiQuery({ name: param, required: false }));
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
