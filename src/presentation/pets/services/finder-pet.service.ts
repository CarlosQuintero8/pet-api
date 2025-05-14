import { PetPost, PetPostStatus } from "../../../data";

export class FinderPetService {
    async executeByFindAll() {
      return await PetPost.find({
        where: {
          status: PetPostStatus.APPROVED,
          hasFound: false,
        },
      });
    }

    async executeByFindOne(id: string) {
      const petPost = await PetPost.findOne({
        where: {
          id,
        },
      });

      if (!petPost) {
        throw new Error("Pet post not found");
      }

      return petPost;
    }
}
