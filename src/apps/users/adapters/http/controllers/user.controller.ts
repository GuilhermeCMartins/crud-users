import { ZodValidationPipe } from "@common/pipes/zod-validation.pipe";
import { Body, Controller, Post } from "@nestjs/common";
import {
  type CreateUserInput,
  createUserInput,
} from "@schemas/user/create-user-input";

@Controller("users")
export class UserController {
  @Post()
  create(@Body(new ZodValidationPipe(createUserInput)) body: CreateUserInput) {
    return {
      message: "Usuário criado com sucesso!",
      user: body,
    };
  }
}
