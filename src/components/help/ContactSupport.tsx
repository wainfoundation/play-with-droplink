
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactSupport = () => {
  return (
    <div className="text-center mt-16">
      <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
      <p className="mb-6 text-muted-foreground">
        Can't find the answers you're looking for? Contact our friendly support team.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild>
          <Link to="/contact">Contact Support</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/community">Visit Community Forum</Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactSupport;
