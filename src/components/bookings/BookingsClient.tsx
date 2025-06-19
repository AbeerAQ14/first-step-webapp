'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Dynamically import the Bookings component with SSR disabled
const Bookings = dynamic(
  () => import('./Bookings'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
);

const BookingsClient = () => {
  return <Bookings />;
};

export default BookingsClient;
