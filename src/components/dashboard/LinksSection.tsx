
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LinksSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Links</CardTitle>
        <CardDescription>
          Manage and organize all your links in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-medium mb-2">No links yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first link below</p>
          <Button className="bg-primary hover:bg-primary/90">
            Add Your First Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinksSection;
