import {
  IsOptional,
  registerDecorator,
  ValidationOptions,
  IsNotEmpty,
  IsString,
  IsMobilePhone,
  IsEmail,
  IsStrongPassword,
  IsDate,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';

function validateCPF(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isValidCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const cpf = String(value).replace(/[^\d]+/g, '');
          if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
          let sum = 0;
          for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
          let rest = (sum * 10) % 11;
          if (rest === 10 || rest === 11) rest = 0;
          if (rest !== parseInt(cpf.charAt(9))) return false;

          sum = 0;
          for (let i = 0; i < 10; i++)
            sum += parseInt(cpf.charAt(i)) * (11 - i);
          rest = (sum * 10) % 11;
          if (rest === 10 || rest === 11) rest = 0;

          return rest === parseInt(cpf.charAt(10));
        },

        defaultMessage: () => 'O campo CPF é inválido.',
      },
    });
  };
}

function validateName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidNameReal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          const trimmed = value.trim().replace(/\s+/g, ' ');
          if (trimmed.length < 5) return false;
          const nameRegex = /^[A-Za-zÀ-ú]+([ '-][A-Za-zÀ-ú]+)+$/;
          const parts = trimmed.split(' ');
          const validParts = parts.filter((p) => p.length >= 2);

          return nameRegex.test(trimmed) && validParts.length >= 2;
        },
        defaultMessage() {
          return 'O nome deve conter pelo menos nome e sobrenome, apenas letras e espaços, e sem números.';
        },
      },
    });
  };
}

export function IsValidDateString() {
  return applyDecorators(
    IsNotEmpty({
      message: (args) =>
        `O campo ${args.property} é obrigatório. Valor recebido: ${args.value}`,
    }),
    IsDate({
      message: (args) =>
        `O campo ${args.property} deve ser uma data válida. Valor recebido: ${args.value}`,
    }),
    Type(() => Date),
  );
}

export function IsValidEmail() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo email é obrigatório.' }),
    IsEmail({}, { message: 'O campo email é inválido.' }),
  );
}

export function IsCPF() {
  return applyDecorators(
    Transform(({ value }: { value: string }): string =>
      value.replace(/[^\d]/g, ''),
    ),
    IsNotEmpty({ message: 'O campo CPF é obrigatório.' }),
    IsString({ message: 'O campo CPF deve conter o formato XXX.XXX.XXX-XX.' }),
    validateCPF(),
  );
}

export function IsOptionalMobilePhoneNumber() {
  return applyDecorators(IsOptional(), IsMobilePhone('pt-BR'));
}

export function IsNotEmptyMobilePhoneNumber() {
  return applyDecorators(
    IsNotEmpty({
      message: (args) => `O campo ${args.property} telefone é obrigatório.`,
    }),
    IsMobilePhone('pt-BR'),
  );
}

export function IsPassword() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo senha é obrigatório.' }),
    IsStrongPassword(
      {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      },
      {
        message:
          'A senha precisa ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.',
      },
    ),
  );
}

export function IsValidName() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo nome é obrigatório.' }),
    validateName(),
  );
}
