import { getClaimById, Claim } from "@/data/claims";
import { getLegalReference, LegalSection, legalDocuments } from "@/data/legalDocuments";

export type IntentType = 
  | "claim_status" 
  | "legal_check" 
  | "document_request" 
  | "escalation" 
  | "greeting"
  | "rights_inquiry"
  | "unknown";

export interface ChatIntent {
  type: IntentType;
  confidence: number;
  entities: {
    claimId?: string;
    topic?: string;
  };
}

export interface ChatResponse {
  message: string;
  intent: ChatIntent;
  claim?: Claim;
  legalRef?: LegalSection;
  legalSource?: string;
  shouldEscalate: boolean;
  language: "english" | "pidgin";
  reasoning?: {
    patternsMatched: string[];
    dataSource: string;
    escalationTriggers?: string[];
  };
}

const pidginPatterns = [
  "wetin", "na", "dey", "abeg", "how far", "wahala", "oga", "una", "dem",
  "e no", "shey", "abi", "make", "wey", "dis", "dat", "im", "she", "sabi"
];

function detectLanguage(message: string): "english" | "pidgin" {
  const lowerMessage = message.toLowerCase();
  const pidginCount = pidginPatterns.filter(p => lowerMessage.includes(p)).length;
  return pidginCount >= 2 ? "pidgin" : "english";
}

function detectIntent(message: string): ChatIntent & { patternsMatched?: string[] } {
  const lowerMessage = message.toLowerCase();

  // Claim ID pattern
  const claimIdMatch = message.match(/CLM-\d{4}-\d{3}/i);

  // Greeting patterns
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|how far)/i.test(lowerMessage)) {
    return {
      type: "greeting",
      confidence: 0.95,
      entities: {},
      patternsMatched: ["greeting words (hi, hello, hey)"]
    };
  }

  // Claim status patterns
  if (/(status|check|where|tracking|how far|wetin happen|update).*(claim|CLM)/i.test(lowerMessage) ||
      claimIdMatch) {
    const patterns = [];
    if (claimIdMatch) patterns.push(`claim ID format (${claimIdMatch[0]})`);
    if (/(status|check|where|tracking)/i.test(lowerMessage)) patterns.push("status inquiry keywords");
    return {
      type: "claim_status",
      confidence: 0.9,
      entities: { claimId: claimIdMatch?.[0] },
      patternsMatched: patterns
    };
  }

  // Legal/rights patterns
  if (/(rights?|law|legal|insurance act|naicom|section|entitled|policy|fair)/i.test(lowerMessage)) {
    return {
      type: "legal_check",
      confidence: 0.85,
      entities: { topic: extractLegalTopic(lowerMessage) },
      patternsMatched: ["legal/rights keywords", "compliance terms"]
    };
  }

  // Document request patterns
  if (/(document|certificate|receipt|copy|proof|paper|letter)/i.test(lowerMessage)) {
    return {
      type: "document_request",
      confidence: 0.8,
      entities: {},
      patternsMatched: ["document request keywords"]
    };
  }

  // Rights inquiry
  if (/(what|how).*(rights?|entitled|supposed|should)/i.test(lowerMessage)) {
    return {
      type: "rights_inquiry",
      confidence: 0.8,
      entities: {},
      patternsMatched: ["question words + rights terms"]
    };
  }

  // Escalation triggers (angry sentiment)
  if (/(angry|frustrated|ridiculous|nonsense|rubbish|tired|fed up|useless|complain|wahala|vex)/i.test(lowerMessage)) {
    const triggers = [];
    if (/angry|frustrated|vex/i.test(lowerMessage)) triggers.push("anger indicators");
    if (/ridiculous|nonsense|rubbish|useless/i.test(lowerMessage)) triggers.push("negative sentiment");
    if (/tired|fed up/i.test(lowerMessage)) triggers.push("frustration markers");
    if (/complain|wahala/i.test(lowerMessage)) triggers.push("complaint language");

    return {
      type: "escalation",
      confidence: 0.9,
      entities: {},
      patternsMatched: triggers
    };
  }

  return { type: "unknown", confidence: 0.5, entities: {}, patternsMatched: ["no clear pattern match"] };
}

function extractLegalTopic(message: string): string {
  if (/timeline|90 day|days|how long/i.test(message)) return "timeline";
  if (/reject|denied|refuse/i.test(message)) return "claim_rejection";
  if (/appeal|dispute|disagree/i.test(message)) return "appeal";
  if (/complain/i.test(message)) return "complaint";
  return "rights";
}

const responses = {
  english: {
    greeting: "Hello! Welcome to HeirsSure. I'm your insurance assistant. I can help you:\n\n• Check claim status\n• Understand your insurance rights\n• Request documents\n• Get legal references\n\nHow may I assist you today?",
    
    claimFound: (claim: Claim) => `📋 **Claim Status Update**\n\n**Claim ID:** ${claim.claimId}\n**Type:** ${claim.type.charAt(0).toUpperCase() + claim.type.slice(1)} Insurance\n**Status:** ${claim.status.replace("_", " ").toUpperCase()}\n**Amount:** ₦${claim.amount.toLocaleString()}\n**Days Open:** ${claim.daysOpen} days\n\n${claim.daysOpen > 90 ? "⚠️ This claim has exceeded the 90-day regulatory timeline. Under Section 50 of the Insurance Act 2003, you may be entitled to escalate this matter." : ""}\n\n**Last Updated:** ${claim.lastUpdated}${claim.assignedAgent ? `\n**Assigned Agent:** ${claim.assignedAgent}` : ""}`,
    
    claimNotFound: "I couldn't find a claim with that ID. Please check the claim ID and try again. A valid format is: CLM-2024-001",
    
    noClaimId: "I'd be happy to check your claim status. Please provide your claim ID (format: CLM-YYYY-NNN).",
    
    legalReference: (section: LegalSection) => `📚 **Legal Reference**\n\n**${section.number}: ${section.title}**\n\n"${section.content}"\n\n⚠️ *This is for informational purposes only and does not constitute legal advice. Please consult a qualified professional for specific legal matters.*`,
    
    documentRequest: "I understand you need documentation. Here are your options:\n\n1. **Policy Certificate** - Request via email to support@heirssure.ng\n2. **Claim Receipt** - Available in your account portal\n3. **Settlement Letter** - Sent automatically upon approval\n\nWould you like me to help with something specific?",
    
    escalation: "I understand your frustration, and I apologize for any inconvenience. Your concern is important to us.\n\n🔴 **This conversation has been flagged for priority review.**\n\nA senior claims specialist will contact you within 24 hours. In the meantime, you can also:\n\n• Call our priority line: +234 800 123 4567\n• Email: escalations@heirssure.ng\n• File a complaint with NAICOM\n\nIs there anything else I can help clarify?",
    
    rightsInquiry: "As an insurance consumer in Nigeria, you have several key rights:\n\n✅ Right to receive your policy document within 30 days\n✅ Right to claim settlement within 90 days\n✅ Right to written explanation if claim is rejected\n✅ Right to appeal to NAICOM within 6 months\n✅ Right to fair treatment at all times\n\nWould you like more details on any of these rights?",
    
    unknown: "I'm not quite sure I understood that. Could you please:\n\n• Provide your claim ID to check status\n• Ask about your insurance rights\n• Request specific documents\n\nOr simply tell me what you need help with!",
  },
  
  pidgin: {
    greeting: "How far! Welcome to HeirsSure. Na me be your insurance assistant. I fit help you:\n\n• Check wetin dey happen with your claim\n• Know your rights for insurance\n• Request document\n• See legal reference\n\nWetin you wan know?",
    
    claimFound: (claim: Claim) => `📋 **Claim Update**\n\n**Claim ID:** ${claim.claimId}\n**Type:** ${claim.type.charAt(0).toUpperCase() + claim.type.slice(1)} Insurance\n**Status:** ${claim.status.replace("_", " ").toUpperCase()}\n**Amount:** ₦${claim.amount.toLocaleString()}\n**Days wey e don tey:** ${claim.daysOpen} days\n\n${claim.daysOpen > 90 ? "⚠️ Omo, dis claim don pass 90 days! According to Section 50 of Insurance Act, you fit escalate am." : ""}\n\n**Last Update:** ${claim.lastUpdated}`,
    
    claimNotFound: "I no fit find that claim ID o. Abeg check am well well. E suppose be like: CLM-2024-001",
    
    noClaimId: "Oya give me your claim ID make I check am. E dey look like dis: CLM-YYYY-NNN",
    
    escalation: "E pain me say you vex. Abeg no worry, we go sort am out.\n\n🔴 **We don flag dis matter for urgent attention.**\n\nSenior person go call you within 24 hours. You fit also:\n\n• Call: +234 800 123 4567\n• Email: escalations@heirssure.ng\n• Report to NAICOM\n\nWetin else you wan know?",
    
    unknown: "Abeg, I no too understand wetin you talk. You fit:\n\n• Give me your claim ID\n• Ask about your rights\n• Request document\n\nWetin you need?",
  },
};

export function generateResponse(message: string): ChatResponse {
  const language = detectLanguage(message);
  const intent = detectIntent(message);
  const lang = responses[language];

  let responseMessage = "";
  let claim: Claim | undefined;
  let legalRef: LegalSection | null = null;
  let shouldEscalate = false;
  let dataSource = "None";

  switch (intent.type) {
    case "greeting":
      responseMessage = lang.greeting;
      dataSource = "Predefined response template";
      break;

    case "claim_status":
      if (intent.entities.claimId) {
        claim = getClaimById(intent.entities.claimId);
        if (claim) {
          responseMessage = lang.claimFound(claim);
          dataSource = "Claims database → claims.claimId lookup";
        } else {
          responseMessage = lang.claimNotFound;
          dataSource = "Claims database (no match)";
        }
      } else {
        responseMessage = lang.noClaimId;
        dataSource = "Predefined response template";
      }
      break;

    case "legal_check":
      legalRef = getLegalReference(intent.entities.topic || "rights");
      if (legalRef && language === "english") {
        responseMessage = responses.english.legalReference(legalRef);
        dataSource = "Legal documents database → topic mapping";
      } else {
        responseMessage = responses.english.rightsInquiry;
        dataSource = "Predefined response template";
      }
      break;

    case "document_request":
      responseMessage = responses.english.documentRequest;
      dataSource = "Predefined response template";
      break;

    case "escalation":
      responseMessage = lang.escalation;
      shouldEscalate = true;
      dataSource = "Escalation workflow triggered";
      break;

    case "rights_inquiry":
      responseMessage = responses.english.rightsInquiry;
      legalRef = getLegalReference("rights");
      dataSource = "Legal documents database → rights section";
      break;

    default:
      responseMessage = lang.unknown;
      dataSource = "Fallback response";
  }

  // Find the source document name for the legal reference
  let legalSource: string | undefined;
  if (legalRef) {
    for (const doc of legalDocuments) {
      if (doc.sections.some(s => s.id === legalRef!.id)) {
        legalSource = `${doc.title} (${doc.year})`;
        break;
      }
    }
  }

  return {
    message: responseMessage,
    intent,
    claim,
    legalRef: legalRef || undefined,
    legalSource,
    shouldEscalate,
    language,
    reasoning: {
      patternsMatched: intent.patternsMatched || [],
      dataSource,
      escalationTriggers: shouldEscalate ? intent.patternsMatched : undefined,
    },
  };
}
