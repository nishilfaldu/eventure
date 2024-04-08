"use client";
import type { Preloaded } from "convex/react";
import { Authenticated  } from "convex/react";

import { ProfessionalDetails } from "./ProfessionalDetails";
import type { api } from "../../../../convex/_generated/api";



interface ProfessionalDetailsComposerProps {
  preloadedProfessional: Preloaded<typeof api.users.getProfessionalById>;
  preloadedCategories: Preloaded<typeof api.category.getCategoriesForUserById>;
  preloadedReviews: Preloaded<typeof api.reviews.getReviewsByUserId>;
}

export function ProfessionalDetailsComposer({ preloadedProfessional,
  preloadedCategories,
  preloadedReviews,
} : ProfessionalDetailsComposerProps) {
  return(
    <>
      <Authenticated>
        <ProfessionalDetails
          preloadedProfessional={preloadedProfessional}
          preloadedCategories={preloadedCategories}
          preloadedReviews={preloadedReviews}
        />
      </Authenticated>

    </>
  );
}
