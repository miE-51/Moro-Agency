
import { ServiceType, ServicePrice, PortfolioItem } from './types';

export const PRICING_DATA: ServicePrice[] = [
  {
    id: 'p1',
    name: 'Basic Bot',
    type: ServiceType.BOT,
    basePrice: 250000,
    unit: 'project',
    description: 'Simple automation bot for Telegram or Facebook',
    features: ['Basic commands', 'Text responses', 'Simple automation'],
    estimatedTime: '1-2 weeks'
  },
  {
    id: 'p2',
    name: 'Advanced Bot',
    type: ServiceType.BOT,
    basePrice: 400000,
    unit: 'project',
    description: 'AI-powered bot with database and payment integration',
    features: ['AI integration', 'Database', 'Payment system', 'Admin panel'],
    estimatedTime: '3-4 weeks'
  },
  {
    id: 'p3',
    name: 'Basic Website',
    type: ServiceType.WEBSITE,
    basePrice: 800000,
    unit: 'project',
    description: 'Clean, responsive business profile website',
    features: ['5 pages', 'Responsive design', 'Contact form', 'Basic SEO'],
    estimatedTime: '2-3 weeks'
  },
  {
    id: 'p4',
    name: 'E-commerce Site',
    type: ServiceType.WEBSITE,
    basePrice: 1400000,
    unit: 'project',
    description: 'Full-featured online store with checkout',
    features: ['Product catalog', 'Shopping cart', 'Payment gateway', 'Admin dashboard'],
    estimatedTime: '4-6 weeks'
  },
  {
    id: 'p5',
    name: 'Pro Video Editing',
    type: ServiceType.VIDEO,
    basePrice: 50000,
    unit: 'minute',
    description: 'High-quality editing for YouTube or Social Ads',
    features: ['Color grading', 'Subtitles', 'Motion graphics', 'Sound design'],
    estimatedTime: '3-5 days'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port1',
    title: 'Fashion Store E-commerce',
    description: 'A modern fashion hub with seamless checkout.',
    category: ServiceType.WEBSITE,
    imageUrl: 'https://picsum.photos/seed/fashion/800/600',
    demoLink: 'https://example.com',
    technologies: ['React', 'Node.js', 'Stripe'],
    rating: 5
  },
  {
    id: 'port2',
    title: 'Crypto Alert Bot',
    description: 'Real-time Telegram notifications for whale movements.',
    category: ServiceType.BOT,
    imageUrl: 'https://picsum.photos/seed/bot/800/600',
    demoLink: 'https://t.me/example',
    technologies: ['Python', 'Pyrogram', 'Redis'],
    rating: 5
  },
  {
    id: 'port3',
    title: 'Product Launch Trailer',
    description: 'Cinematic 4K promo for a tech gadget launch.',
    category: ServiceType.VIDEO,
    imageUrl: 'https://picsum.photos/seed/video/800/600',
    technologies: ['After Effects', 'Premiere Pro'],
    rating: 4
  }
];

export const PAYMENT_METHODS = [
  { id: 'kpay', name: 'KPay', account: '09759528404', icon: '📱' },
  { id: 'wave', name: 'Wave Money', account: '09759528404', icon: '🌊' },
  { id: 'cbbank', name: 'CB Bank', account: '1234 5678 9012 3456', icon: '🏦' }
];
