import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EventStats = () => {
  return (
    <div className="grid gap-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Chart placeholder - Monthly event attendance and revenue trends
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Time Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Most booked time slots
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Event categories distribution
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventStats;
