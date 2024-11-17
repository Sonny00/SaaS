import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString() // Si Prisma attend une DateTime, ajustez ici
  date?: string;

  @IsOptional()
  @IsEnum(['NON_TRAITE', 'EN_COURS', 'TRAITE', 'URGENT'])
  status?: 'NON_TRAITE' | 'EN_COURS' | 'TRAITE' | 'URGENT';

  @IsOptional()
  @IsEnum(['BASSE', 'MOYENNE', 'HAUTE'])
  priority?: 'BASSE' | 'MOYENNE' | 'HAUTE';
}
