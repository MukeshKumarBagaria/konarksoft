"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { whatsappGateContent } from "@/content/whatsapp-gate";
import { ContactDialog } from "@/features/leads/contact-dialog";

/** What a button hands the gate: the first line of the eventual message. */
export type GateRequest = {
  opener: string;
  /**
   * Changes on every request, so asking for the same opener twice in a row
   * still reopens the dialog after the first was cancelled.
   */
  key: number;
};

type GateApi = {
  /** Opens the details form; `opener` becomes the message's first line. */
  open: (opener: string) => void;
};

const GateContext = createContext<GateApi | null>(null);

/**
 * Owns the one details dialog every WhatsApp button on the site shares.
 *
 * Mounted once in the root layout rather than once per button, so there is a
 * single `<dialog>` in the document and a button anywhere — a landing hero, the
 * footer card, the sticky offer bar — opens the same one with its own opener
 * line. Any component below it reaches the gate through `useWhatsAppGate`.
 */
export function WhatsAppGateProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<GateRequest | null>(null);

  const api = useMemo<GateApi>(
    () => ({ open: (opener) => setRequest({ opener, key: Date.now() }) }),
    [],
  );

  return (
    <GateContext.Provider value={api}>
      {children}
      <ContactDialog
        request={request}
        onClose={() => setRequest(null)}
        content={whatsappGateContent}
      />
    </GateContext.Provider>
  );
}

/** `null` outside the provider, where a button falls back to its plain link. */
export function useWhatsAppGate(): GateApi | null {
  return useContext(GateContext);
}
