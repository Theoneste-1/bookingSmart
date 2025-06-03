"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useCreateAvailabilityMutation } from "@/features/api/professionalApi";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const availabilitySchema = z
  .object({
    professionalId: z.number(),
    dayOfWeek: z.number().min(0).max(6, "Please select a valid day"),
    startTime: z
      .string()
      .min(1, "Start time is required")
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)"
      ),
    endTime: z
      .string()
      .min(1, "End time is required")
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)"
      ),
    isAvailable: z.boolean().default(true),
  })
  .refine(
    (data) => {
      // Only validate times if the day is available
      if (!data.isAvailable) return true;

      const start = new Date(`2000-01-01T${data.startTime}`);
      const end = new Date(`2000-01-01T${data.endTime}`);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

export default function AvailabilityPage() {
  const router = useRouter();
  const params = useParams();
  const professionalId = Number(params.proffessionalId);
  const [createAvailability, { isLoading }] = useCreateAvailabilityMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      professionalId,
      dayOfWeek: 1, // Default to Monday
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    },
  });

  const isAvailable = watch("isAvailable");

  const onSubmit = async (data: AvailabilityFormData) => {
    try {
      console.log("Submitting availability:", data); // Debug log
      const result = await createAvailability(data).unwrap();
      console.log("Availability created:", result); // Debug log
      toast.success("Availability created successfully");
      router.push(`/professional/${professionalId}`);
    } catch (error) {
      console.error("Error creating availability:", error);
      toast.error("Failed to create availability");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Set Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dayOfWeek">Day of Week</Label>
            <Select
              onValueChange={(value) => setValue("dayOfWeek", Number(value))}
              defaultValue={watch("dayOfWeek").toString()}
            >
              <SelectTrigger
                className={errors.dayOfWeek ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day.value} value={day.value.toString()}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.dayOfWeek && (
              <p className="text-sm text-red-500">{errors.dayOfWeek.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAvailable"
              checked={isAvailable}
              onCheckedChange={(checked) => {
                setValue("isAvailable", checked as boolean);
              }}
            />
            <Label
              htmlFor="isAvailable"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Available on this day
            </Label>
          </div>

          {isAvailable && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  {...register("startTime")}
                  className={errors.startTime ? "border-red-500" : ""}
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  {...register("endTime")}
                  className={errors.endTime ? "border-red-500" : ""}
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Availability"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
