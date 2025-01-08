export interface PrimitiveYearListItem {
  id: number;
  userId: number;
  createdAt: Date;
  description: string;
  locked: boolean;
}

export class YearListItem {
  private id: number;
  private createdAt: Date;
  private description: string;
  private locked: boolean;
  private userId: number;

  constructor(list: PrimitiveYearListItem) {
    this.id = list.id;
    this.createdAt = list.createdAt;
    this.description = list.description;
    this.locked = list.locked;
    this.userId = list.userId;
  }

  get primitive() {
    return {
      id: this.id,
      userId: this.userId,
      createdAt: this.createdAt,
      description: this.description,
      locked: this.locked,
    };
  }

  toPrimitive(): PrimitiveYearListItem {
    return {
      id: this.id,
      userId: this.userId,
      createdAt: this.createdAt,
      description: this.description,
      locked: this.locked,
    };
  }

  create(list: PrimitiveYearListItem) {
    return new YearListItem({
      id: list.id,
      userId: list.userId,
      createdAt: list.createdAt,
      description: list.description,
      locked: list.locked,
    });
  }
}
