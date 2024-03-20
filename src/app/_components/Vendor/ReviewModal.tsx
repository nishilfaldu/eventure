import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Id } from "convex/_generated/dataModel";



type UserProps = {
  _id: Id<"users">;
  _creationTime: number;
  gender?: "Male" | "Female" | "Other";
  country?: string;
  city?: string;
  bio?: string;
  portfolio?: string;
  linkedIn?: string;
  instagram?: string;
  twitter?: string;
  pictureUrl: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  tokenIdentifier: string;
  expert: boolean;
}

interface ReviewModalProps {
  reviewsWithUsers: {
    reviewerUser: UserProps;
    description: string;
    ratingValue: number;
  }[];
}

export function ReviewModal({ reviewsWithUsers }: ReviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex md:px-20 my-8">
          <Button size="lg" variant="outline" className="bg-white text-black hover:bg-black hover:text-white border-neutral-800 font-bold">Show all reviews</Button>
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-[400px] overflow-auto">
        {reviewsWithUsers.length > 0 ? <div className="grid grid-cols-1 mt-4 gap-y-4">
          {/* Ratings and Reviews */}
          {
            reviewsWithUsers.map((review, index) => {
              return <ReviewCard
                key={index}
                rating={review.ratingValue}
                review={review.description}
                reviewerName={review.reviewerUser.firstName + " " + review.reviewerUser.lastName}
              />;
            })
          }
        </div> : <p>No reviews found for the professional</p>}
      </DialogContent>
    </Dialog>
  );
}
