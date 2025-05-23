import { FinderPetService } from "./finder-pet.service";

export class UpdatePetService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string, data: any) {
    try {
      const petPost = await this.finderPetService.executeByFindOne(id);

      // Verificar si petPost existe
      if (!petPost) {
        throw new Error('Pet post not found');
      }

      // Actualizar solo los campos proporcionados y válidos
      if (typeof data.pet_name === 'string' && data.pet_name.trim() !== '') {
        petPost.pet_name = data.pet_name.trim().toLowerCase();
      }
      
      if (typeof data.description === 'string' && data.description.trim() !== '') {
        petPost.description = data.description.trim().toLowerCase();
      }
      
      if (typeof data.image_url === 'string' && data.image_url.trim() !== '') {
        petPost.image_url = data.image_url.trim();
      }

      await petPost.save();
      
      return {
        message: "Pet post updated successfully",
        data: petPost
      };
    } catch (error: any) {
      console.error("Error updating pet post:", error);
      throw new Error(`Failed to update pet post: ${error.message || 'Error desconocido'}`);
    }
  }
}