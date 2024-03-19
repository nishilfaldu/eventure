"use client";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";

import { VendorListing } from "./VendorListing";
import type { api } from "../../../../convex/_generated/api";



const professionals = [
  {
    id: "1",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
  {
    id: "2",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
  {
    id: "3",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
  {
    id: "4",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
  {
    id: "5",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
  {
    id: "6",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
  {
    id: "7",
    userId: "1234567890", // Example user ID from the "users" table
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    country: "United States",
    phoneNumber: "+1234567890",
    city: "New York",
    zipCode: "10001",
    tagLine: "Event Planner Extraordinaire",
    bio: "I have over 10 years of experience in event planning...",
    question1: "What inspired you to become an event planner?",
    question2: "What is your approach to event design?",
    question3: "How do you handle unexpected challenges during events?",
    question4: "What sets you apart from other event planners?",
    question5: "What types of events do you specialize in?",
    textAnswerPrice: 10.99,
    videoAnswerPrice: 29.99,
    videoCallPrice: 49.99,
    portfolio: "https://example.com/portfolio",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    instagram: "https://www.instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    pictureUrl: "https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png",
    verified: true,
  },
];

interface VendorGridProps {
  preloadedProfessionals: Preloaded<typeof api.users.getProfessionals>;
}

export function VendorGrid({ preloadedProfessionals } : VendorGridProps) {
  const professionals = usePreloadedQuery(preloadedProfessionals);
  console.log(professionals, "professionals");

  return(
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {professionals.map((professional, i) => (
        <VendorListing
          //   currentUser={currentUser}
          key={`professional-${professional._id}`}
          professional={professional}
          index={i}
        />
      ))}
    </div>
  );
}
