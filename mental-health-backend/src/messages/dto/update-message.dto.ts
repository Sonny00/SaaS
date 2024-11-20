import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()  // Validation simple sans message personnalisé
  date?: string;

  @IsOptional()
  @IsEnum(['EN_COURS', 'TRAITE', ])
  status?: 'EN_COURS' | 'TRAITE';

  @IsOptional()
  @IsEnum(['BASSE', 'MOYENNE', 'HAUTE','URGENT'])
  priority?: 'BASSE' | 'MOYENNE' | 'HAUTE'  | 'URGENT';
}
