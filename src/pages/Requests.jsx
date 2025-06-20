import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Star
} from 'lucide-react';

const AppointmentRequests = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const appointmentRequests = [
    {
      id: 1,
      patientName: 'Alexander P',
      company: 'Sun Pharma',
      requestedDate: '21st December',
      requestedTime: '02:30PM',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'pending',
      urgency: 'medium',
      reason: 'Routine checkup and medication review',
      phone: '+1 (555) 123-4567',
      email: 'alexander.p@sunpharma.com',
      age: 45,
      lastVisit: '3 months ago',
      notes: 'Patient has history of hypertension. Regular follow-up required.',
      requestTime: '2 hours ago'
    },
    {
      id: 2,
      patientName: 'John Keith',
      company: 'Glaxo Pharma',
      requestedDate: '21st December',
      requestedTime: '02:30PM',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'pending',
      urgency: 'high',
      reason: 'Urgent consultation for chest pain',
      phone: '+1 (555) 234-5678',
      email: 'john.keith@glaxopharma.com',
      age: 52,
      lastVisit: '1 week ago',
      notes: 'Patient experiencing recurring chest pain. Immediate attention needed.',
      requestTime: '1 hour ago'
    },
    {
      id: 3,
      patientName: 'Mark Paul',
      company: 'BCD Smith',
      requestedDate: '21st December',
      requestedTime: '02:30PM',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'accepted',
      urgency: 'low',
      reason: 'Annual health screening',
      phone: '+1 (555) 345-6789',
      email: 'mark.paul@bcdsmith.com',
      age: 38,
      lastVisit: '1 year ago',
      notes: 'Annual checkup. Patient is generally healthy.',
      requestTime: '3 hours ago'
    },
    {
      id: 4,
      patientName: 'Ron Lewis',
      company: 'Practo Pharma',
      requestedDate: '21st December',
      requestedTime: '02:30PM',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'rejected',
      urgency: 'medium',
      reason: 'Follow-up for diabetes management',
      phone: '+1 (555) 456-7890',
      email: 'ron.lewis@practopharma.com',
      age: 41,
      lastVisit: '2 months ago',
      notes: 'Diabetes patient requiring regular monitoring.',
      requestTime: '4 hours ago'
    },
    {
      id: 5,
      patientName: 'Sarah Johnson',
      company: 'MediCore Solutions',
      requestedDate: '22nd December',
      requestedTime: '10:00AM',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'pending',
      urgency: 'high',
      reason: 'Severe migraine consultation',
      phone: '+1 (555) 567-8901',
      email: 'sarah.j@medicore.com',
      age: 29,
      lastVisit: '2 weeks ago',
      notes: 'Patient experiencing severe migraines. Needs immediate consultation.',
      requestTime: '30 minutes ago'
    },
    {
      id: 6,
      patientName: 'David Chen',
      company: 'HealthTech Inc',
      requestedDate: '22nd December',
      requestedTime: '03:15PM',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'pending',
      urgency: 'low',
      reason: 'Vaccination consultation',
      phone: '+1 (555) 678-9012',
      email: 'david.chen@healthtech.com',
      age: 35,
      lastVisit: '6 months ago',
      notes: 'Routine vaccination and health assessment.',
      requestTime: '5 hours ago'
    }
  ];

  const filteredRequests = appointmentRequests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAccept = (requestId) => {
    console.log('Accepting request:', requestId);
    // Handle accept logic
  };

  const handleReject = (requestId) => {
    console.log('Rejecting request:', requestId);
    // Handle reject logic
  };

  const handleCheckAvailability = (requestId) => {
    console.log('Checking availability for request:', requestId);
    // Handle availability check logic
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return CheckCircle;
      case 'rejected': return XCircle;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Appointment Requests</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage incoming appointment requests from patients
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{appointmentRequests.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentRequests.filter(r => r.status === 'accepted').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-xl">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentRequests.filter(r => r.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients, companies, or reasons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Appointment Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              const isExpanded = selectedRequest === request.id;

              return (
                <div key={request.id} className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.avatar}
                          alt={request.patientName}
                          className="w-16 h-16 rounded-full object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {request.patientName}
                            </h3>
                            <span className="text-sm text-gray-500">from</span>
                            <span className="text-sm font-medium text-[var(--color-primary)]">
                              {request.company}
                            </span>
                            <div className="flex items-center space-x-2">
                              <StatusIcon className="h-4 w-4" />
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-2">
                            requested your appointment for{' '}
                            <span className="font-medium">{request.requestedDate}</span> at{' '}
                            <span className="font-medium">{request.requestedTime}</span>
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{request.requestTime}</span>
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                              {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedRequest(isExpanded ? null : request.id)}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>

                        <button
                          onClick={() => handleCheckAvailability(request.id)}
                          className="px-4 py-2 text-[var(--color-primary)] hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
                        >
                          Check my availability
                        </button>

                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                            >
                              REJECT
                            </button>
                            <button
                              onClick={() => handleAccept(request.id)}
                              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                            >
                              ACCEPT
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Patient Information
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{request.phone}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{request.email}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-700">Age: {request.age}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-700">Last visit: {request.lastVisit}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Appointment Details
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm font-medium text-gray-700">Reason:</span>
                                <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700">Notes:</span>
                                <p className="text-sm text-gray-600 mt-1">{request.notes}</p>
                              </div>
                            </div>

                            <div className="flex space-x-3 mt-6">
                              <button className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message Patient
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                View History
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointment requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No requests match your current search and filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequests;
