import type { User } from "@apps/users/models/user.model";
import { UserRoleEnum } from "@apps/users/models/user.types";
import { ForbiddenException } from "@nestjs/common";

export type Action = "update" | "delete";

// @TO-DO: Make this function more simple and more generic
export function verifyPermission(
  requester: User,
  action: Action,
  targetUserId?: string,
): void {
  if (action === "update") {
    const canUpdate =
      requester.role === UserRoleEnum.ADMIN || requester.id === targetUserId;

    if (!canUpdate) {
      throw new ForbiddenException(
        "Sem permissão para atualizar outro usuário",
      );
    }
  } else if (action === "delete") {
    if (requester.role !== UserRoleEnum.ADMIN) {
      throw new ForbiddenException(
        "Somente administradores podem excluir usuários",
      );
    }
  } else {
    throw new ForbiddenException(
      "Ação desconhecida para verificação de permissão",
    );
  }
}
