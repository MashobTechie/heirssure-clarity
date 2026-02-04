import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8 md:py-12 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight">
                Heirs<span className="text-accent">Sure</span>
              </span>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs">
              Bringing clarity and transparency to insurance claims for Nigerian consumers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
            <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm text-muted-foreground">
              <li><Link to="/demo" className="hover:text-foreground transition-colors">Live Demo</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/legal" className="hover:text-foreground transition-colors">Legal Reference</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">NAICOM Guidelines</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
            <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm text-muted-foreground">
              <li className="break-all">support@heirssure.ng</li>
              <li>+234 800 123 4567</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © 2024 HeirsSure. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-muted-foreground text-center md:text-right">
            Regulated by NAICOM. Licensed insurance intermediary.
          </p>
        </div>
      </div>
    </footer>
  );
}
