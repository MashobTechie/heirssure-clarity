// Simulated claims database for HeirsSure
export interface Claim {
  id: string;
  claimId: string;
  policyNumber: string;
  holderName: string;
  type: "motor" | "health" | "life" | "property" | "travel";
  status: "pending" | "under_review" | "approved" | "rejected" | "escalated";
  amount: number;
  submittedDate: string;
  lastUpdated: string;
  daysOpen: number;
  description: string;
  documents: string[];
  assignedAgent?: string;
  escalationReason?: string;
}

export const claimsDatabase: Claim[] = [
  {
    id: "1",
    claimId: "CLM-2024-001",
    policyNumber: "POL-MTR-89234",
    holderName: "Adebayo Okonkwo",
    type: "motor",
    status: "under_review",
    amount: 450000,
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-28",
    daysOpen: 45,
    description: "Vehicle collision damage claim - rear bumper and tail light replacement",
    documents: ["Accident report", "Police report", "Photos", "Repair estimate"],
    assignedAgent: "Michael Adekunle",
  },
  {
    id: "2",
    claimId: "CLM-2024-002",
    policyNumber: "POL-HLT-45678",
    holderName: "Ngozi Eze",
    type: "health",
    status: "approved",
    amount: 180000,
    submittedDate: "2024-01-20",
    lastUpdated: "2024-02-01",
    daysOpen: 12,
    description: "Hospital admission for surgical procedure",
    documents: ["Medical report", "Hospital bills", "Prescription"],
    assignedAgent: "Fatima Bello",
  },
  {
    id: "3",
    claimId: "CLM-2024-003",
    policyNumber: "POL-PRO-12345",
    holderName: "Chukwudi Nnamdi",
    type: "property",
    status: "escalated",
    amount: 2500000,
    submittedDate: "2023-10-05",
    lastUpdated: "2024-01-30",
    daysOpen: 118,
    description: "Fire damage to commercial property - full building assessment required",
    documents: ["Fire brigade report", "Property valuation", "Photos", "Inventory list"],
    assignedAgent: "Oluwaseun Adeleke",
    escalationReason: "Claim exceeds 90-day processing limit. Customer expressed frustration.",
  },
  {
    id: "4",
    claimId: "CLM-2024-004",
    policyNumber: "POL-LIF-78901",
    holderName: "Amina Suleiman",
    type: "life",
    status: "pending",
    amount: 5000000,
    submittedDate: "2024-02-01",
    lastUpdated: "2024-02-01",
    daysOpen: 3,
    description: "Death benefit claim for policyholder",
    documents: ["Death certificate", "Policy document", "ID verification"],
  },
  {
    id: "5",
    claimId: "CLM-2024-005",
    policyNumber: "POL-TRV-34567",
    holderName: "Emmanuel Okoro",
    type: "travel",
    status: "rejected",
    amount: 75000,
    submittedDate: "2024-01-10",
    lastUpdated: "2024-01-25",
    daysOpen: 15,
    description: "Lost luggage claim during international travel",
    documents: ["Airline report", "Baggage claim ticket", "Itemized list"],
    escalationReason: "Claim denied due to policy exclusion for unattended baggage.",
  },
  {
    id: "6",
    claimId: "CLM-2024-006",
    policyNumber: "POL-MTR-56789",
    holderName: "Blessing Adeyemi",
    type: "motor",
    status: "under_review",
    amount: 320000,
    submittedDate: "2023-11-15",
    lastUpdated: "2024-01-28",
    daysOpen: 95,
    description: "Third-party liability claim - pedestrian injury",
    documents: ["Police report", "Medical bills", "Witness statements"],
    assignedAgent: "Ibrahim Musa",
    escalationReason: "Complex liability assessment required. Exceeds 90-day limit.",
  },
  {
    id: "7",
    claimId: "CLM-2024-007",
    policyNumber: "POL-HLT-23456",
    holderName: "Chidinma Obi",
    type: "health",
    status: "approved",
    amount: 95000,
    submittedDate: "2024-01-25",
    lastUpdated: "2024-02-02",
    daysOpen: 8,
    description: "Outpatient treatment and medication",
    documents: ["Doctor's report", "Pharmacy receipts", "Lab results"],
    assignedAgent: "Fatima Bello",
  },
  {
    id: "8",
    claimId: "CLM-2024-008",
    policyNumber: "POL-PRO-67890",
    holderName: "Olumide Bankole",
    type: "property",
    status: "pending",
    amount: 850000,
    submittedDate: "2024-01-30",
    lastUpdated: "2024-01-30",
    daysOpen: 4,
    description: "Flood damage to residential property",
    documents: ["Photos", "Repair estimates", "Property deed"],
  },
];

export function getClaimById(claimId: string): Claim | undefined {
  return claimsDatabase.find(
    (c) => c.claimId.toLowerCase() === claimId.toLowerCase()
  );
}

export function getClaimStats() {
  const total = claimsDatabase.length;
  const pending = claimsDatabase.filter((c) => c.status === "pending").length;
  const underReview = claimsDatabase.filter((c) => c.status === "under_review").length;
  const approved = claimsDatabase.filter((c) => c.status === "approved").length;
  const rejected = claimsDatabase.filter((c) => c.status === "rejected").length;
  const escalated = claimsDatabase.filter((c) => c.status === "escalated").length;
  const exceeding90Days = claimsDatabase.filter((c) => c.daysOpen > 90).length;
  const totalValue = claimsDatabase.reduce((sum, c) => sum + c.amount, 0);

  return {
    total,
    pending,
    underReview,
    approved,
    rejected,
    escalated,
    exceeding90Days,
    totalValue,
  };
}
