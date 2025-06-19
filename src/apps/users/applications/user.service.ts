import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, type Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { UserRoleEnum } from "../models/user.types";
import type { CreateUserInput } from "@schemas/user/create-user-input";
import type { UpdateUserInput } from "@schemas/user/update-user-input";
import { getDateNDaysAgo } from "src/utils/date";
import { BaseService } from "@common/base-service";
import { verifyPermission } from "@common/verify-permission";

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async create(data: CreateUserInput): Promise<User> {
    this.logger.info(`Criando usuário: ${data.email}`);

    await this.ensureEmailIsUnique(data.email);

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.nome,
      role: UserRoleEnum.USER,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }

  async updateUser(
    id: string,
    data: UpdateUserInput,
    requester: User,
  ): Promise<User> {
    const user = await this.findById(id);

    verifyPermission(requester, "update", , user.id);

    if (data.email && data.email !== user.email) {
      await this.ensureEmailIsUnique(data.email);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  async deleteUser(id: string, requester: User): Promise<void> {
    verifyPermission(requester, "delete");

    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async findInactiveUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: { updatedAt: LessThan(getDateNDaysAgo(30)) },
    });
  }

  private async ensureEmailIsUnique(email: string) {
    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) {
      this.logger.warn(`Email já cadastrado: ${email}`);
      throw new ForbiddenException("Email já cadastrado");
    }
  }
}
