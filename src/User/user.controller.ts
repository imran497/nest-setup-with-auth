import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/auth.guard';
import { SignupDTO } from 'src/DTO/signup.dto';
import { UserDTO } from 'src/DTO/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() signupData: SignupDTO): Promise<{ success: boolean, data: UserDTO }> {
    const data = await this.userService.createUser(signupData)
    return { success: true, data }
  }

  @Post('login')
  async loginUser(@Body() loginData: SignupDTO): Promise<{ success: boolean, data: { userData: UserDTO, tkn: string }}> {
    const { data } = await this.userService.loginUser(loginData)
    return { success: true, data }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req: { username: string }): Promise<{ success: boolean, data: UserDTO}> {
    const { username } = req
    const userData = await this.userService.getUser(username)
    return { success: true, data: userData }
  }
}
