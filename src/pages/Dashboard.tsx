import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { claimsDatabase, getClaimStats } from "@/data/claims";
import { useClaimsStore } from "@/context/ClaimsContext";
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Users,
  ArrowUpRight,
  ShieldAlert
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusConfig: Record<string, { icon: React.ElementType; class: string; label: string }> = {
  pending: { icon: Clock, class: "status-pending", label: "Pending" },
  under_review: { icon: FileText, class: "status-pending", label: "Under Review" },
  approved: { icon: CheckCircle, class: "status-approved", label: "Approved" },
  rejected: { icon: XCircle, class: "status-rejected", label: "Rejected" },
  escalated: { icon: AlertTriangle, class: "status-escalated", label: "Escalated" },
};

export default function Dashboard() {
  const stats = getClaimStats();
  const { lastQueriedClaimId, escalationsToday } = useClaimsStore();

  const metrics = [
    {
      title: "Total Claims",
      value: stats.total,
      icon: FileText,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Pending Review",
      value: stats.pending + stats.underReview,
      icon: Clock,
      subtitle: "Awaiting action",
    },
    {
      title: "Exceeding 90 Days",
      value: stats.exceeding90Days,
      icon: AlertTriangle,
      alert: true,
      subtitle: "Compliance risk",
    },
    {
      title: "Escalations Today",
      value: escalationsToday,
      icon: Users,
      alert: escalationsToday > 0,
      subtitle: escalationsToday > 0 ? "From chat interactions" : "No escalations yet",
    },
    {
      title: "Total Value",
      value: `₦${(stats.totalValue / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      subtitle: "Claims value",
    },
    {
      title: "Resolution Rate",
      value: `${Math.round((stats.approved / stats.total) * 100)}%`,
      icon: CheckCircle,
      trend: "+5%",
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container py-6 md:py-8 px-4 md:px-6">
        <div className="flex justify-center mb-4">
          <Badge variant="outline" className="text-xs md:text-sm px-3 md:px-4 py-1.5 bg-muted text-muted-foreground border-border">
            Demo Mode - Using Simulated Claims Data
          </Badge>
        </div>

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Claims Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Monitor claim statuses, compliance metrics, and escalations in real-time.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className={`p-3 md:p-5 ${metric.alert ? "border-destructive/30" : ""}`}>
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <div className={`h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center ${
                  metric.alert ? "bg-destructive/10" : "bg-primary/10"
                }`}>
                  <metric.icon className={`h-4 w-4 md:h-5 md:w-5 ${metric.alert ? "text-destructive" : "text-primary"}`} />
                </div>
                {metric.trend && (
                  <span className={`text-[10px] md:text-xs font-medium flex items-center gap-0.5 ${
                    metric.trendUp ? "text-success" : "text-destructive"
                  }`}>
                    <ArrowUpRight className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {metric.trend}
                  </span>
                )}
              </div>
              <div className={`text-lg md:text-2xl font-bold ${metric.alert ? "text-destructive" : ""}`}>
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{metric.title}</div>
              {metric.subtitle && (
                <div className="text-[10px] md:text-xs text-muted-foreground/70 mt-0.5 md:mt-1 hidden sm:block">{metric.subtitle}</div>
              )}
            </Card>
          ))}
        </div>

        {/* Claims Table */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-semibold">Recent Claims</h2>
            <Badge variant="outline" className="text-xs">{claimsDatabase.length} claims</Badge>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {claimsDatabase.map((claim) => {
              const status = statusConfig[claim.status];
              const StatusIcon = status.icon;
              const isOverdue = claim.daysOpen > 90;
              const isHighlighted = lastQueriedClaimId === claim.claimId;

              return (
                <div 
                  key={claim.id} 
                  className={`p-3 rounded-lg border transition-all duration-500 ${
                    isHighlighted 
                      ? "ring-2 ring-primary border-primary bg-primary/5 shadow-md" 
                      : isOverdue 
                        ? "bg-destructive/5 border-destructive/30" 
                        : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">{claim.claimId}</span>
                        {isHighlighted && (
                          <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                            Queried
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{claim.holderName}</p>
                    </div>
                    <span className={`status-badge ${status.class}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {claim.type}
                      </Badge>
                      {isOverdue && (
                        <Badge className="bg-destructive/10 text-destructive text-[10px] gap-1 border-destructive/30" variant="outline">
                          <ShieldAlert className="h-3 w-3" />
                          Compliance Risk
                        </Badge>
                      )}
                      <span className={isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {claim.daysOpen}d {isOverdue && "⚠️"}
                      </span>
                    </div>
                    <span className="font-medium">₦{claim.amount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto -mx-4 md:mx-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Claim ID</TableHead>
                  <TableHead className="whitespace-nowrap">Policy Holder</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="whitespace-nowrap">Days Open</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Agent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claimsDatabase.map((claim) => {
                  const status = statusConfig[claim.status];
                  const StatusIcon = status.icon;
                  const isOverdue = claim.daysOpen > 90;
                  const isHighlighted = lastQueriedClaimId === claim.claimId;

                  return (
                    <TableRow 
                      key={claim.id} 
                      className={`transition-all duration-500 ${
                        isHighlighted 
                          ? "ring-2 ring-primary bg-primary/5 shadow-sm" 
                          : isOverdue 
                            ? "bg-destructive/5" 
                            : ""
                      }`}
                    >
                      <TableCell className="font-mono text-sm font-medium">
                        <div className="flex items-center gap-2">
                          {claim.claimId}
                          {isHighlighted && (
                            <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0 animate-pulse">
                              Queried
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{claim.holderName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize text-xs">
                          {claim.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ₦{claim.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className={isOverdue ? "text-destructive font-medium" : ""}>
                          {claim.daysOpen} days
                          {isOverdue && " ⚠️"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {isOverdue ? (
                          <Badge className="bg-destructive/10 text-destructive text-xs gap-1 border-destructive/30" variant="outline">
                            <ShieldAlert className="h-3 w-3" />
                            Compliance Risk
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">OK</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`status-badge ${status.class}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {claim.assignedAgent || "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Compliance Warning */}
        {stats.exceeding90Days > 0 && (
          <Card className="mt-4 md:mt-6 p-4 md:p-6 border-destructive/30 bg-destructive/5">
            <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-1 text-sm md:text-base">
                  Compliance Alert: {stats.exceeding90Days} Claims Exceeding 90-Day Limit
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Under Section 50 of the Insurance Act 2003, claims must be settled within 90 days. 
                  These claims may expose the company to regulatory penalties and customer complaints.
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
