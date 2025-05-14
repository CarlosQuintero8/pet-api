import { PetPost } from '../../../data';

export class CreatorPetService {
  async execute(data: any) {
    const pet = new PetPost();
    pet.pet_name = data.pet_name?.trim().toLowerCase() || '';
    pet.description = data.description?.trim().toLowerCase() || '';
    pet.image_url = data.image_url?.trim() || '';

    pet.owner = data.owner || '76872118-50f5-41f9-8a39-1f2ea24df876';

    try {
      await pet.save();
      return {
        message: "Pet created successfully",
      };
    } catch (error) {
      console.error("Error creating pet:", error);
      throw new Error("Failed to create pet");
    }
  }
}
