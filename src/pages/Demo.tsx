import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppChat } from "@/components/demo/WhatsAppChat";
import { IntentPanel } from "@/components/demo/IntentPanel";
import { ChatResponse } from "@/lib/chatEngine";
import { Smartphone } from "lucide-react";

export default function Demo() {
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live WhatsApp Demo</h1>
          <p className="text-muted-foreground">
            Experience how HeirsSure assists Nigerian insurance customers. Try asking about claims, 
            rights, or use Pidgin!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
          {/* WhatsApp Chat - Left Side */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">WhatsApp Simulator</span>
            </div>
            <div className="flex-1">
              <WhatsAppChat onResponse={setLastResponse} />
            </div>
          </div>

          {/* Analysis Panel - Right Side */}
          <div className="lg:col-span-3 bg-card rounded-lg border border-border p-6">
            <IntentPanel response={lastResponse} />
          </div>
        </div>

        {/* Sample Queries */}
        <div className="mt-8 p-6 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-4">Try these sample queries:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { query: "Check claim CLM-2024-003", desc: "Status of escalated claim" },
              { query: "What are my rights if claim is delayed?", desc: "Legal reference lookup" },
              { query: "Wetin be my rights for insurance?", desc: "Pidgin language support" },
              { query: "I'm very frustrated with this process!", desc: "Escalation trigger" },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-muted/50 rounded-lg">
                <code className="text-sm text-primary font-medium block mb-1">
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
