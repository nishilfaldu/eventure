import { StarIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";



type CardProps = React.ComponentProps<typeof Card>

interface ReviewCardProps extends CardProps {
  reviewerName: string;
  review: string;
  rating: number;
}

export function ReviewCard({ className, reviewerName, review, rating, ...props }: ReviewCardProps) {
  return (
    <Card className={cn("w-full ml-auto mr-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>{reviewerName}</CardTitle>
        <CardDescription>
          <span className="flex">
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon key={i} fill="yellow"/>
            ))}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{review}</p>
      </CardContent>
    </Card>
  );
}
