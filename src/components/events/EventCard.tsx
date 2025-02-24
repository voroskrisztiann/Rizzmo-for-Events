import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users } from "lucide-react";

interface EventCardProps {
  title?: string;
  trainerName?: string;
  trainerAvatar?: string;
  coverImage?: string;
  date?: string;
  price?: number;
  maxParticipants?: number;
  currentParticipants?: number;
  category?: string;
}

const EventCard = ({
  title = "Pilates Fundamentals",
  trainerName = "Sarah Johnson",
  trainerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  coverImage = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60",
  date = "March 15, 2024 - 10:00 AM",
  price = 25,
  maxParticipants = 12,
  currentParticipants = 5,
  category = "Pilates",
}: EventCardProps) => {
  return (
    <Card className="w-[340px] h-[420px] bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge
            className="absolute top-4 right-4 bg-white/90 text-black"
            variant="secondary"
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={trainerAvatar} alt={trainerName} />
            <AvatarFallback>{trainerName[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{trainerName}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4" />
          <span className="text-sm">
            {currentParticipants}/{maxParticipants} spots
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold">${price}</span>
        <Badge variant="default" className="hover:bg-primary/90 cursor-pointer">
          Join Now
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
