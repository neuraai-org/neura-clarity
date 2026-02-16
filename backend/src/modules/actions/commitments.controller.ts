import { Controller, Param, Post } from "@nestjs/common";

@Controller("commitments")
export class CommitmentsController {
  @Post(":id/confirm")
  confirmCommitment(@Param("id") id: string): { id: string; status: "confirmed"; confirmedAt: string } {
    return {
      id,
      status: "confirmed",
      confirmedAt: new Date().toISOString(),
    };
  }
}
