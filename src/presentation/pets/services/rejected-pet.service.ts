import { FinderPetService } from './finder-pet.service';
import { PetPostStatus } from '../../../data';

export class RejectPetPostService {
  constructor(
    private readonly finderPetService: FinderPetService
  ) {}

  async execute(id: string) {
    const petPost = await this.finderPetService.executeByFindOne(id);
    
    if (petPost.status === PetPostStatus.REJECTED) {
      return {
        message: 'Pet post already rejected',
      };
    }
    
    petPost.status = PetPostStatus.REJECTED;
    
    try {
      await petPost.save();
      return {
        message: 'Pet post rejected successfully',
      };
    } catch (error) {
      throw new Error('Error rejecting pet post');
    }
  }
}