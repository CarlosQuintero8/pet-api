import { PetPost, PetPostStatus } from '../../../data';
import { FinderPetService } from './finder-pet.service';

export class ApprovePetPostService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string) {
    try {
      const petPost = await this.finderPetService.executeByFindOne(id);

      // Verificar si petPost existe
      if (!petPost) {
        throw new Error('Pet post not found');
      }

      if (petPost.status === PetPostStatus.APPROVED) {
        return {
          message: 'Pet post already approved',
        };
      }
      
      petPost.status = PetPostStatus.APPROVED;
      
      await petPost.save();
      return {
        message: 'Pet post approved successfully',
      };
    } catch (error: any) {
      console.error("Error approving pet post:", error);
      throw new Error(`Failed to approve pet post: ${error.message || 'Error desconocido'}`);
    }
  }
}