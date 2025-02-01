export interface Find {
  where?: {
    pushNotificationTokenId?: number;
    createdAt?: {
      gt: Date;
    };
  };
}
