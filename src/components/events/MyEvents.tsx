import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateEventDialog } from "./CreateEventDialog";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventList from "../dashboard/EventList";
import Navbar from "../navigation/Navbar";

const MyEvents = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={!!user}
        isTrainer={user?.user_metadata?.role === "trainer"}
        userName={user?.email || "Guest"}
        userAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "guest"}`}
      />
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Events</h1>
          {user?.user_metadata?.role === "trainer" && (
            <Button onClick={() => setShowCreateDialog(true)}>
              Create New Event
            </Button>
          )}
        </div>
        <Tabs defaultValue="registered" className="w-full">
          <TabsList>
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="registered">
            <EventList type="upcoming" />
          </TabsContent>
          <TabsContent value="past">
            <EventList type="past" />
          </TabsContent>
        </Tabs>
      </div>
      <CreateEventDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />
    </div>
  );
};

export default MyEvents;
