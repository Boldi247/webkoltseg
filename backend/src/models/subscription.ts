type iSubscriptionStatuses = "active" | "expired" | "canceled";

export interface iSubscription {
    userId: string;
    plan: string; // Might not need more plans...
    startedAt: Date;
    expiresAt: Date;
    status: iSubscriptionStatuses;
}
