import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  // Errores de autenticación
  ALREADY_EXIST_EMAIL = 'AUTH_001',
  NOT_FOUND_EMAIL = 'AUTH_002',
  NOT_ALLOWED_SOCIAL_USER = 'AUTH_003',
  VERIFICATION_EMAIL_TOKEN_FAILED = 'AUTH_004',
  INCORRECT_EMAIL_OR_PASSWORD = 'AUTH_005',

  // Errores de usuario
  USER_NOT_FOUND = 'USER_001',
  SAME_ORIGINAL_PASSWORD = 'USER_002',

  // Errores de author
  AUTHOR_NOT_FOUND = 'AUTHOR_001',

  // Errores de imagen
  IMAGE_NOT_FOUND = 'IMAGE_001',

  // Otros errores generales
  INTERNAL_SERVER_ERROR = 'SERVER_001',
  BAD_REQUEST = 'COMMON_001',
  FORBIDDEN = 'COMMON_002',
  UNAUTHORIZED = 'COMMON_003',
}

export const ErrorCodeMap: Record<
  ErrorCode,
  { status: HttpStatus; message: string }
> = {
  [ErrorCode.ALREADY_EXIST_EMAIL]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'El correo electrónico ya está registrado.',
  },
  [ErrorCode.NOT_FOUND_EMAIL]: {
    status: HttpStatus.NOT_FOUND,
    message: 'El correo electrónico no está registrado.',
  },
  [ErrorCode.NOT_ALLOWED_SOCIAL_USER]: {
    status: HttpStatus.FORBIDDEN,
    message:
      'Los usuarios de inicio de sesión social no pueden restablecer la contraseña.',
  },
  [ErrorCode.VERIFICATION_EMAIL_TOKEN_FAILED]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'La verificación del token de correo electrónico ha fallado.',
  },
  [ErrorCode.INCORRECT_EMAIL_OR_PASSWORD]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Correo electrónico o contraseña incorrectos.',
  },

  // Errores de usuario
  [ErrorCode.USER_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Usuario no encontrado.',
  },
  [ErrorCode.SAME_ORIGINAL_PASSWORD]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'La nueva contraseña no puede ser igual a la contraseña original.',
  },

  // Errores de author
  [ErrorCode.AUTHOR_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Author no encontrado.',
  },

  // Errores de imagen
  [ErrorCode.IMAGE_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Imagen no encontrada.',
  },

  // Otros errores generales
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Se ha producido un error interno del servidor.',
  },
  [ErrorCode.BAD_REQUEST]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Solicitud inválida.',
  },
  [ErrorCode.FORBIDDEN]: {
    status: HttpStatus.FORBIDDEN,
    message: 'Acceso denegado.',
  },
  [ErrorCode.UNAUTHORIZED]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'No autorizado.',
  },
};
