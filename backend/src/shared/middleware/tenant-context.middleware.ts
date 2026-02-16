import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import type { NextFunction, Request, Response } from "express";

export type TenantContext = {
  workspaceId: string;
  userId: string;
};

declare module "express-serve-static-core" {
  interface Request {
    tenantContext?: TenantContext;
  }
}

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const workspaceId = req.header("x-workspace-id") ?? randomUUID();
    const userId = req.header("x-user-id") ?? randomUUID();

    req.tenantContext = { workspaceId, userId };
    next();
  }
}
