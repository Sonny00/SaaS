import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString() // Prisma attend un DateTime, utilisez "Date" si nécessaire
  @IsNotEmpty()
  date: string;

  @IsEnum(['NON_TRAITE', 'EN_COURS', 'TRAITE', 'URGENT'])
  status: 'NON_TRAITE' | 'EN_COURS' | 'TRAITE' | 'URGENT';

  @IsEnum(['BASSE', 'MOYENNE', 'HAUTE'])
  priority: 'BASSE' | 'MOYENNE' | 'HAUTE';
}
