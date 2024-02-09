import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";



export function ReviewModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex md:px-20 my-8">
          <Button size="lg" variant="outline" className="bg-white text-black hover:bg-black hover:text-white border-neutral-800 font-bold">Show all reviews</Button>
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-[400px] overflow-auto">
        <div className="grid grid-cols-1 mt-4 gap-y-4">
          {/* Ratings and Reviews */}
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </DialogContent>
    </Dialog>
  );
}
