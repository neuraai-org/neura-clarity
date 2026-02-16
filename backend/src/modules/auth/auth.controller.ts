import { Body, Controller, Post } from "@nestjs/common";

type SignupDto = {
  email: string;
  password: string;
};

type MagicLinkDto = {
  email: string;
};

@Controller("auth")
export class AuthController {
  @Post("signup")
  signup(@Body() body: SignupDto): { status: "created"; email: string } {
    return {
      status: "created",
      email: body.email,
    };
  }

  @Post("magic-link")
  requestMagicLink(@Body() body: MagicLinkDto): { status: "accepted"; email: string } {
    return {
      status: "accepted",
      email: body.email,
    };
  }
}
