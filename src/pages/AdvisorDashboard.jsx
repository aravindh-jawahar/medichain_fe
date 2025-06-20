import React, { useState } from 'react';
import {
  Star,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1 y');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [weekDays, setWeekDays] = useState([
    { day: 'Mon', date: '20' },
    { day: 'Tue', date: '21', active: true },
    { day: 'Wed', date: '22' },
    { day: 'Thu', date: '23' },
    { day: 'Fri', date: '24' }
  ])

  const scheduleData = [
    {
      id: 1,
      name: 'Nuraiz Donin',
      role: 'Patient',
      date: '21 May 2024, 12:30 PM',
      status: 'Confirmed',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Hanna Kenter',
      role: 'Patient',
      date: '21 May 2024, 1:00 PM',
      status: 'Confirmed',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Phillip Donin',
      role: 'Patient',
      date: '21 May 2024, 2:30 AM',
      status: 'Cancelled',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const timeframeOptions = ['1 y', '6 m', '1 m', 'All visits'];

  const handleDayClick = (clickedDay) => {
  const updatedDays = weekDays.map(day =>
    day.day === clickedDay.day ? { ...day, active: true } : { ...day, active: false }
  )
  setWeekDays(updatedDays)
  }

  return (
    <div className="min-h-screen">

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Earned Funds Card */}
          <div className="bg-[rgba(48,183,200,1)] rounded-3xl p-6 text-white">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium opacity-90">Earned funds</h3>
              <div className="text-sm opacity-75">+ $500 This day</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold mb-1">$4,3k</div>
                <div className="text-sm opacity-75">Last month</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">$2,1k</div>
                <div className="text-sm opacity-75">This month</div>
              </div>
            </div>
          </div>

          {/* Ratings Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ratings</h3>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 !border-none">
                <span>All reviews</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-orange-400 fill-current" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">4,5</div>
                  <div className="text-sm text-gray-600">Total rate</div>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">100</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>

          {/* Visits Card */}
          <div className="bg-[var(--color-primary)] from-blue-600 to-blue-700 rounded-3xl p-6 text-white">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium opacity-90">Visits</h3>
              <button className="text-sm opacity-75 flex items-center space-x-1 !border-none">
                <span>Show history</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div>
                  <div className="text-3xl font-bold mb-1">135</div>
                  <div className="text-sm opacity-75">Last month</div>
                </div>
                <TrendingDown className="w-5 h-5 opacity-75" />
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <div className="text-3xl font-bold mb-1">154</div>
                  <div className="text-sm opacity-75">This month</div>
                </div>
                <TrendingUp className="w-5 h-5 opacity-75" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Schedule */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">My Schedule</h3>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <span className="text-sm font-medium">{selectedMonth}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Week Calendar */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {weekDays.map((weekday, index) => (
                <div
                  key={index}
                  className={`text-center p-3 rounded-xl transition-colors cursor-pointer ${
                    weekday.active
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDayClick(weekday)}
                >
                  <div className="text-sm font-medium">{weekday.day}</div>
                  <div className="text-lg font-semibold mt-1">{weekday.date}</div>
                </div>
              ))}
            </div>

            {/* Schedule List */}
            <div className="space-y-4">
              {scheduleData.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <img
                    src={appointment.avatar}
                    alt={appointment.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{appointment.name}</div>
                    <div className="text-sm text-gray-600">{appointment.role}</div>
                    <div className="text-sm text-gray-500">{appointment.date}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Confirmed'
                      ? 'bg-[var(--color-foreground)] text-[var(--color-primary)] border border-[var(--color-border)]'
                      : 'bg-[var(--color-foreground)] text-[var(--color-primary)] border border-[var(--color-border)]'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Analytics in graphs</h3>
              <div className="flex items-center space-x-2">
                {timeframeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedTimeframe(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTimeframe === option
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-64 mb-4">
              <div className="absolute top-4 right-4 text-sm text-gray-600">
                <span className="font-semibold">138</span> Aver. visits
              </div>

              {/* Simplified Chart Representation */}
              <div className="h-full flex items-end justify-center space-x-8 px-4">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <path
                    d="M 20 150 Q 80 120 120 140 T 200 80 T 280 120 T 360 160"
                    stroke="#60A5FA"
                    strokeWidth="3"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                  <path
                    d="M 20 150 Q 80 120 120 140 T 200 80 T 280 120 T 360 160 L 360 200 L 20 200 Z"
                    fill="url(#gradient)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>

                  {/* Peak indicator */}
                  <circle cx="200" cy="80" r="4" fill="#3B82F6" />
                  <line x1="200" y1="80" x2="200" y2="200" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" />
                </svg>
              </div>
            </div>

            {/* Month Labels */}
            <div className="flex justify-between text-sm text-gray-500 px-4">
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span className="font-semibold text-gray-900">May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
