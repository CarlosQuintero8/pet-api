import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePetDto, PetResponseDto } from '../../domain/dtos/pets';
import { UpdatePetPostStatusService } from './services/update-pet-post-status.service';
import { CreatorPetService } from './services/create-pet.service';
import { FinderPetService } from './services/finder-pet.service';
import { DeletePetService } from './services/delete-pet.service';
import { UpdatePetService } from './services/update-pet.service';
import { ApprovePetPostService } from './services/approved-pet.service';
import { RejectPetPostService } from './services/rejected-pet.service';

export class PetPostController {
  constructor(
    private readonly updatePetPostStatusService: UpdatePetPostStatusService = new UpdatePetPostStatusService(),
    private readonly creatorPetService: CreatorPetService = new CreatorPetService(),
    private readonly finderPetService: FinderPetService = new FinderPetService(),
    private readonly deletePetService: DeletePetService = new DeletePetService(new FinderPetService()),
    private readonly updatePetService: UpdatePetService = new UpdatePetService(new FinderPetService()),
    private readonly approvePetPostService: ApprovePetPostService = new ApprovePetPostService(new FinderPetService()),
    private readonly rejectPetPostService: RejectPetPostService = new RejectPetPostService(new FinderPetService())
  ) {}

  findAllPets = async (req: Request, res: Response) => {
    try {
      const pets = await this.finderPetService.executeByFindAll();
      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  createPet = async (req: Request, res: Response) => {
    try {
      const createPetDto = plainToClass(CreatePetDto, req.body);
      const errors = await validate(createPetDto);
      if (errors.length > 0) {
        return res.status(400).json({ message: 'Datos inválidos', errors });
      }

      if (!req.user?.id) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      const result = await this.creatorPetService.execute(createPetDto, req.user.id);
      return res.status(201).json(result);
    } catch (error: any) {
      console.error('Error in createPet:', error);
      return res.status(500).json({ message: `Error al crear el post: ${error.message || 'Error desconocido'}` });
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const pet = await this.finderPetService.executeByFindOne(id);
      return res.status(200).json(pet);
    } catch (error: any) {
      if (error.message === 'Pet post not found') {
        return res.status(404).json({ message: 'Post de mascota no encontrado' });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.updatePetService.execute(id, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message.includes('Pet post not found')) {
        return res.status(404).json({ message: 'Post de mascota no encontrado' });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.deletePetService.execute(id);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message.includes('Pet post not found')) {
        return res.status(404).json({ message: 'Post de mascota no encontrado' });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  approvePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.approvePetPostService.execute(id);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Pet post not found') {
        return res.status(404).json({ message: 'Post de mascota no encontrado' });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  rejectPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.rejectPetPostService.execute(id);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Pet post not found') {
        return res.status(404).json({ message: 'Post de mascota no encontrado' });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
}