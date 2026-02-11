import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ClaimsState {
  lastQueriedClaimId: string | null;
  escalationsToday: number;
  queryClaim: (claimId: string) => void;
  incrementEscalations: () => void;
}

const ClaimsContext = createContext<ClaimsState | null>(null);

export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [lastQueriedClaimId, setLastQueriedClaimId] = useState<string | null>(null);
  const [escalationsToday, setEscalationsToday] = useState(0);

  const queryClaim = useCallback((claimId: string) => {
    setLastQueriedClaimId(claimId);
  }, []);

  const incrementEscalations = useCallback(() => {
    setEscalationsToday((prev) => prev + 1);
  }, []);

  return (
    <ClaimsContext.Provider value={{ lastQueriedClaimId, escalationsToday, queryClaim, incrementEscalations }}>
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaimsStore() {
  const ctx = useContext(ClaimsContext);
  if (!ctx) throw new Error("useClaimsStore must be used within ClaimsProvider");
  return ctx;
}
