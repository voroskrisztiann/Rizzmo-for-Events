import React from "react";
import EventCard from "./EventCard";

interface Event {
  id: string;
  title: string;
  trainerName: string;
  trainerAvatar: string;
  coverImage: string;
  date: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  category: string;
}

interface EventGridProps {
  events?: Event[];
}

const EventGrid = ({ events }: EventGridProps) => {
  const defaultEvents: Event[] = [
    {
      id: "1",
      title: "Pilates Fundamentals",
      trainerName: "Sarah Johnson",
      trainerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      coverImage:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
      date: "March 15, 2024 - 10:00 AM",
      price: 25,
      maxParticipants: 12,
      currentParticipants: 5,
      category: "Pilates",
    },
    {
      id: "2",
      title: "Boxing Basics",
      trainerName: "Mike Thompson",
      trainerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      coverImage:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800",
      date: "March 16, 2024 - 2:00 PM",
      price: 30,
      maxParticipants: 10,
      currentParticipants: 7,
      category: "Boxing",
    },
    {
      id: "3",
      title: "Yoga Flow",
      trainerName: "Emma Davis",
      trainerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      coverImage:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      date: "March 17, 2024 - 9:00 AM",
      price: 20,
      maxParticipants: 15,
      currentParticipants: 8,
      category: "Yoga",
    },
  ];

  const displayEvents = events || defaultEvents;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <div key={event.id} className="flex justify-center">
              <EventCard
                title={event.title}
                trainerName={event.trainerName}
                trainerAvatar={event.trainerAvatar}
                coverImage={event.coverImage}
                date={event.date}
                price={event.price}
                maxParticipants={event.maxParticipants}
                currentParticipants={event.currentParticipants}
                category={event.category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventGrid;
