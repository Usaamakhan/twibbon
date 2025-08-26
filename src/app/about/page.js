import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    { name: 'Alex Johnson', role: 'CEO & Founder', avatar: 'AJ' },
    { name: 'Sarah Chen', role: 'CTO', avatar: 'SC' },
    { name: 'Michael Park', role: 'Head of Design', avatar: 'MP' },
    { name: 'Emily Davis', role: 'Head of Marketing', avatar: 'ED' }
  ];

  const milestones = [
    { year: '2020', event: 'Framely was founded', icon: '🚀' },
    { year: '2021', event: 'Reached 10K active users', icon: '🎯' },
    { year: '2022', event: 'Launched mobile apps', icon: '📱' },
    { year: '2023', event: 'Expanded globally to 150+ countries', icon: '🌍' },
    { year: '2024', event: '2M+ campaigns created', icon: '🎉' }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries to create better tools for digital activism',
      icon: '💡'
    },
    {
      title: 'Community',
      description: 'Building connections and empowering voices worldwide',
      icon: '🤝'
    },
    {
      title: 'Impact',
      description: 'Measuring success by the positive change we enable',
      icon: '🎯'
    },
    {
      title: 'Transparency',
      description: 'Open and honest in everything we do',
      icon: '🔍'
    }
  ];

  return (
  <div className="min-h-screen bg-gray-50">
      
      <main className="container-custom py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Framely
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to empower individuals and organizations to create 
            meaningful social campaigns through the power of visual storytelling.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Framely was born from the belief that everyone should have the tools to 
                amplify their voice and support causes they care about. We provide a platform 
                that makes it simple to create, share, and participate in visual campaigns 
                that drive real change.
              </p>
              <p className="text-gray-600">
                From environmental movements to social justice campaigns, from celebrating 
                achievements to raising awareness, Framely helps millions of people show 
                their support and unite for causes that matter.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">2M+</div>
                  <div className="text-gray-600">Campaigns Created</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">150+</div>
                  <div className="text-gray-600">Countries Reached</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">100K+</div>
                  <div className="text-gray-600">Active Creators</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center mb-8 last:mb-0">
                  <div className="absolute left-0 w-16 h-16 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center text-2xl">
                    {milestone.icon}
                  </div>
                  <div className="ml-24 bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex-1">
                    <div className="text-sm text-primary-600 font-semibold mb-1">{milestone.year}</div>
                    <p className="text-gray-900 font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a creator, activist, or supporter, there's a place for you in the Framely community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Creating
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </main>
      
  {/* Footer provided by root layout */}
    </div>
  );
}