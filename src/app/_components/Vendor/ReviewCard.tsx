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

export function ReviewCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full ml-auto mr-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>Nishil Faldu</CardTitle>
        <CardDescription>
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} fill="yellow"/>
            ))}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Man it’s cool being able to get a legit response. Also good advice.</p>
      </CardContent>
    </Card>
  );
}
