import { Injectable } from "@nestjs/common";

type PrepSection = {
  title: string;
  bullets: string[];
};

@Injectable()
export class PrepPayloadService {
  buildPayload(): { sections: PrepSection[]; sectionLimit: number } {
    const sectionLimit = 4;
    const sections: PrepSection[] = [
      { title: "Context", bullets: ["Recent meeting summary"] },
      { title: "Open Loops", bullets: ["Pending decision on hiring"] },
      { title: "Proposed Agenda", bullets: ["Top 3 priorities"] },
      { title: "Questions", bullets: ["What support is needed?"] },
    ];

    return {
      sections: sections.slice(0, sectionLimit),
      sectionLimit,
    };
  }
}
