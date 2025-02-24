import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Copy, Users } from "lucide-react";

interface EventListProps {
  type: "upcoming" | "past";
}

const EventList = ({ type }: EventListProps) => {
  const events = [
    {
      id: 1,
      title: "Morning Pilates",
      date: "2024-03-20",
      time: "10:00 AM",
      participants: 8,
      maxParticipants: 12,
      price: 25,
    },
    {
      id: 2,
      title: "Boxing Basics",
      date: "2024-03-22",
      time: "2:00 PM",
      participants: 6,
      maxParticipants: 10,
      price: 30,
    },
  ];

  return (
    <div className="rounded-md border mt-4 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.participants}/{event.maxParticipants}
                </div>
              </TableCell>
              <TableCell>${event.price}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventList;
