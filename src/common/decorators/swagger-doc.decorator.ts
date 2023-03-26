import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const swaggerDoc = (data: string) => {
  switch (data) {
    case 'auth':
      return applyDecorators(
        ApiOkResponse({ description: 'Return the created token' }),
        ApiUnauthorizedResponse({ description: 'Login error by credentials' }),
        ApiBadRequestResponse({ description: 'Login error by credentials' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
    case 'register':
      return applyDecorators(
        ApiCreatedResponse({
          description: 'Creation of a new register',
        }),
        ApiBadRequestResponse({ description: 'Input request contain errors' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
    case 'post':
      return applyDecorators(
        ApiCreatedResponse({
          description: 'Creation of a new register',
        }),
        ApiBearerAuth(),
        ApiBadRequestResponse({ description: 'Input request contain errors' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
    case 'get':
      return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({ description: 'Return the requested object' }),
        ApiBadRequestResponse({ description: 'Input request contain errors' }),
        ApiNotFoundResponse({ description: 'OBject is not found' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
    case 'seed':
      return applyDecorators(
        ApiOkResponse({ description: 'Return the requested object' }),
        ApiBadRequestResponse({ description: 'Input request contain errors' }),
        ApiNotFoundResponse({ description: 'OBject is not found' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
    case 'patch':
      return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({ description: 'Creation of a new register' }),
        ApiBadRequestResponse({ description: 'Input request contain errors' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
    case 'delete':
      return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({ description: 'result of the elimination' }),
        ApiBadRequestResponse({ description: 'Input request contain errors' }),
        ApiInternalServerErrorResponse({
          description: 'Internal server error',
        }),
      );
  }
};
