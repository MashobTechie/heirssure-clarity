import { 
  MessageSquare, 
  FileSearch, 
  Scale, 
  Clock, 
  Languages, 
  ShieldCheck 
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Native",
    description: "Chat naturally on WhatsApp. No app downloads, no learning curve. Just text your questions.",
  },
  {
    icon: FileSearch,
    title: "Smart Claim Tracking",
    description: "Get real-time updates on your claim status. Track every step from submission to settlement.",
  },
  {
    icon: Scale,
    title: "Legal Rights Access",
    description: "Understand your rights under the Insurance Act 2003 and NAICOM guidelines with accurate references.",
  },
  {
    icon: Clock,
    title: "90-Day Compliance",
    description: "Auto-flag claims exceeding regulatory timelines. Know when your insurer is overdue.",
  },
  {
    icon: Languages,
    title: "English & Pidgin",
    description: "Communicate in your preferred language. We understand both formal English and Nigerian Pidgin.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Aligned",
    description: "Built with NAICOM compliance in mind. Every response references official insurance regulations.",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Nigerian Insurance
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to understand, track, and advocate for your insurance claims.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
