import { User } from '../../../data';

export class DeleteUserService {
  async execute(id: string) {
    const user = await User.findOne({ where: { id } });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Soft delete (cambiar status a false)
    user.status = false;
    await user.save();
    
    return { message: 'User deleted successfully' };
  }
}