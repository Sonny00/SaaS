import { IsString, IsOptional, IsEnum, IsBoolean, IsDateString } from 'class-validator';

// Enum pour gérer les différents statuts
export enum InterviewRequestStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  ARCHIVED = 'archived'
}

export class UpdateInterviewRequestDto {
  @IsOptional()
  @IsDateString()
  date?: string;  // Optionnel : nouvelle date de l'entretien

  @IsOptional()
  @IsString()
  time?: string;  // Optionnel : nouvelle heure de l'entretien

  @IsOptional()
  @IsString()
  questionnaire?: string;  // Optionnel : questionnaire associé mis à jour

  @IsOptional()
  @IsEnum(InterviewRequestStatus)
  status?: InterviewRequestStatus;  // Optionnel : statut de la demande ('pending', 'confirmed', 'declined', 'archived')

  @IsOptional()
  @IsBoolean()
  archived?: boolean;  // Optionnel : mise à jour de l'archivage de la demande
}
