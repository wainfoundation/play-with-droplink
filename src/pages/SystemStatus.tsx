import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GoToTop from '@/components/GoToTop';

const SystemStatus = () => {
  // Mock data for system status - in a real app, this would come from an API
  const systemServices = [
    {
      name: "Website",
      status: "operational",
      description: "Main website and landing pages",
      uptime: "99.9%",
      lastIncident: null
    },
    {
      name: "Dashboard",
      status: "operational", 
      description: "User dashboard and profile management",
      uptime: "99.8%",
      lastIncident: null
    },
    {
      name: "Pi Network Integration",
      status: "operational",
      description: "Pi authentication and payments",
      uptime: "99.7%",
      lastIncident: null
    },
    {
      name: "Database",
      status: "operational",
      description: "Data storage and retrieval",
      uptime: "99.9%",
      lastIncident: null
    },
    {
      name: "File Storage",
      status: "operational",
      description: "Image and file uploads",
      uptime: "99.8%",
      lastIncident: null
    },
    {
      name: "Analytics",
      status: "operational",
      description: "Link click tracking and analytics",
      uptime: "99.6%",
      lastIncident: null
    }
  ];

  const recentIncidents = [
    {
      date: "2025-01-26",
      title: "Scheduled Maintenance",
      description: "Database optimization and security updates",
      status: "resolved",
      duration: "2 hours"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "maintenance":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      operational: "default",
      degraded: "secondary", 
      down: "destructive",
      maintenance: "outline"
    };
    
    return (
      <Badge variant={variants[status] || "default"} className="capitalize">
        {status}
      </Badge>
    );
  };

  const overallStatus = systemServices.every(service => service.status === "operational") 
    ? "All Systems Operational" 
    : "Some Systems Experiencing Issues";

  const overallStatusColor = systemServices.every(service => service.status === "operational")
    ? "text-green-600"
    : "text-yellow-600";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">System Status</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Real-time status of Droplink services and infrastructure
              </p>
              <div className={`text-xl font-semibold ${overallStatusColor}`}>
                {overallStatus}
              </div>
            </div>

            {/* Current Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
                <CardDescription>
                  Status of all Droplink services as of {new Date().toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div className="font-medium">{service.uptime}</div>
                          <div className="text-muted-foreground">uptime</div>
                        </div>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Incidents */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>
                  Past incidents and maintenance windows
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentIncidents.length > 0 ? (
                  <div className="space-y-4">
                    {recentIncidents.map((incident, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{incident.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {incident.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Date: {incident.date}</span>
                          <span>Duration: {incident.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No recent incidents to report. All systems have been running smoothly!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Status Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Status Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Operational</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">Degraded</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-sm">Down</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Maintenance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-muted rounded-lg text-center">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                If you're experiencing issues not reflected here, please contact our support team at{" "}
                <a href="mailto:support@droplink.space" className="text-primary hover:underline">
                  support@droplink.space
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default SystemStatus;
