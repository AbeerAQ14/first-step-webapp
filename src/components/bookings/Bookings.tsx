'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookingCard from './BookingCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SafeImage from '@/components/common/SafeImage';
import { formatToArabicDate, getDaysDifference } from '@/utils/dateUtils';

// Mock data - Replace with actual API calls in production
const mockBookings = [
  {
    id: '1',
    status: 'awaiting',
    startDate: '2023-06-15',
    endDate: '2023-06-20',
    children: 'محمد أحمد',
    nursery: 'روضة الأزهار',
    branch: 'الفرع الرئيسي',
    program: 'برنامج الروضة الكامل',
  },
  {
    id: '2',
    status: 'paid',
    startDate: '2023-06-10',
    endDate: '2023-06-30',
    children: 'سارة خالد',
    nursery: 'روضة الأزهار',
    branch: 'فرع النخيل',
    program: 'برنامج نصف يوم',
  },
  {
    id: '3',
    status: 'pending',
    startDate: '2023-07-01',
    endDate: '2023-07-15',
    children: 'عمر علي',
    nursery: 'روضة الأزهار',
    branch: 'الفرع الرئيسي',
    program: 'برنامج الروضة الكامل',
  },
];

const Bookings: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState(mockBookings);

  // Simulate data fetching
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(mockBookings);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('فشل في تحميل الحجوزات. يرجى المحاولة مرة أخرى.');
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchQuery.toLowerCase();
    return (
      booking.children.toLowerCase().includes(searchLower) ||
      booking.nursery.toLowerCase().includes(searchLower) ||
      booking.branch.toLowerCase().includes(searchLower) ||
      booking.program.toLowerCase().includes(searchLower) ||
      booking.status.toLowerCase().includes(searchLower)
    );
  });

  const handleViewDetails = (bookingId: string) => {
    router.push(`/dashboard/parent/bookings/${bookingId}`);
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      // In a real app, this would be an API call
      console.log('Confirming booking:', bookingId);
      alert(`تم تأكيد الحجز: ${bookingId}`);
      // Update local state to reflect the change
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'paid' } : booking
        )
      );
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('حدث خطأ أثناء تأكيد الحجز. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      if (window.confirm('هل أنت متأكد من رغبتك في إلغاء الحجز؟')) {
        // In a real app, this would be an API call
        console.log('Canceling booking:', bookingId);
        alert(`تم إلغاء الحجز: ${bookingId}`);
        // Update local state to reflect the change
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
          )
        );
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('حدث خطأ أثناء إلغاء الحجز. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-secondary-light" dir="rtl">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-secondary-1 h-15 flex flex-row items-center justify-between px-6 py-4">
          <h1 className="text-accent-primary font-tajawal font-bold text-2xl leading-7">
            الحجوزات
          </h1>
          <div className="relative w-96">
            <input
              type="text"
              placeholder="ابحث عن حجز..."
              className="w-full bg-secondary-1 border border-accent-neutral rounded-lg py-3 pr-10 pl-4 font-tajawal text-base leading-5 text-right focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SafeImage
                src="/images/search-icon.svg"
                alt="Search"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-6">
          <ErrorBoundary>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center p-6 bg-red-50 rounded-lg">
                <p className="text-red-600 font-tajawal text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-primary-light text-white rounded-lg font-tajawal font-medium hover:bg-primary-dark transition-colors"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  status={booking.status as 'paid' | 'pending' | 'rejected' | 'awaiting'}
                  startDate={formatToArabicDate(booking.startDate)}
                  endDate={formatToArabicDate(booking.endDate)}
                  days={getDaysDifference(booking.startDate, booking.endDate)}
                  children={booking.children}
                  nursery={booking.nursery}
                  branch={booking.branch}
                  program={booking.program}
                  onViewDetails={() => handleViewDetails(booking.id)}
                  onConfirm={booking.status === 'pending' ? () => handleConfirmBooking(booking.id) : undefined}
                  onCancel={booking.status !== 'rejected' ? () => handleCancelBooking(booking.id) : undefined}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-accent-neutral font-tajawal text-lg">
                  {searchQuery ? 'لا توجد نتائج للبحث' : 'لا توجد حجوزات متاحة'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-accent-primary hover:underline"
                  >
                    مسح البحث
                  </button>
                )}
              </div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
