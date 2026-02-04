import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { legalDocuments } from "@/data/legalDocuments";
import { FileText, Scale, ExternalLink, AlertTriangle, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  act: { icon: Scale, color: "bg-primary" },
  guideline: { icon: BookOpen, color: "bg-accent" },
  circular: { icon: FileText, color: "bg-info" },
};

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container py-6 md:py-8 px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Legal Reference Panel</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Nigerian insurance laws and NAICOM guidelines referenced by HeirsSure AI responses.
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="p-4 md:p-5 mb-6 md:mb-8 border-warning/30 bg-warning/5">
          <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">Important Legal Disclaimer</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                The documents and excerpts displayed here are for <strong>informational purposes only</strong> and 
                do not constitute legal advice. For specific legal matters, please consult a qualified 
                insurance lawyer or contact NAICOM directly at{" "}
                <a 
                  href="https://naicom.gov.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  naicom.gov.ng <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        </Card>

        {/* Legal Documents */}
        <div className="grid gap-4 md:gap-6">
          {legalDocuments.map((doc) => {
            const config = typeConfig[doc.type];
            const TypeIcon = config.icon;

            return (
              <Card key={doc.id} className="overflow-hidden">
                {/* Document Header */}
                <div className="p-4 md:p-6 border-b border-border">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 md:gap-4">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`h-10 w-10 md:h-12 md:w-12 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-base md:text-xl font-semibold mb-1">{doc.title}</h2>
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-xs md:text-sm text-muted-foreground">
                          <span>{doc.source}</span>
                          <span>•</span>
                          <span>{doc.year}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs self-start">
                      {doc.type}
                    </Badge>
                  </div>
                </div>

                {/* Sections */}
                <div className="p-4 md:p-6">
                  <h3 className="font-medium text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 uppercase tracking-wide">
                    Referenced Sections
                  </h3>
                  <Accordion type="multiple" className="space-y-2">
                    {doc.sections.map((section) => (
                      <AccordionItem 
                        key={section.id} 
                        value={section.id}
                        className="border border-border rounded-lg px-3 md:px-4"
                      >
                        <AccordionTrigger className="hover:no-underline py-3 md:py-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-left">
                            <Badge variant="secondary" className="font-mono text-[10px] md:text-xs w-fit">
                              {section.number}
                            </Badge>
                            <span className="font-medium text-sm md:text-base">{section.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 md:pb-4">
                          <div className="legal-highlight mb-3 md:mb-4">
                            <p className="text-xs md:text-sm leading-relaxed italic">
                              "{section.content}"
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            <span className="text-[10px] md:text-xs text-muted-foreground">Keywords:</span>
                            {section.keywords.map((kw) => (
                              <Badge key={kw} variant="outline" className="text-[10px] md:text-xs">
                                {kw}
                              </Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Resources */}
        <Card className="mt-6 md:mt-8 p-4 md:p-6">
          <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Additional Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                title: "NAICOM Official Website",
                url: "https://naicom.gov.ng",
                desc: "National Insurance Commission",
              },
              {
                title: "Insurance Act 2003 (Full Text)",
                url: "#",
                desc: "Complete legislation document",
              },
              {
                title: "Consumer Complaint Portal",
                url: "#",
                desc: "File a complaint with NAICOM",
              },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 md:gap-3 p-3 md:p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-xs md:text-sm group-hover:text-primary">
                    {resource.title}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">{resource.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
