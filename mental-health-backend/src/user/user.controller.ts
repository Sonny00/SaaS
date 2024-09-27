import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')  // Le chemin de base pour ce contrôleur
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')  // Route pour créer un nouvel utilisateur
  async register(@Body() body: { email: string; password: string; name?: string }) {
    const { email, password, name } = body;
    const newUser = await this.userService.createUser(email, password, name);
    return { message: 'User created successfully', user: newUser };
  }

  @Post('login') 
  @HttpCode(HttpStatus.OK)  
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new Error("Informations d'identification invalides"); 
    return this.userService.login(user);
  }
}

}