
export enum ServiceType {
  BOT = 'bot',
  WEBSITE = 'website',
  VIDEO = 'video'
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  FAILED = 'failed',
  PENDING = 'pending_verification'
}

export interface ServicePrice {
  id: string;
  name: string;
  type: ServiceType;
  basePrice: number;
  unit: string;
  description: string;
  features: string[];
  estimatedTime: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: ServiceType;
  imageUrl: string;
  demoLink?: string;
  technologies: string[];
  rating: number;
}

export interface Order {
  id: string;
  userId: string;
  type: ServiceType | 'combo';
  requirements: string;
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}
