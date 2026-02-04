// Legal documents and references for Nigerian insurance
export interface LegalDocument {
  id: string;
  title: string;
  shortTitle: string;
  type: "act" | "guideline" | "circular";
  source: string;
  year: number;
  sections: LegalSection[];
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  content: string;
  keywords: string[];
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "insurance-act-2003",
    title: "Insurance Act 2003",
    shortTitle: "Insurance Act",
    type: "act",
    source: "Federal Republic of Nigeria",
    year: 2003,
    sections: [
      {
        id: "ia-s50",
        number: "Section 50",
        title: "Claims Settlement",
        content: "An insurer shall settle all claims arising from a policy issued by it within ninety (90) days from the date the claim is made, provided that all required documentation has been submitted by the insured. Failure to settle within this period without just cause shall attract penalties as specified by the Commission.",
        keywords: ["claims", "settlement", "90 days", "timeline", "penalty"],
      },
      {
        id: "ia-s51",
        number: "Section 51",
        title: "Rejection of Claims",
        content: "Where an insurer rejects a claim, it shall communicate the rejection in writing to the insured within thirty (30) days, stating clearly the grounds for such rejection with reference to the specific policy terms or conditions that have not been met.",
        keywords: ["rejection", "denial", "grounds", "written notice"],
      },
      {
        id: "ia-s52",
        number: "Section 52",
        title: "Right of Appeal",
        content: "An insured who is dissatisfied with the decision of an insurer regarding a claim may appeal to the Commission within six (6) months of receiving the insurer's decision. The Commission shall investigate and make a determination within sixty (60) days.",
        keywords: ["appeal", "dispute", "NAICOM", "complaint"],
      },
      {
        id: "ia-s53",
        number: "Section 53",
        title: "Policy Documentation",
        content: "Every insurer shall provide the insured with a copy of the policy document within thirty (30) days of the commencement of the policy. The document shall be written in clear and simple language that the insured can understand.",
        keywords: ["policy", "document", "copy", "language"],
      },
      {
        id: "ia-s64",
        number: "Section 64",
        title: "Consumer Protection",
        content: "The Commission shall establish mechanisms for the protection of insurance consumers including the handling of complaints, resolution of disputes, and enforcement of fair treatment standards by insurers.",
        keywords: ["consumer", "protection", "complaint", "fair treatment"],
      },
    ],
  },
  {
    id: "naicom-guidelines-2019",
    title: "NAICOM Market Conduct Guidelines 2019",
    shortTitle: "NAICOM Guidelines",
    type: "guideline",
    source: "National Insurance Commission",
    year: 2019,
    sections: [
      {
        id: "nai-g1",
        number: "Guideline 3.1",
        title: "Fair Treatment of Customers",
        content: "Insurers shall treat customers fairly at all stages of the insurance relationship. This includes providing clear information, acting in the customer's best interest, and ensuring products meet customer needs.",
        keywords: ["fair treatment", "customer", "relationship"],
      },
      {
        id: "nai-g2",
        number: "Guideline 4.2",
        title: "Claims Handling Standards",
        content: "Insurers shall handle all claims fairly, transparently, and promptly. Claims shall be acknowledged within 3 working days of receipt, and regular updates shall be provided to the claimant at least every 14 days.",
        keywords: ["claims", "handling", "acknowledgment", "updates"],
      },
      {
        id: "nai-g3",
        number: "Guideline 4.5",
        title: "Escalation Procedures",
        content: "Insurers shall maintain clear escalation procedures for complex or disputed claims. Customers shall be informed of their right to escalate complaints to NAICOM if internal resolution is not satisfactory.",
        keywords: ["escalation", "dispute", "NAICOM", "complaint"],
      },
      {
        id: "nai-g4",
        number: "Guideline 5.1",
        title: "Communication Standards",
        content: "All communications with customers shall be clear, fair, and not misleading. Technical insurance terms shall be explained in plain language. Communications shall be made in a language the customer understands.",
        keywords: ["communication", "plain language", "clarity"],
      },
    ],
  },
  {
    id: "naicom-circular-2022",
    title: "NAICOM Circular on Digital Insurance Operations",
    shortTitle: "Digital Insurance Circular",
    type: "circular",
    source: "National Insurance Commission",
    year: 2022,
    sections: [
      {
        id: "nai-c1",
        number: "Paragraph 4",
        title: "Digital Claims Processing",
        content: "Insurers may accept claims submissions through digital channels including mobile applications, websites, and messaging platforms. Digital submissions shall be treated with the same urgency and validity as physical submissions.",
        keywords: ["digital", "claims", "mobile", "online"],
      },
      {
        id: "nai-c2",
        number: "Paragraph 7",
        title: "AI and Automation",
        content: "The use of artificial intelligence and automated systems in claims processing is permitted provided that human oversight is maintained and customers retain the right to request human review of automated decisions.",
        keywords: ["AI", "automation", "human review"],
      },
    ],
  },
];

export function searchLegalDocuments(query: string): LegalSection[] {
  const queryLower = query.toLowerCase();
  const results: LegalSection[] = [];

  for (const doc of legalDocuments) {
    for (const section of doc.sections) {
      const matchesKeyword = section.keywords.some((kw) =>
        kw.toLowerCase().includes(queryLower)
      );
      const matchesContent = section.content.toLowerCase().includes(queryLower);
      const matchesTitle = section.title.toLowerCase().includes(queryLower);

      if (matchesKeyword || matchesContent || matchesTitle) {
        results.push(section);
      }
    }
  }

  return results;
}

export function getLegalReference(intentType: string): LegalSection | null {
  const mappings: Record<string, string> = {
    claim_status: "ia-s50",
    claim_rejection: "ia-s51",
    appeal: "ia-s52",
    complaint: "nai-g3",
    timeline: "ia-s50",
    documents: "ia-s53",
    rights: "ia-s64",
  };

  const sectionId = mappings[intentType];
  if (!sectionId) return null;

  for (const doc of legalDocuments) {
    const section = doc.sections.find((s) => s.id === sectionId);
    if (section) return section;
  }

  return null;
}
