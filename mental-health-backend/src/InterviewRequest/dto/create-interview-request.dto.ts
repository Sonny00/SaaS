import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateInterviewRequestDto {
  @IsString()
  @IsNotEmpty()
  date: string;  // Date de l'entretien (format date)

  @IsString()
  @IsNotEmpty()
  time: string;  // Heure de l'entretien

  @IsString()
  @IsNotEmpty()
  questionnaire: string;  // Type de questionnaire associé

  @IsString()
  @IsNotEmpty()
  status: string;  // Statut de la demande ('pending', 'confirmed', 'declined')

  @IsOptional()
  @IsBoolean()
  archived?: boolean;  // Indicateur si la demande est archivée

  @IsString()
  @IsNotEmpty()
  userId: string;  // Identifiant de l'utilisateur associé
}
