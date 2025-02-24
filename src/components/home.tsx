import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Navbar from "./navigation/Navbar";
import EventFilters from "./events/EventFilters";
import EventGrid from "./events/EventGrid";
import { AuthDialog } from "./auth/AuthDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HomeProps {
  isAuthenticated?: boolean;
  isTrainer?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "login",
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={!!user}
        isTrainer={user?.user_metadata?.role === "trainer"}
        userName={user?.email || "Guest"}
        userAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "guest"}`}
        onLogin={() => {
          setAuthDialogTab("login");
          setShowAuthDialog(true);
        }}
        onSignup={() => {
          setAuthDialogTab("signup");
          setShowAuthDialog(true);
        }}
      />
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        defaultTab={authDialogTab}
      />
      <main>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 py-16 md:py-24 lg:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ff0000]">
                    Transform Your{" "}
                    <span className="text-primary">Fitness Journey</span>
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
                    Join expert-led sessions in Pilates, Boxing, Yoga, and more.
                    Connect with top trainers and take your fitness to the next
                    level.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    {!user ? (
                      <Button
                        size="lg"
                        onClick={() => {
                          setAuthDialogTab("signup");
                          setShowAuthDialog(true);
                        }}
                      >
                        Get Started
                      </Button>
                    ) : user.user_metadata?.role === "trainer" ? (
                      <Button size="lg" onClick={() => navigate("/dashboard")}>
                        Go to Dashboard
                      </Button>
                    ) : null}
                    <Button size="lg" variant="outline">
                      Browse Events
                    </Button>
                  </div>
                  <div className="mt-8 flex items-center gap-8">
                    <div>
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm text-gray-600">Active Events</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">50+</div>
                      <div className="text-sm text-gray-600">
                        Expert Trainers
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">1000+</div>
                      <div className="text-sm text-gray-600">Happy Members</div>
                    </div>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <img
                    src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&auto=format&fit=crop&q=60"
                    alt="Fitness Training"
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4">
                        {["Sarah", "Mike", "Emma", "John"].map((name, i) => (
                          <Avatar key={name} className="border-2 border-white">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                            />
                            <AvatarFallback>{name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Join our community</div>
                        <div className="text-gray-600">
                          of fitness enthusiasts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EventFilters
          onCategoryChange={(category) => console.log("Category:", category)}
          onDateChange={(date) => console.log("Date:", date)}
          onLocationChange={(location) => console.log("Location:", location)}
        />

        <div className="mt-8">
          <EventGrid />
        </div>
      </main>
    </div>
  );
};

export default Home;
