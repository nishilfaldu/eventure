"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GlobeIcon, InstagramLogoIcon, LinkedInLogoIcon, PlusCircledIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { countries } from "@/lib/enums";
import { cn } from "@/lib/utils";
import type { Id } from "convex/_generated/dataModel";



function getCustomPlaceholder(index: number): string {
  switch (index) {
    case 0:
      return "Your LinkedIn URL";
    case 1:
      return "Your Instagram URL";
    case 2:
      return "Your Twitter URL";
    case 3:
      return "Your Personal Website URL";
    default:
      return `URL ${index + 1}`;
  }
}

const urlIconClassname = "absolute h-6 w-6 top-[8px] left-[8px]";

function getURLIcon(index: number): React.ReactNode {
  switch (index) {
    case 0:
      return <LinkedInLogoIcon className={urlIconClassname}/>;
    case 1:
      return <InstagramLogoIcon className={urlIconClassname}/>;
    case 2:
      return <TwitterLogoIcon className={urlIconClassname}/>;
    case 3:
      return <GlobeIcon className={urlIconClassname}/>;
    default:
      return <PlusCircledIcon className={urlIconClassname}/>;
  }
}

const accountFormSchema = z.object({
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string({
    required_error: "Please enter a city.",
  }),
  bio: z.string().max(1000, {
    message: "Bio must not be longer than 1000 characters.",
  }).min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  categories: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one category.",
  }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }).optional(),
      })
    )
    .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  //   categories: ["other"],
  gender: "",
  country: "",
  city: "",
  bio: "",
  categories: [],
  urls: [
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
  ],
};


type GenderUnion = "Male" | "Female" | "Other";

export function ProfessionalForm({ username }: {username: string}) {
  // eslint-disable-next-line max-len
  const categories = useQuery(api.category.getCategories, {})?.map(category => ({ id: category._id as Id<"categories">, label: category.name })) ?? [];
  const updateAccount = useMutation(api.users.becomeProfessional);
  const professionalData = useQuery(api.users.getUserByUsername, { username: username });
  const userCategoriesData = useQuery(api.category.getCategoriesForUserByUsername, { username: username });
  const userCategories = useMemo(() => userCategoriesData?.map(category => category?._id as Id<"categories">) ?? [], [userCategoriesData]);
  console.log(professionalData);
  // This can come from your database or API.

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if(!professionalData) { return; }
    form.setValue("gender", professionalData.gender as string, { shouldDirty: true });
    form.setValue("country", professionalData.country!, { shouldDirty: true });
    form.setValue("city", professionalData.city!, { shouldDirty: true });
    form.setValue("bio", professionalData.bio!, { shouldDirty: true });
    form.setValue("urls.0.value", professionalData.linkedIn!, { shouldDirty: true });
    form.setValue("urls.1.value", professionalData.instagram!, { shouldDirty: true });
    form.setValue("urls.2.value", professionalData.twitter!, { shouldDirty: true });
    form.setValue("urls.3.value", professionalData.portfolio!, { shouldDirty: true });
    form.setValue("categories", userCategories, { shouldDirty: true });
  }, [professionalData?.linkedIn, professionalData?.gender,
    professionalData?.country, professionalData?.city,
    professionalData?.bio,  professionalData?.instagram,
    professionalData?.twitter, professionalData?.portfolio, professionalData,
    form, userCategories,
  ]);

  const { fields } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  async function onSubmit(data: AccountFormValues) {
    console.log(data);
    const accountData = await updateAccount({
      bio: data.bio,
      categories: data.categories as Id<"categories">[],
      city: data.city,
      country: data.country,
      gender: data.gender as GenderUnion,
      urls: data.urls ?? [],
    });
    toast({
      title: accountData ? "Successful Response" : "Failed Response",
      description: (
        <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {accountData ? "Your account has been updated" : "Failed to update your account"}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gender"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Your gender" defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the gender that will be displayed in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map(({ label, value }) => (
                    <SelectItem value={label} key={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                    This is the gender that will be displayed in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* city name */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Your city name" {...field} />
              </FormControl>
              <FormDescription>
                This is the city name that will be displayed in the dashboard
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the bio that will be displayed on your professional profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* Category */}
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Categories</FormLabel>
                <FormDescription>
                  Select the categories that best describe your professional services
                </FormDescription>
              </div>
              {categories.map(item => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={checked => {
                              if (!field.value) {
                                // If field.value is undefined, initialize it as an empty array
                                field.onChange([item.id]);
                              } else {
                                // If field.value is defined, toggle the checked state
                                const updatedValue = checked
                                  ? [...field.value, item.id] // Add item.id if checked
                                  : field.value.filter(value => value !== item.id); // Remove item.id if unchecked
                                field.onChange(updatedValue);
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* urls */}
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      {getURLIcon(index)}
                      <Input {...field} placeholder={getCustomPlaceholder(index)} className="text-center"/>
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
