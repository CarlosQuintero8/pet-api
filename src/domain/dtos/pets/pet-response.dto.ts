import { Expose } from 'class-transformer';
import { PetPostStatus } from '../../../data';

export class PetResponseDto {
  @Expose()
  id: string;

  @Expose()
  pet_name: string;

  @Expose()
  description: string;

  @Expose()
  image_url: string;

  @Expose()
  status: PetPostStatus;

  @Expose()
  hasFound: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  owner: string;
}