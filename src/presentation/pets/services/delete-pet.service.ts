import { FinderPetService } from "./finder-pet.service";
import { PetPostStatus } from "../../../data";

export class DeletePetService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string) {
    const petPost = await this.finderPetService.executeByFindOne(id);

    // En lugar de cambiar status a false, podemos marcarlo como eliminado de otra manera
    // ya que status es un enum en PetPost
    petPost.hasFound = true; // Marcamos como encontrado para que no aparezca en listados

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
