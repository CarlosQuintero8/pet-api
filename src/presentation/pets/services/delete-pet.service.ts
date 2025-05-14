import { FinderPetService } from "./finder-pet.service";
import { PetPostStatus } from "../../../data";

export class DeletePetService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string) {
    const petPost = await this.finderPetService.executeByFindOne(id);

    
    petPost.hasFound = true; 

    try {
      await petPost.save();
      return {
        message: "Pet post deleted successfully",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete pet post");
    }
  }
}
