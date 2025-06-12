export default async function Bookings() {
  return (
    <div dir="rtl">
      <h1 className="mb-6 heading-4 font-bold text-primary text-center">
        الحجز
      </h1>

      <div className="lg:px-8 lg:py-9">
        {/* Pricing Options */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:border-dashed">
            <p className="text-lg font-bold text-green-600 mb-2">50 ﷼</p>
            <p className="text-gray-600">شهري</p>
          </div>
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:border-dashed">
            <p className="text-lg font-bold text-green-600 mb-2">50 ﷼</p>
            <p className="text-gray-600">اسبوعي</p>
          </div>
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:border-dashed">
            <p className="text-lg font-bold text-green-600 mb-2">50 ﷼</p>
            <p className="text-gray-600">يومي</p>
          </div>
          <div className="p-4 rounded-lg text-center cursor-pointer bg-primary text-white shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:border-dashed">
            <p className="text-lg font-bold mb-2">50 ﷼</p>
            <p>مرن بالساعة</p>
          </div>
        </div>

        {/* Date and Time Pickers */}
        <div className="mb-8 bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <label
                htmlFor="date-from"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                اليوم
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date-from"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue="2025-05-20" // Example date
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="time-from"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  بداية من الساعة
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="time-from"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue="12:30" // Example time
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="time-to"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  إلى الساعة
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="time-to"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue="16:30" // Example time
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-primary mb-4">تفاصيل الحجز</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p className="text-gray-600">البرنامج</p>
              <p className="text-right font-semibold">مرن بالساعة</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p className="text-gray-600">اليوم</p>
              <p className="text-right font-semibold">الخميس 26 / 5 / 2025</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p className="text-gray-600">بداية من الساعة</p>
              <p className="text-right font-semibold">12:30</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p className="text-gray-600">إلى الساعة</p>
              <p className="text-right font-semibold">16:30</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p className="text-gray-600">عدد الساعات</p>
              <p className="text-right font-semibold">4</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <p className="text-gray-600">طريق الدفع</p>
              <p className="text-right font-semibold">ميسر</p>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center border-t border-b py-4 mb-8">
          <p className="text-xl font-bold text-primary">المجموع</p>
          <p className="text-xl font-bold text-green-600">450 ﷼</p>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-2">ملاحظات</h2>
          <ul className="list-decimal list-inside text-gray-600 text-sm">
            <li>سيتم إرسال إشعار للدفع عبر البريد الإلكتروني.</li>
            <li>سيتم إرسال إشعار للدفع</li>
            <li>سيتم إرسال إشعار للدفع</li>
            <li>سيتم إرسال إشعار للدفع</li>
            <li>سيتم إرسال إشعار للدفع</li>
          </ul>
        </div>

        {/* Confirm Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300">
            أكد الحجز
          </button>
        </div>
      </div>
    </div>
  );
}
