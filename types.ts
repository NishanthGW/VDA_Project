export interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
  spaceId: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
}

export interface RentalRequest {
  spaceId: string;
  bookId: string;
  rentalPeriod: number;
  purpose: string;
}

export interface RentalResponse {
  id: string;
  bookId: string;
  spaceId: string;
  rentalPeriod: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}