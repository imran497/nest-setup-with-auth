import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { randomAlphaNumeric } from "src/Common/randomAlphaNumeric";
import { SignupDTO } from "src/DTO/signup.dto";
import { UserDTO } from "src/DTO/user.dto";
import { UserEntity } from "src/Entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) { }

  async createUser(signupData: SignupDTO): Promise<UserEntity> {
    const {
      email,
      pwd
    } = signupData

    const isEmailExistRes = await this.isEmailExist(email)
    const username = await this.generateUsername()
    if (isEmailExistRes) throw new HttpException('Email already exist', 200)

    const hashedPassword = await bcrypt.hash(pwd, 10)

    const newUser = this.userRepo.create({
      email,
      pwd: hashedPassword,
      username
    })

    const userData = await this.userRepo.save(newUser)

    return plainToInstance(UserDTO, userData)
  }

  async loginUser(loginData: SignupDTO): Promise<{ data: { userData: UserDTO, tkn: string } }> {
    const {
      email,
      pwd
    } = loginData

    const user = await this.validateUser(email, pwd)

    if (!user) throw new HttpException('Invalid Credentials', 200)
    
    const userData = plainToInstance(UserDTO, user)
    const jwtPayload = { username: userData.username }
    const accessToken = this.jwtService.sign(jwtPayload)

    return { data: { userData, tkn: accessToken } }
  }

  async isEmailExist(email: string): Promise<boolean> {
    const data = await this.userRepo.findBy({
      email
    })
    if (data.length) return true
    return false
  }

  async isUsernameExist(username: string): Promise<boolean> {
    const data = await this.userRepo.findBy({
      username
    })
    if (data.length) return true
    return false
  }

  async generateUsername(): Promise<string> {
    const randomUserId = randomAlphaNumeric(10)
    const boolRes = await this.isUsernameExist(randomUserId)
    if (boolRes) this.generateUsername()
    return randomUserId
  }

  async getUser(username: string): Promise<UserEntity | null> {
    const userData = await this.userRepo.findOne({
      where: {
        username
      },
    })

    if (!userData) return null

    return plainToInstance(UserDTO, userData)
  }

  async validateUser(email: string, pwd: string): Promise<any> {
    const userData = await this.userRepo.findOne({
      where: {
        email
      },
    })
    if (userData && (await bcrypt.compare(pwd, userData.pwd))) {
      return userData
    }
    return null;
  }
}