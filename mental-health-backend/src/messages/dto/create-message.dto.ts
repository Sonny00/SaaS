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

  @IsEnum([ 'EN_COURS', 'TRAITE',])
  status: 'EN_COURS' | 'TRAITE';

  @IsEnum(['BASSE', 'MOYENNE', 'HAUTE', 'URGENT'])
  priority: 'BASSE' | 'MOYENNE' | 'HAUTE' | 'URGENT';
}
