import React, { useState, useEffect } from 'react';
import { Heart, Search, MessageSquare, Calendar, Zap, Star, Users, CheckCircle, Menu, X } from 'lucide-react';

const BeCoachlyMVP = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [coaches, setCoaches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  // Initialize demo coaches
  useEffect(() => {
    const demoCoaches = [
      {
        id: 1,
        name: 'Sarah Chen',
        specialty: 'Weight Management',
        bio: 'Holistic nutrition coach specializing in sustainable lifestyle changes',
        rating: 4.9,
        reviews: 47,
        image: '👩‍⚕️',
        availability: ['Mon 2-4pm', 'Wed 10-12pm', 'Fri 3-5pm'],
        proBono: 2,
        tags: ['Nutrition', 'Lifestyle', 'Women\'s Health']
      },
      {
        id: 2,
        name: 'Marcus Johnson',
        specialty: 'Performance & Fitness',
        bio: 'Certified coach helping athletes optimize nutrition for peak performance',
        rating: 4.8,
        reviews: 52,
        image: '💪',
        availability: ['Tue 6-8pm', 'Thu 5-7pm', 'Sat 9-11am'],
        proBono: 1,
        tags: ['Sports Nutrition', 'Performance', 'Training']
      },
      {
        id: 3,
        name: 'Elena Rodriguez',
        specialty: 'Women\'s Wellness',
        bio: 'Expert in hormonal health and nutrition for all life stages',
        rating: 4.9,
        reviews: 38,
        image: '🌸',
        availability: ['Mon 11-1pm', 'Wed 2-4pm', 'Sat 10-12pm'],
        proBono: 3,
        tags: ['Womens Health', 'Hormones', 'Wellness']
      },
      {
        id: 4,
        name: 'David Park',
        specialty: 'Diabetes & Medical Nutrition',
        bio: 'Registered Dietitian with 10+ years in medical nutrition therapy',
        rating: 4.7,
        reviews: 61,
        image: '🏥',
        availability: ['Tue 1-3pm', 'Thu 9-11am', 'Fri 2-4pm'],
        proBono: 4,
        tags: ['Medical', 'Diabetes', 'Chronic Disease']
      },
      {
        id: 5,
        name: 'Ava Mitchell',
        specialty: 'Plant-Based Nutrition',
        bio: 'Passionate about plant-based living and complete nutrition',
        rating: 4.8,
        reviews: 29,
        image: '🌱',
        availability: ['Mon 3-5pm', 'Thu 2-4pm', 'Sun 10-12pm'],
        proBono: 2,
        tags: ['Plant-Based', 'Sustainability', 'Ethics']
      }
    ];
    setCoaches(demoCoaches);
  }, []);

  // Quiz data
  const quizQuestions = [
    {
      question: 'What\'s your main health goal?',
      options: ['Weight Management', 'Athletic Performance', 'Medical Management', 'General Wellness', 'Energy & Vitality']
    },
    {
      question: 'Preferred coaching style?',
      options: ['Data-driven & structured', 'Holistic & flexible', 'Medical & science-based', 'Sustainable & gradual', 'Intensive & transformative']
    },
    {
      question: 'Current dietary preference?',
      options: ['Omnivore', 'Pescatarian', 'Vegetarian', 'Vegan', 'Flexible']
    },
    {
      question: 'How often can you commit?',
      options: ['Weekly sessions', 'Bi-weekly', 'Monthly check-ins', 'Ad-hoc as needed', 'Group sessions only']
    }
  ];

  const matchCoaches = (responses) => {
    // Simple matching algorithm
    const matched = coaches.sort(() => Math.random() - 0.5).slice(0, 3);
    setUserProfile({
      responses,
      matchedCoaches: matched,
      name: 'You'
    });
    setCurrentPage('dashboard');
  };

  const bookSession = (coach, date) => {
    const newBooking = {
      id: Date.now(),
      coach: coach.name,
      date,
      status: 'confirmed',
      coachImage: coach.image
    };
    setBookings([...bookings, newBooking]);
    setSelectedCoach(null);
    setSelectedDate('');
  };

  // NAVIGATION HEADER
  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-7 h-7 text-teal-600 fill-teal-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">BeCoachly</span>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <button onClick={() => setCurrentPage('home')} className={`text-sm font-medium transition ${currentPage === 'home' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}>
            Home
          </button>
          <button onClick={() => setCurrentPage('coaches')} className={`text-sm font-medium transition ${currentPage === 'coaches' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}>
            Find Coach
          </button>
          <button onClick={() => setCurrentPage('dashboard')} className={`text-sm font-medium transition ${currentPage === 'dashboard' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}>
            Dashboard
          </button>
          <button onClick={() => setCurrentPage('admin')} className={`text-sm font-medium transition ${currentPage === 'admin' ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}>
            Platform
          </button>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-teal-100 bg-white">
          <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50">Home</button>
          <button onClick={() => { setCurrentPage('coaches'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50">Find Coach</button>
          <button onClick={() => { setCurrentPage('dashboard'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50">Dashboard</button>
          <button onClick={() => { setCurrentPage('admin'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50">Platform</button>
        </div>
      )}
    </header>
  );

  // HOME PAGE
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-blue-50 pt-20">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">Find Your Perfect Health Coach</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Personalized nutrition & wellness coaching matched to your goals. Start your journey with expert coaches dedicated to your success.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => setCurrentPage('coaches')}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            Browse Coaches
          </button>
          <button
            onClick={() => {
              setQuizStep(0);
              setQuizResponses({});
              setCurrentPage('quiz');
            }}
            className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition"
          >
            Take Matching Quiz
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 border border-teal-100 hover:shadow-lg transition">
            <Users className="w-8 h-8 text-teal-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">{coaches.length}+</p>
            <p className="text-gray-600 mt-2">Verified Coaches</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-teal-100 hover:shadow-lg transition">
            <Zap className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">2,847</p>
            <p className="text-gray-600 mt-2">Clients Matched</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-teal-100 hover:shadow-lg transition">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">4.8★</p>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-8 border border-teal-100">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Search />, title: 'Find', desc: 'Browse or match with coaches' },
              { icon: <MessageSquare />, title: 'Connect', desc: 'Direct messaging & intro call' },
              { icon: <Calendar />, title: 'Book', desc: 'Schedule sessions easily' },
              { icon: <Zap />, title: 'Transform', desc: 'Achieve your health goals' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-teal-50 rounded-lg p-4 w-fit mx-auto mb-4">
                  {React.cloneElement(item.icon, { className: 'w-6 h-6 text-teal-600' })}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro-Bono Highlight */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Committed to Access</h2>
          <p className="text-lg opacity-95">Coaches donate {coaches.reduce((sum, c) => sum + c.proBono, 0)} pro-bono sessions monthly for those who need support.</p>
        </div>
      </section>
    </div>
  );

  // COACHES BROWSE PAGE
  const CoachesPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Find Your Coach</h1>
        <p className="text-gray-600 mb-8">Browse our network of certified nutrition & wellness coaches</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map(coach => (
            <div key={coach.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition group">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 text-center">
                <div className="text-6xl mb-4">{coach.image}</div>
                <h3 className="text-xl font-bold text-gray-900">{coach.name}</h3>
                <p className="text-teal-600 font-semibold text-sm mt-1">{coach.specialty}</p>
              </div>

              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">{coach.bio}</p>
                
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{coach.rating}</span>
                  <span className="text-gray-500 text-sm">({coach.reviews} reviews)</span>
                </div>

                <div className="mb-4 pb-4 border-t border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-2">SPECIALTIES</p>
                  <div className="flex flex-wrap gap-2">
                    {coach.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{coach.proBono} pro-bono slots/month</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCoach(coach);
                    setCurrentPage('booking');
                  }}
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // QUIZ PAGE
  const QuizPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 border border-teal-100">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">Question {quizStep + 1} of {quizQuestions.length}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {quizQuestions[quizStep].question}
          </h2>

          <div className="space-y-3 mb-8">
            {quizQuestions[quizStep].options.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  const newResponses = { ...quizResponses, [quizStep]: option };
                  setQuizResponses(newResponses);
                  if (quizStep < quizQuestions.length - 1) {
                    setQuizStep(quizStep + 1);
                  } else {
                    matchCoaches(newResponses);
                  }
                }}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition cursor-pointer font-medium text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );

  // BOOKING PAGE
  const BookingPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => setCurrentPage('coaches')}
          className="text-teal-600 font-semibold mb-6 flex items-center gap-2 hover:gap-3 transition"
        >
          ← Back to Coaches
        </button>

        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          {selectedCoach && (
            <>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selectedCoach.image}</div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedCoach.name}</h2>
                <p className="text-teal-600 font-semibold mt-2">{selectedCoach.specialty}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Available Time</h3>
                <div className="space-y-2">
                  {selectedCoach.availability.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(slot)}
                      className={`w-full p-4 border-2 rounded-lg font-medium transition ${
                        selectedDate === slot
                          ? 'border-teal-600 bg-teal-50 text-teal-900'
                          : 'border-gray-200 hover:border-teal-600 text-gray-900'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <button
                  onClick={() => {
                    bookSession(selectedCoach, selectedDate);
                    setCurrentPage('dashboard');
                  }}
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Confirm Booking
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  // DASHBOARD PAGE
  const DashboardPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Your Dashboard</h1>

        {userProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Matches</h2>
              <div className="space-y-3">
                {userProfile.matchedCoaches.map(coach => (
                  <div key={coach.id} className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{coach.image}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{coach.name}</p>
                        <p className="text-sm text-gray-600">{coach.specialty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage('coaches')}
                className="w-full mt-4 border-2 border-teal-600 text-teal-600 py-2 rounded-lg font-semibold hover:bg-teal-50 transition"
              >
                View All Coaches
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-gray-600">No sessions booked yet</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map(booking => (
                    <div key={booking.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-3">
                      <span className="text-2xl">{booking.coachImage}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{booking.coach}</p>
                        <p className="text-sm text-gray-600">{booking.date}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {!userProfile && (
          <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Start by taking our matching quiz to find your perfect coach</p>
            <button
              onClick={() => {
                setQuizStep(0);
                setQuizResponses({});
                setCurrentPage('quiz');
              }}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Take Quiz Now
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ADMIN PAGE
  const AdminPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Platform Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Coaches', value: coaches.length, icon: '👥' },
            { label: 'Total Sessions Booked', value: bookings.length, icon: '📅' },
            { label: 'Pro-Bono Available', value: coaches.reduce((sum, c) => sum + c.proBono, 0), icon: '💚' },
            { label: 'Avg Rating', value: '4.8★', icon: '⭐' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Coach Performance</h2>
            <div className="space-y-3">
              {coaches.map(coach => (
                <div key={coach.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{coach.name}</p>
                    <p className="text-xs text-gray-600">{coach.reviews} reviews</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-500">{coach.rating}★</p>
                    <p className="text-xs text-gray-600">{coach.proBono} pro-bono</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {bookings.map(booking => (
                  <div key={booking.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">{booking.coach}</p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                    <p className="text-xs text-green-600 mt-1">✓ Confirmed</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 border border-teal-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Uptime</p>
              <p className="text-3xl font-bold text-green-600">99.9%</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Avg Match Time</p>
              <p className="text-3xl font-bold text-blue-600">2.4s</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Satisfaction</p>
              <p className="text-3xl font-bold text-teal-600">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'coaches' && <CoachesPage />}
      {currentPage === 'quiz' && <QuizPage />}
      {currentPage === 'booking' && <BookingPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'admin' && <AdminPage />}
    </div>
  );
};

export default BeCoachlyMVP;
