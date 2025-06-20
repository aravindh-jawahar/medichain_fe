import React, { useState } from 'react';
import {
  Search,
  Plus,
  MessageSquare,
  FileText,
  Download,
  Droplet,
  Heart,
  Activity
} from 'lucide-react';

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState('Emma Astrid');
  const [activeTab, setActiveTab] = useState('Past visits');

  const patients = [
    {
      name: 'Courtney Acacia',
      condition: 'Coronavirus',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'A'
    },
    {
      name: 'Phillip Adams',
      condition: 'Acute respiratory infection',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'A'
    },
    {
      name: 'Emma Astrid',
      condition: 'Varicella',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'A',
      selected: true
    },
    {
      name: 'Christina Bagel',
      condition: 'Flu',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'B'
    },
    {
      name: 'Ben Barton',
      condition: 'Diabetes',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'B'
    },
    {
      name: 'Antoine Boanivier',
      condition: 'Arthritis',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'B'
    },
    {
      name: 'Sandra Bullock',
      condition: 'Allergy',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      section: 'B'
    }
  ];

  const documents = [
    { name: 'Check up results 20/12.pdf', icon: FileText },
    { name: 'Cardiac research.exls', icon: FileText },
    { name: 'Full body X-ray.zip', icon: FileText },
    { name: 'Check up results 12/12.pdf', icon: FileText }
  ];

  const diagnoses = [
    {
      condition: 'Varicella, no hospitalization.',
      date: '21/06/2021',
      icon: '🦠',
      color: 'bg-green-50'
    },
    {
      condition: 'Angina, ear complications.',
      date: '12/03/2021',
      icon: '🫀',
      color: 'bg-blue-50'
    }
  ];

  const healthMetrics = [
    {
      label: 'Blood pressure',
      value: '120/80',
      icon: Droplet,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'Heart rate',
      value: '90',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Glucose level',
      value: '5.2',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const tabs = ['Past visits', 'Future visit', 'Medical reports'];

  const groupedPatients = patients.reduce((acc, patient) => {
    if (!acc[patient.section]) {
      acc[patient.section] = [];
    }
    acc[patient.section].push(patient);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedPatients).map(([section, sectionPatients]) => (
            <div key={section}>
              <div className="px-6 py-3 text-sm font-semibold text-gray-500 bg-gray-50">
                {section}
              </div>
              {sectionPatients.map((patient) => (
                <div
                  key={patient.name}
                  onClick={() => setSelectedPatient(patient.name)}
                  className={`px-6 py-4 cursor-pointer transition-colors border-l-4 ${
                    patient.selected
                      ? 'bg-green-50 border-[var(--color-primary)]'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {patient.condition}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Patient Details */}
        <div className="flex-1 p-8">
          {/* Patient Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                alt="Emma Astrid"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Emma Astrid</h2>
                <p className="text-gray-600">+31-10-20-305</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-[var(--color-primary)] btn text-white hover:bg-green-600 transition-colors flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Send message</span>
            </button>
          </div>

          {/* Patient Info Grid */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-sm text-gray-500 mb-1">Gender</div>
              <div className="font-semibold text-gray-900">Female</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Birth Date</div>
              <div className="font-semibold text-gray-900">12/12/1988</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Nationality</div>
              <div className="font-semibold text-gray-900">French</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Patient number</div>
              <div className="font-semibold text-gray-900">MD-1437A</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Age</div>
              <div className="font-semibold text-gray-900">33</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Language</div>
              <div className="font-semibold text-gray-900">English</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Latest Diagnoses */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest diagnoses</h3>
            <div className="grid grid-cols-2 gap-4">
              {diagnoses.map((diagnosis, index) => (
                <div key={index} className={`p-4 rounded-2xl ${diagnosis.color}`}>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{diagnosis.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {diagnosis.condition}
                      </div>
                      <div className="text-sm text-gray-600">{diagnosis.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Averages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health averages</h3>
            <div className="grid grid-cols-3 gap-4">
              {healthMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div key={index} className={`p-6 rounded-2xl ${metric.bgColor}`}>
                    <div className="flex flex-col items-center text-center">
                      <IconComponent className={`w-8 h-8 ${metric.color} mb-3`} />
                      <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                      <div className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          {/* Latest Documents */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Latest documents</h3>
              <button className="text-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center space-x-1 text-sm">
                <Plus className="w-4 h-4" />
                <span>Add doc</span>
              </button>
            </div>
            <div className="space-y-3">
              {documents.map((doc, index) => {
                const IconComponent = doc.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <IconComponent className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">{doc.name}</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div>• Remind you to see a cardiologist</div>
              <div>• Clarify the status of the diet</div>
              <div>• Next scheduled checkup in 3 months</div>
            </div>
            <button className="w-full px-4 py-3 border-2 btn rounded-xl hover:bg-green-50 transition-colors font-medium">
              Change notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
