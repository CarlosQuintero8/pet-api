import { IsString, IsNotEmpty, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreatePetDto {
  @IsString({ message: 'El nombre de la mascota debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre de la mascota es requerido' })
  @MinLength(2, { message: 'El nombre de la mascota debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre de la mascota no puede exceder los 50 caracteres' })
  pet_name: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
  description: string;

  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @IsNotEmpty({ message: 'La URL de la imagen es requerida' })
  @MaxLength(255, { message: 'La URL de la imagen no puede exceder los 255 caracteres' })
  image_url: string;
}