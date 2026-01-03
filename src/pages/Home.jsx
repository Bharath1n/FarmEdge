import React from "react";
import { ArrowRight, CloudSun, TrendingUp, Bot, Leaf, Shield, Users, Mail, Phone, MapPin, Sparkles, ChevronDown } from "lucide-react";

const Home = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
      alert('Thank you for your message! We\'ll get back to you soon.');
    }
  };

  const ContactInfoItem = ({ icon: Icon, title, value }) => (
    <div className="flex items-start space-x-4 group">
      <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-3 rounded-2xl min-w-12 min-h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
        <p className="text-gray-600 text-sm break-words">{value}</p>
      </div>
    </div>
  );

  const features = [
    {
      id: 1,
      title: "Real-Time Weather Intelligence",
      description: "Advanced meteorological data with hyper-local forecasting, severe weather alerts, and optimal planting recommendations.",
      icon: CloudSun,
      gradient: "from-blue-400 via-cyan-400 to-blue-500",
      bgGradient: "from-blue-50 to-cyan-50",
      buttonText: "Explore Weather"
    },
    {
      id: 2,
      title: "Market Analytics",
      description: "Real-time commodity prices, demand forecasting, and market trends to optimize your selling strategy and maximize profits.",
      icon: TrendingUp,
      gradient: "from-emerald-400 via-green-400 to-emerald-500",
      bgGradient: "from-emerald-50 to-green-50",
      buttonText: "View Markets"
    },
    {
      id: 3,
      title: "AI Farm Assistant",
      description: "Personalized farming guidance powered by machine learning, crop disease detection, and yield optimization strategies.",
      icon: Bot,
      gradient: "from-purple-400 via-violet-400 to-purple-500",
      bgGradient: "from-purple-50 to-violet-50",
      buttonText: "Chat with AI"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Data Security",
      description: "Your farm data is protected with enterprise-grade security measures"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 access to agricultural experts and technical support"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promote eco-friendly farming practices for a better tomorrow"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Animated Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="mb-8 animate-bounce">
              <span className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 shadow-lg backdrop-blur-sm border border-emerald-200">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Smart Agriculture Platform
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300">Welcome to</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 animate-gradient">
                FarmEdge
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-14 max-w-3xl mx-auto leading-relaxed">
              Empowering farmers with cutting-edge technology, real-time insights, and sustainable solutions for modern agriculture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-110 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold shadow-xl hover:bg-emerald-600 hover:text-white transition-all duration-500 hover:scale-110">
                Watch Demo
              </button>
            </div>
            
            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { number: "10K+", label: "Active Farmers" },
                { number: "50M+", label: "Acres Monitored" },
                { number: "95%", label: "Accuracy Rate" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-emerald-100"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 animate-bounce">
              <ChevronDown className="w-8 h-8 text-emerald-600 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full text-emerald-700 font-semibold mb-6">
              Our Features
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Everything You Need for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Smart Farming</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to optimize your farming operations and maximize yield.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group relative bg-gradient-to-br ${feature.bgGradient} p-10 rounded-3xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-gray-100`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className={`relative bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="relative text-3xl font-black text-gray-900 mb-5 group-hover:text-emerald-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="relative text-gray-600 mb-8 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                <button className="relative inline-flex items-center text-emerald-600 font-bold text-lg group-hover:text-emerald-700 transition-colors">
                  {feature.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Section */}
      <div className="py-32 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-emerald-700 font-semibold mb-6 shadow-lg">
              Why Choose Us
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Why Choose FarmEdge?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of farmers who trust FarmEdge for their agricultural needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-emerald-400 to-green-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <benefit.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative py-32 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/50 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-2xl text-emerald-50 mb-14 leading-relaxed">
            Join thousands of farmers who have already revolutionized their farming practices with FarmEdge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group px-12 py-6 bg-white text-emerald-600 rounded-2xl font-black text-lg shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-110">
              Start Free Trial
            </button>
            
            <button className="group px-12 py-6 border-3 border-white text-white rounded-2xl font-black text-lg hover:bg-white hover:text-emerald-600 transition-all duration-500 hover:scale-110 backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full text-emerald-700 font-semibold mb-6">
              Contact Us
            </span>
            <h2 className="text-5xl font-black text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help you succeed.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-emerald-100">
              <div className="space-y-8">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg resize-none"
                    rows="6"
                    placeholder="Tell us about your farming needs..."
                  ></textarea>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.name || !formData.email || !formData.message}
                >
                  Send Message
                </button>
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="bg-white p-10 rounded-3xl shadow-xl">
                <h3 className="text-3xl font-black text-gray-900 mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <ContactInfoItem
                    icon={Mail}
                    title="Email"
                    value="support@farmedge.com"
                  />
                  <ContactInfoItem
                    icon={Phone}
                    title="Phone"
                    value="+91 80123 45678"
                  />
                  <ContactInfoItem
                    icon={MapPin}
                    title="Address"
                    value="Bengaluru, Karnataka, India"
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-10 rounded-3xl shadow-xl border border-emerald-200">
                <h4 className="text-2xl font-black text-gray-900 mb-6">Office Hours</h4>
                <div className="space-y-3 text-gray-700 text-lg">
                  <p className="font-semibold">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="font-semibold">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="font-semibold">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default Home;