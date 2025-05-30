import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import GoToTop from '@/components/GoToTop';

const Careers = () => {
  const departments = [
    {
      id: "engineering",
      name: "Engineering",
      description: "Build the future of creator tools on Pi Network",
      positions: [
        { id: 1, title: "Frontend Engineer", location: "Remote", type: "Full-time" },
        { id: 2, title: "Backend Engineer", location: "Remote", type: "Full-time" },
        { id: 3, title: "Mobile Developer", location: "Remote", type: "Contract" }
      ]
    },
    {
      id: "product",
      name: "Product",
      description: "Define and build products that creators love",
      positions: [
        { id: 4, title: "Product Manager", location: "Remote", type: "Full-time" },
        { id: 5, title: "Product Designer", location: "Remote", type: "Full-time" }
      ]
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "Share our story with the world",
      positions: [
        { id: 6, title: "Marketing Manager", location: "Remote", type: "Full-time" },
        { id: 7, title: "Content Creator", location: "Remote", type: "Part-time" }
      ]
    },
    {
      id: "community",
      name: "Community",
      description: "Build and nurture our Pi Network creator community",
      positions: [
        { id: 8, title: "Community Manager", location: "Remote", type: "Full-time" },
        { id: 9, title: "Support Specialist", location: "Remote", type: "Full-time" }
      ]
    }
  ];

  const values = [
    {
      title: "Community First",
      description: "We build for the Pi community, with the community. Your feedback shapes our platform.",
      icon: "👥"
    },
    {
      title: "Pioneer Spirit",
      description: "We're trailblazers in an emerging ecosystem, embracing new challenges with creativity.",
      icon: "🚀"
    },
    {
      title: "Creator Empowerment",
      description: "We're passionate about giving creators the tools they need to succeed.",
      icon: "💪"
    },
    {
      title: "Remote-First",
      description: "We believe talent is global. Work from anywhere and on your own terms.",
      icon: "🌎"
    }
  ];

  const benefits = [
    "Competitive compensation with Pi Network incentives",
    "Flexible working hours and locations",
    "Health and wellness stipends",
    "Professional development budget",
    "Regular team retreats and events",
    "Equipment and home office stipend",
    "Unlimited paid time off",
    "Parental leave"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="gradient-hero text-white py-20 px-6 relative overflow-hidden">
          <div className="container mx-auto text-center relative z-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Droplink Team</h1>
            <p className="text-xl mb-8">
              Help us build the future of creator tools for the Pi Network ecosystem. 
              We're looking for passionate people who want to make an impact.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-opacity-90">
              <a href="#open-positions">View Open Positions</a>
            </Button>
          </div>
        </div>
        
        {/* Values Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <div className="lg:flex gap-12 items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold mb-6">Benefits & Perks</h2>
                <p className="text-lg mb-8">
                  We believe in taking care of our team so they can focus on making an impact.
                  Here are some of the benefits we offer:
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary text-white rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaboration" 
                  className="rounded-xl shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section id="open-positions" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
              We're growing our team across multiple departments. Find a role that matches your skills and passion.
            </p>
            
            {departments.map(department => (
              <div key={department.id} className="mb-12">
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-semibold mr-4">{department.name}</h3>
                  <div className="h-[1px] bg-border flex-grow"></div>
                </div>
                <p className="text-lg mb-6">{department.description}</p>
                
                <div className="space-y-4">
                  {department.positions.map(position => (
                    <div key={position.id} className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="md:flex justify-between items-center">
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{position.title}</h4>
                          <div className="flex items-center text-muted-foreground">
                            <span className="mr-4">{position.location}</span>
                            <span>{position.type}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <CareerApplicationForm position={position} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold mb-4">Don't see a role that fits?</h3>
              <p className="mb-6">We're always looking for talented people. Send us your resume anyway!</p>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Application Process</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Application Review</h3>
                  <p>Our team reviews your application and resume to see if there's a potential fit.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Initial Interview</h3>
                  <p>A 30-minute video call with a team member to discuss your experience and interest.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Skills Assessment</h3>
                  <p>A small project or technical interview relevant to the role you're applying for.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Team Interview</h3>
                  <p>Meet with potential teammates to ensure there's a good fit on both sides.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Offer</h3>
                  <p>If everyone's excited to work together, we'll extend an offer to join our team!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTA />
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default Careers;
