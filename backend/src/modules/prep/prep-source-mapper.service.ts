import { Injectable } from "@nestjs/common";

type PrepItem = {
  text: string;
  sourceId: string;
  sourceType: "meeting_description" | "note" | "calendar_metadata";
};

@Injectable()
export class PrepSourceMapperService {
  mapWithReceipts(items: PrepItem[]): Array<PrepItem & { receipt: string }> {
    return items.map((item) => ({
      ...item,
      receipt: `${item.sourceType}:${item.sourceId}`,
    }));
  }
}
