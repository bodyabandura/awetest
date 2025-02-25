export interface Record {
    db: string;
    id: string;
    user_id: string;
    name: string;
    access: string;
    website: string;
    result: "failed" | "passed";
  }