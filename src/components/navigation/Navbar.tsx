import React from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dumbbell, LogOut, User, UserCircle, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  isAuthenticated?: boolean;
  isTrainer?: boolean;
  userAvatar?: string;
  userName?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Navbar = ({
  isAuthenticated = false,
  isTrainer = false,
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  userName = "John Doe",
  onLogin = () => {},
  onSignup = () => {},
  onLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
}: NavbarProps) => {
  const navigate = useNavigate();

  const NavigationItems = () => (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <Link
        to="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Home
      </Link>
      <Link
        to="/events/pilates"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Pilates
      </Link>
      <Link
        to="/events/boxing"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Boxing
      </Link>
      <Link
        to="/events/yoga"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Yoga
      </Link>
    </div>
  );

  return (
    <nav className="w-full h-auto md:h-[72px] px-4 md:px-6 border-b bg-white">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between py-4 md:py-0 gap-4 md:gap-0">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">FitEvents</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationItems />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8">
                <NavigationItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {isTrainer && (
                <Button
                  variant="outline"
                  className="mr-2 hidden md:flex"
                  onClick={() => navigate("/dashboard")}
                >
                  Trainer Dashboard
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={userAvatar} />
                    <AvatarFallback>{userName[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {!isTrainer && (
                    <DropdownMenuItem onClick={() => navigate("/my-events")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>My Events</span>
                    </DropdownMenuItem>
                  )}
                  {isTrainer && (
                    <DropdownMenuItem
                      className="md:hidden"
                      onClick={() => navigate("/dashboard")}
                    >
                      <Dumbbell className="mr-2 h-4 w-4" />
                      <span>Trainer Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={onLogin}
                className="hidden md:flex"
              >
                Login
              </Button>
              <Button onClick={onSignup}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
