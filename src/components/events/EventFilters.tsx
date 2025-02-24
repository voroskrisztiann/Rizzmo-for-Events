import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, Tag } from "lucide-react";
import { format } from "date-fns";

interface EventFiltersProps {
  onCategoryChange?: (category: string) => void;
  onDateChange?: (date: Date | undefined) => void;
  onLocationChange?: (location: string) => void;
  selectedCategory?: string;
  selectedDate?: Date;
  selectedLocation?: string;
}

const EventFilters = ({
  onCategoryChange = () => {},
  onDateChange = () => {},
  onLocationChange = () => {},
  selectedCategory = "",
  selectedDate = new Date(),
  selectedLocation = "",
}: EventFiltersProps) => {
  return (
    <div className="w-full bg-white border-b p-4 sticky top-0 z-10 flex flex-wrap gap-4 items-center justify-start">
      <Select defaultValue={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[200px]">
          <Tag className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="pilates">Pilates</SelectItem>
          <SelectItem value="boxing">Boxing</SelectItem>
          <SelectItem value="yoga">Yoga</SelectItem>
          <SelectItem value="hiit">HIIT</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select defaultValue={selectedLocation} onValueChange={onLocationChange}>
        <SelectTrigger className="w-[200px]">
          <MapPin className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="new-york">New York</SelectItem>
          <SelectItem value="los-angeles">Los Angeles</SelectItem>
          <SelectItem value="chicago">Chicago</SelectItem>
          <SelectItem value="miami">Miami</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventFilters;
