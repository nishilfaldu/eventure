import { preloadQuery } from "convex/nextjs";

import { api } from "../../../../convex/_generated/api";
import { ProfessionalDetails } from "@/app/_components/Vendor/ProfessionalDetails";
import type { Id } from "convex/_generated/dataModel";




export default async function ProfessionalPage({ params }: {params: {id: string} }) {
  const preloadedProfessional = await preloadQuery(api.users.getProfessionalById, { id: params.id as Id<"users"> });
  const preloadedCategoriesForProfessional = await preloadQuery(api.category.getCategoriesForUserById, { userId: params.id as Id<"users"> });
  const preloadedReviews = await preloadQuery(api.reviews.getReviewsByUserId, { revieweeId: params.id as Id<"users"> });

  return (
    <ProfessionalDetails
      preloadedProfessional={preloadedProfessional}
      preloadedCategories={preloadedCategoriesForProfessional}
      preloadedReviews={preloadedReviews}
    />
  );
}
