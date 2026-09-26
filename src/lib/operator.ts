export type OperatorSessionEvent = {
  eventId: string;
  operatorId: string;
  rvmId: string;
  externalUserRef: string;
  sessionId: string;
  accepted: { pet: number; cans: number; glass: number };
  refundAmountGrosz: number;
  status: 'confirmed' | 'rejected';
  signedAt: string;
};

/**
 * Production adapter boundary.
 * UI should never trust client-entered counts. The trusted source is a signed
 * server-to-server event from the operator or RVM platform.
 */
export interface DepositOperatorAdapter {
  createConsumerSession(input: { externalUserRef: string; rvmId: string }): Promise<{ sessionToken: string }>;
  verifyWebhook(rawBody: string, signature: string): Promise<OperatorSessionEvent>;
}
