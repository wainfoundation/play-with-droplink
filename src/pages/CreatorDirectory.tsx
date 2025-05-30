import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import GoToTop from '@/components/GoToTop';

const CreatorDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const creators = [
    {
      id: 1,
      username: "artbymia",
      name: "Mia Chen",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "artist",
      featured: true,
      bio: "Digital artist specializing in Pi-themed artwork and NFTs"
    },
    {
      id: 2,
      username: "techexplorer",
      name: "Alex Rivera",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "technology",
      featured: false,
      bio: "Technology educator explaining Pi Network concepts"
    },
    {
      id: 3,
      username: "fitnesswithsam",
      name: "Sam Johnson",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "fitness",
      featured: true,
      bio: "Fitness coach offering Pi-payable workout programs"
    },
    {
      id: 4,
      username: "musicbyluna",
      name: "Luna Park",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "music",
      featured: false,
      bio: "Independent musician selling tracks and accepting Pi tips"
    },
    {
      id: 5,
      username: "cooknwithkai",
      name: "Kai Wong",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "food",
      featured: true,
      bio: "Chef sharing recipes and cooking tutorials for Pi Network"
    },
    {
      id: 6,
      username: "travelwithemma",
      name: "Emma Clark",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "travel",
      featured: false,
      bio: "Travel blogger documenting Pi-friendly destinations"
    },
    {
      id: 7,
      username: "devjordan",
      name: "Jordan Lee",
      image: "https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "technology",
      featured: true,
      bio: "Developer creating tools for the Pi ecosystem"
    },
    {
      id: 8,
      username: "mindfulnesscoach",
      name: "Olivia Green",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "wellness",
      featured: false,
      bio: "Mindfulness coach offering guided meditations for Pi"
    },
    {
      id: 9,
      username: "fashionista",
      name: "Maya Rodriguez",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "fashion",
      featured: true,
      bio: "Fashion designer selling sustainable clothing for Pi"
    },
    {
      id: 10,
      username: "pieconomist",
      name: "David Kim",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "finance",
      featured: false,
      bio: "Economist analyzing Pi Network's ecosystem growth"
    },
    {
      id: 11,
      username: "gamergirl",
      name: "Zoe Taylor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "gaming",
      featured: true,
      bio: "Gamer integrating Pi Network payments into gaming"
    },
    {
      id: 12,
      username: "writerdude",
      name: "Nathan Smith",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "writing",
      featured: false,
      bio: "Author publishing Pi-exclusive short stories and novels"
    }
  ];
  
  const filteredCreators = activeTab === "all" 
    ? creators.filter(creator => 
        creator.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : creators.filter(creator => 
        creator.category === activeTab &&
        (creator.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
         creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         creator.bio.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Creators</h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Explore our directory of innovative creators using Droplink to share content and accept Pi payments.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search by name, username, or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Button asChild className="md:w-auto w-full">
                <Link to="/signup">Join Directory</Link>
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="max-w-3xl mx-auto" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="artist">Art</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="technology">Tech</TabsTrigger>
                <TabsTrigger value="fashion">Fashion</TabsTrigger>
                <TabsTrigger value="fitness">Fitness</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {filteredCreators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCreators.map(creator => (
                  <div key={creator.id} className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col">
                    <div className="flex items-center gap-4">
                      <img 
                        src={creator.image} 
                        alt={creator.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{creator.name}</h3>
                        <p className="text-primary font-medium">@{creator.username}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 mb-6">
                      <p className="text-muted-foreground">{creator.bio}</p>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <Badge variant={creator.featured ? "default" : "outline"}>
                        {creator.category.charAt(0).toUpperCase() + creator.category.slice(1)}
                      </Badge>
                      <Button size="sm" asChild>
                        <a href={`https://droplink.io/${creator.username}`} target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-3">No creators found</h3>
                <p className="text-muted-foreground mb-8">Try a different search or category</p>
                <Button onClick={() => {setSearchQuery(""); setActiveTab("all");}}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Become a Creator */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card rounded-xl p-8 md:p-10 shadow-sm">
              <div className="md:flex items-center gap-8">
                <div className="md:w-3/5 mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-4">Want to be featured in our directory?</h2>
                  <p className="text-lg mb-6">
                    Create your Droplink profile and join our growing community of Pi Network creators.
                    Get discovered by thousands of potential fans and customers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link to="/signup">Create Your Profile</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/features">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="md:w-2/5">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Creators collaborating" 
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default CreatorDirectory;
