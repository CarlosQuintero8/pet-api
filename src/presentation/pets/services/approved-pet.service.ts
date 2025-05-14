import { PetPost, PetPostStatus } from '../../../data';
import { FinderPetService } from './finder-pet.service';

export class ApprovePetPostService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string) {
    const petPost = await this.finderPetService.executeByFindOne(id);

    if (petPost.status === PetPostStatus.APPROVED) {
      return {
        message: 'Pet post already approved',
      };
    }
    
    petPost.status = PetPostStatus.APPROVED;
    
    try {
      await petPost.save();
      return {
        message: 'Pet post approved successfully',
      };
    } catch (error) {
      throw new Error('Error approving pet post');
    }
  }
}