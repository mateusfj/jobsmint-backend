import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  inputCreateCompanyDTO,
  outputCreateCompanyDTO,
} from 'src/core/application/use-cases/company/create-company/create.company.dto';
import { IAddress } from 'src/core/domain/value-objects/address/entity/address.entity';

class AddressDto implements IAddress {
  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  number: number;

  @ApiProperty({ example: 'Rua Exemplo' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 'Bairro Exemplo' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ example: 'Complemento Exemplo' })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({ example: 'Cidade Exemplo' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Estado Exemplo' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '12345-678' })
  @IsString()
  @IsNotEmpty()
  zip_code: string;
}

export class CreateCompanyDto implements inputCreateCompanyDTO {
  @ApiProperty({ example: 'owner_id-uuid' })
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @ApiProperty({ example: 'Empresa S/A' })
  @IsString()
  @IsNotEmpty()
  corporate_reason: string;

  @ApiProperty({ example: 'Nome Fantasia' })
  @IsString()
  @IsNotEmpty()
  fantasy_name: string;

  @ApiProperty({ example: 'Indústria' })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: '(99) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;
}

export class CreateCompanyResponseDto implements outputCreateCompanyDTO {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  user_id: string;

  @ApiProperty({ example: 'Empresa S/A' })
  corporate_reason: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  cnpj: string;

  @ApiProperty({ example: 'Descrição da empresa' })
  description: string;

  @ApiProperty({ example: 'https://empresa.com' })
  website?: string | null;

  @ApiProperty({ example: 'https://empresa.com/logo.png' })
  logo_url?: string | null;
}
