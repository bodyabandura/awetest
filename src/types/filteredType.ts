export interface Organization {
  id: string;
  name: string;
  access: string;
  assigned_to: string;
  background_info: string;
  category: string;
  contacts_count: string;
  created_at: string;
  deleted_at: string | null;
  email: string;
  fax: string;
  opportunities_count: string;
  phone: string;
  rating: string;
  subscribed_users: string | null;
  toll_free_phone: string;
  updated_at: string;
  user_id: string;
  website: string;
}