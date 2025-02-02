export interface In {
  in?: number[];
}

export type RespositoryId = number | In;
export type RepositoryStringOrDate = string | Date;

export interface RepositoryCreatedAt {
  gt?: RepositoryStringOrDate;
  lt?: RepositoryStringOrDate;
  gte?: RepositoryStringOrDate;
  lte?: RepositoryStringOrDate;
}

export interface RepositoryParams {
  where?: {
    id?: RespositoryId;
    pushNotificationTokenId?: number;
    createdAt?: RepositoryStringOrDate | RepositoryCreatedAt;
  };
}
