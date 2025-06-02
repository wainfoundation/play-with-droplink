
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Gamepad2, Brain, HelpCircle, Shield, FileText, Grid3X3, LogOut, LogIn, UserPlus } from "lucide-react";

const DesktopNavigation = () => {
  const { user, signOut } = useAuth();

  const navigationItems = [
    {
      title: "Games",
      items: [
        {
          title: "Play with Droplink",
          href: "/play",
          description: "Interactive games with your virtual pet companion",
          icon: Gamepad2
        },
        {
          title: "Trivia Time",
          href: "/trivia",
          description: "Test your knowledge and earn Pi rewards",
          icon: Brain
        }
      ]
    },
    {
      title: "More",
      items: [
        {
          title: "Help",
          href: "/help",
          description: "Get help and learn how to play",
          icon: HelpCircle
        },
        {
          title: "Other Apps",
          href: "/other-apps",
          description: "Discover more Pi Network apps",
          icon: Grid3X3
        },
        {
          title: "Privacy Policy",
          href: "/privacy",
          description: "How we protect your data",
          icon: Shield
        },
        {
          title: "Terms of Service",
          href: "/terms",
          description: "Our terms and conditions",
          icon: FileText
        }
      ]
    }
  ];

  return (
    <div className="hidden md:flex items-center space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((section) => (
            <NavigationMenuItem key={section.title}>
              <NavigationMenuTrigger className="text-gray-700 hover:text-primary">
                {section.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  {section.items.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Buttons */}
      <div className="flex items-center gap-2 ml-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Welcome, {user.username || user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
            >
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Link to="/register">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<any> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-4 w-4" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default DesktopNavigation;
