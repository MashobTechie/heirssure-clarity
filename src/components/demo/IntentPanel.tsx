import { Brain, Database, FileText, AlertTriangle } from "lucide-react";
import { ChatResponse } from "@/lib/chatEngine";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IntentPanelProps {
  response: ChatResponse | null;
}

const intentLabels: Record<string, { label: string; color: string }> = {
  claim_status: { label: "Claim Status Check", color: "bg-info" },
  legal_check: { label: "Legal Reference", color: "bg-accent" },
  document_request: { label: "Document Request", color: "bg-secondary" },
  escalation: { label: "Escalation Required", color: "bg-destructive" },
  greeting: { label: "Greeting", color: "bg-success" },
  rights_inquiry: { label: "Rights Inquiry", color: "bg-primary" },
  unknown: { label: "Unknown Intent", color: "bg-muted" },
};

export function IntentPanel({ response }: IntentPanelProps) {
  if (!response) {
    return (
      <div className="h-full flex flex-col">
        <h3 className="section-title mb-4">Analysis Panel</h3>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Send a message to see the analysis</p>
          </div>
        </div>
      </div>
    );
  }

  const intentInfo = intentLabels[response.intent.type];

  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto">
      <h3 className="section-title">Analysis Panel</h3>

      {/* Intent Detection */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Detected Intent</h4>
        </div>
        <div className="space-y-3">
          <Badge className={`${intentInfo.color} text-white`}>
            {intentInfo.label}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${response.intent.confidence * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">
              {Math.round(response.intent.confidence * 100)}%
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Language: </span>
            <span className="font-medium capitalize">{response.language}</span>
          </div>
        </div>
      </Card>

      {/* Claim Data */}
      {response.claim && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">Claim Data Retrieved</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Claim ID</span>
              <span className="font-mono">{response.claim.claimId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Policy Holder</span>
              <span>{response.claim.holderName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="outline" className="text-xs capitalize">
                {response.claim.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">₦{response.claim.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days Open</span>
              <span className={response.claim.daysOpen > 90 ? "text-destructive font-medium" : ""}>
                {response.claim.daysOpen} days
                {response.claim.daysOpen > 90 && " ⚠️"}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Legal Reference */}
      {response.legalRef && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-accent" />
            <h4 className="font-semibold">Legal Reference Used</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium text-accent">{response.legalRef.number}</span>
              <span className="text-muted-foreground"> • {response.legalRef.title}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
              "{response.legalRef.content}"
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {response.legalRef.keywords.slice(0, 4).map((kw) => (
                <Badge key={kw} variant="outline" className="text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Escalation Status */}
      {response.shouldEscalate && (
        <Card className="p-4 border-destructive/50 bg-destructive/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h4 className="font-semibold text-destructive">Escalation Triggered</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Negative sentiment detected. This conversation has been flagged for human review.
          </p>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground italic">
          ⚠️ All legal references are for informational purposes only and do not constitute legal advice.
        </p>
      </div>
    </div>
  );
}
