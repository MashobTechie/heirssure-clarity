import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppChat } from "@/components/demo/WhatsAppChat";
import { IntentPanel } from "@/components/demo/IntentPanel";
import { ChatResponse } from "@/lib/chatEngine";
import { Smartphone } from "lucide-react";
import { useClaimsStore } from "@/context/ClaimsContext";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Demo() {
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const { queryClaim, incrementEscalations } = useClaimsStore();

  const handleResponse = (response: ChatResponse) => {
    setLastResponse(response);
    if (response.claim) {
      queryClaim(response.claim.claimId);
    }
    if (response.shouldEscalate) {
      incrementEscalations();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container py-6 md:py-8">
        <div className="flex justify-center mb-4">
          <Badge variant="outline" className="text-xs md:text-sm px-3 md:px-4 py-1.5 bg-muted text-muted-foreground border-border">
            Demo Mode - Using Simulated Claims Data
          </Badge>
        </div>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Live WhatsApp Demo</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Experience how HeirsSure assists Nigerian insurance customers. Try asking about claims,
            rights, or use Pidgin!
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6">
          {/* WhatsApp Chat */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">WhatsApp Simulator</span>
            </div>
            <div className="h-[450px] md:h-[500px] lg:h-[calc(100vh-320px)] lg:min-h-[500px]">
              <WhatsAppChat onResponse={handleResponse} />
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Under the Hood Toggle */}
            <div className="bg-card rounded-lg border border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="show-reasoning" className="text-sm font-medium cursor-pointer">
                  Show AI Reasoning
                </Label>
                <Badge variant="outline" className="text-xs">Under the hood</Badge>
              </div>
              <Switch
                id="show-reasoning"
                checked={showReasoning}
                onCheckedChange={setShowReasoning}
              />
            </div>

            {/* Analysis Content */}
            <div className="bg-card rounded-lg border border-border p-4 md:p-6 min-h-[300px] lg:h-[calc(100vh-400px)] lg:min-h-[450px] overflow-y-auto">
              <IntentPanel response={lastResponse} showReasoning={showReasoning} />
            </div>
          </div>
        </div>

        {/* Sample Queries */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Try these sample queries:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {[
              { query: "Check claim CLM-2024-003", desc: "Status of escalated claim" },
              { query: "What are my rights if claim is delayed?", desc: "Legal reference lookup" },
              { query: "Wetin be my rights for insurance?", desc: "Pidgin language support" },
              { query: "I'm very frustrated with this process!", desc: "Escalation trigger" },
            ].map((item, i) => (
              <div key={i} className="p-2.5 md:p-3 bg-muted/50 rounded-lg">
                <code className="text-xs md:text-sm text-primary font-medium block mb-1 break-words">
                  "{item.query}"
                </code>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
