"use client";

import { Text, Timeline } from "@mantine/core";
import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { IconGitBranch } from "@tabler/icons-react";
interface TimelineItineraryProps {
  travelPackage: TravelPackage;
}

function TimelineItinerary({ travelPackage }: TimelineItineraryProps) {
  return (
    <Timeline active={2} bulletSize={24} lineWidth={2}>
      {travelPackage.itinerary.map(itinerary => {
        return (
          <Timeline.Item key={itinerary.dayNo} bullet={<IconGitBranch size={12} />} title={`Day ${itinerary.dayNo}: ${itinerary.title}`}>
            {itinerary.activities.map((activity, index) => (
              <Text c="dimmed" size="sm" key={index}>
                • {activity}
              </Text>
            ))}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}

export default TimelineItinerary;
