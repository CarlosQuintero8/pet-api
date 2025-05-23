import { CreatePetDto } from '../../../domain/dtos/pets/create-pet.dto';
import { PetResponseDto } from '../../../domain/dtos/pets/pet-response.dto';
import { PetPost, PetPostStatus } from '../../../data';
import { plainToClass } from 'class-transformer';

export class CreatorPetService {
  async execute(dto: CreatePetDto, ownerId: string): Promise<PetResponseDto> {
    try {
      const pet = new PetPost();
      pet.pet_name = dto.pet_name.trim().toLowerCase();
      pet.description = dto.description.trim().toLowerCase();
      pet.image_url = dto.image_url.trim();
      pet.status = PetPostStatus.PENDING;
      pet.owner = ownerId; 
      pet.hasFound = false;
      pet.created_at = new Date(); 

      await pet.save();

      return plainToClass(PetResponseDto, pet);
    } catch (error: any) {
      console.error('Error creating pet:', error);
      throw new Error(`No se pudo crear el post de la mascota: ${error.message || 'Error desconocido'}`);
    }
  }
}