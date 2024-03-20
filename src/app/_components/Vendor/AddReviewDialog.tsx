import { useMutation } from "convex/react";
import type { FormEvent } from "react";
import { useState } from "react";

import { StarRating } from "./StarRating";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import type { Id } from "convex/_generated/dataModel";



interface AddReviewDialogProps {
  revieweeId: Id<"users">;
  reviewerId: Id<"users">;
}

export function AddReviewDialog({ revieweeId, reviewerId }: AddReviewDialogProps) {
  const [review, setReview] = useState("");
  const reviewMutation = useMutation(api.reviews.createReviewByUserId);
  const [rating, setRating] = useState<number | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!rating) {
      toast({ title: "No rating", description: "Select at least one star" });

      return;
    }
    if(review.trim() === "") {
      toast({ title: "No review", description: "At least few characters must be added for the review to submit" });

      return;
    }
    reviewMutation({
      description: review,
      ratingValue: rating,
      revieweeId: revieweeId,
      reviewerId: reviewerId,
    });

    toast({ title: "Successful Review", description: "A review was successfully added." });
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={revieweeId === reviewerId} onClick={() => setOpenModal(true)}>Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Review</DialogTitle>
          <DialogDescription>
            Your review cannot be edited but can always be deleted if needed followed by creating a new one.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4 justify-items-start items-start">
              <StarRating rating={rating} setRating={setRating}/>
              <Textarea
                id="review"
                value={review}
                placeholder="Write your review here"
                onChange={e => setReview(e.target.value)}
                className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Publish</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
