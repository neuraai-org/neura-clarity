import { Body, Controller, Post } from "@nestjs/common";

type FollowupDraftRequest = {
  actionId: string;
  audience: string;
};

@Controller("actions/followups")
export class FollowupDraftsController {
  @Post("draft")
  createDraft(@Body() body: FollowupDraftRequest): {
    actionId: string;
    audience: string;
    draft: string;
  } {
    return {
      actionId: body.actionId,
      audience: body.audience,
      draft: `Hi ${body.audience}, quick follow-up on action ${body.actionId}.`,
    };
  }
}
