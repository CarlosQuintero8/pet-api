import { PetPost, PetPostStatus } from '../../../data';

export class UpdatePetPostStatusService {
  async execute(id: string, status: PetPostStatus) {
    const petPost = await PetPost.findOne({ where: { id } });
    
    if (!petPost) {
      throw new Error('Pet post not found');
    }
    
    petPost.status = status;
    await petPost.save();
    
    return petPost;
  }
}