import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { claimsDatabase, getClaimStats } from "@/data/claims";
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Users,
  ArrowUpRight
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
      title: "Escalations",
      value: stats.escalated,
      icon: Users,
      alert: stats.escalated > 0,
      subtitle: "Requires attention",
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

      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Claims Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor claim statuses, compliance metrics, and escalations in real-time.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className={`metric-card ${metric.alert ? "border-destructive/30" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  metric.alert ? "bg-destructive/10" : "bg-primary/10"
                }`}>
                  <metric.icon className={`h-5 w-5 ${metric.alert ? "text-destructive" : "text-primary"}`} />
                </div>
                {metric.trend && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    metric.trendUp ? "text-success" : "text-destructive"
                  }`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {metric.trend}
                  </span>
                )}
              </div>
              <div className={`text-2xl font-bold ${metric.alert ? "text-destructive" : ""}`}>
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.title}</div>
              {metric.subtitle && (
                <div className="text-xs text-muted-foreground/70 mt-1">{metric.subtitle}</div>
              )}
            </Card>
          ))}
        </div>

        {/* Claims Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Recent Claims</h2>
            <Badge variant="outline">{claimsDatabase.length} claims</Badge>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Policy Holder</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Days Open</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Agent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claimsDatabase.map((claim) => {
                  const status = statusConfig[claim.status];
                  const StatusIcon = status.icon;
                  const isOverdue = claim.daysOpen > 90;

                  return (
                    <TableRow 
                      key={claim.id} 
                      className={isOverdue ? "bg-destructive/5" : ""}
                    >
                      <TableCell className="font-mono text-sm font-medium">
                        {claim.claimId}
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
          <Card className="mt-6 p-6 border-destructive/30 bg-destructive/5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-1">
                  Compliance Alert: {stats.exceeding90Days} Claims Exceeding 90-Day Limit
                </h3>
                <p className="text-sm text-muted-foreground">
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
