import { Request, Response } from "express";
import { CreatorPetService } from "./services/create-pet.service";
import { FinderPetService } from "./services/finder-pet.service";
import { DeletePetService } from "./services/delete-pet.service";
import { UpdatePetService } from "./services/update-pet.service";
import { ApprovePetPostService } from "./services/approved-pet.service";
import { RejectPetPostService } from "./services/rejected-pet.service";

export class PetController {
  constructor(
    private readonly creatorPetService: CreatorPetService,
    private readonly finderPetService: FinderPetService,
    private readonly deletePetService: DeletePetService,
    private readonly updatePetService: UpdatePetService,
    private readonly approvePetPostService: ApprovePetPostService,
    private readonly rejectPetPostService: RejectPetPostService
  ) {}

  createPet = (req: Request, res: Response) => {
    const data = req.body;

    this.creatorPetService
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findAllPets = (req: Request, res: Response) => {
    this.finderPetService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPetService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.deletePetService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Logs mejorados para depuración
    console.log('=== INICIO DE ACTUALIZACIÓN ===');
    console.log('ID recibido:', id);
    console.log('Headers:', JSON.stringify(req.headers));
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body completo:', JSON.stringify(req.body));
    console.log('Tipo de body:', typeof req.body);
    
    // Verificar si el body está vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('Error: Body vacío o inválido');
      return res.status(400).json({
        message: 'Error al actualizar la publicación',
        error: 'No se proporcionaron datos para actualizar'
      });
    }
    
    this.updatePetService
      .execute(id, req.body)
      .then((result) => {
        console.log('Actualización exitosa:', result);
        res.status(200).json(result);
      })
      .catch((error) => {
        console.error('Error en controlador:', error);
        console.error('Stack de error:', error.stack);
        res.status(500).json({ 
          message: 'Error al actualizar la publicación',
          error: error.message 
        });
      });
    console.log('=== FIN DE SOLICITUD DE ACTUALIZACIÓN ===');
  };

  approve = (req: Request, res: Response) => {
    const { id } = req.params;

    this.approvePetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  reject = (req: Request, res: Response) => {
    const { id } = req.params;

    this.rejectPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };
}
