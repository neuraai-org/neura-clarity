import { Controller, Post } from "@nestjs/common";

@Controller("privacy")
export class ExportController {
  @Post("export")
  startExport(): {
    status: "accepted";
    exportJobId: string;
  } {
    return {
      status: "accepted",
      exportJobId: "export-job-1",
    };
  }
}
