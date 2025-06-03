import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProfessionalMutation } from "@/features/api/professionalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const professionalSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  businessPhone: z.string().min(1, "Business phone is required"),
  businessEmail: z.string().email("Invalid business email format"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience cannot be negative"),
  hourlyRate: z.number().positive("Hourly rate must be positive"),
  isAgreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

export function ProfessionalRegistrationForm() {
  const router = useRouter();
  const [createProfessional, { isLoading }] = useCreateProfessionalMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
  });

  const onSubmit = async (data: ProfessionalFormData) => {
    try {
      const result = await createProfessional(data).unwrap();
      console.log('result', result)
      toast.success("Professional profile created successfully");
      router.push(`/professional/${result.id}/category`);
    } catch (error) {
      toast.error("Failed to create professional profile");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" {...register("businessName")} />
          {errors.businessName && (
            <p className="text-sm text-red-500">
              {errors.businessName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessAddress">Business Address</Label>
          <Input id="businessAddress" {...register("businessAddress")} />
          {errors.businessAddress && (
            <p className="text-sm text-red-500">
              {errors.businessAddress.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessPhone">Business Phone</Label>
          <Input id="businessPhone" {...register("businessPhone")} />
          {errors.businessPhone && (
            <p className="text-sm text-red-500">
              {errors.businessPhone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessEmail">Business Email</Label>
          <Input
            id="businessEmail"
            type="email"
            {...register("businessEmail")}
          />
          {errors.businessEmail && (
            <p className="text-sm text-red-500">
              {errors.businessEmail.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalTitle">Professional Title</Label>
          <Input id="professionalTitle" {...register("professionalTitle")} />
          {errors.professionalTitle && (
            <p className="text-sm text-red-500">
              {errors.professionalTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            type="number"
            {...register("yearsOfExperience", { valueAsNumber: true })}
          />
          {errors.yearsOfExperience && (
            <p className="text-sm text-red-500">
              {errors.yearsOfExperience.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Rate</Label>
          <Input
            id="hourlyRate"
            type="number"
            step="0.01"
            {...register("hourlyRate", { valueAsNumber: true })}
          />
          {errors.hourlyRate && (
            <p className="text-sm text-red-500">{errors.hourlyRate.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isAgreedToTerms"
          {...register("isAgreedToTerms", {
            setValueAs: (value) => value === "on" || value === true,
          })}
        />
        <Label htmlFor="isAgreedToTerms">
          I agree to the terms and conditions
        </Label>
        {errors.isAgreedToTerms && (
          <p className="text-sm text-red-500">
            {errors.isAgreedToTerms.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Professional Profile"}
      </Button>
    </form>
  );
}
