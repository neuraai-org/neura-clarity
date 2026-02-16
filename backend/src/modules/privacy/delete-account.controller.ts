import { Controller, Delete } from "@nestjs/common";

@Controller("privacy")
export class DeleteAccountController {
  @Delete("account")
  deleteAccount(): {
    status: "deleted";
    revokedIntegrations: boolean;
  } {
    return {
      status: "deleted",
      revokedIntegrations: true,
    };
  }
}
