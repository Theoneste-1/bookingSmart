import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { useCreateAvailabilityMutation } from "@/features/api/professionalApi";
import { useRouter } from "next/navigation";

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const availabilitySchema = z.object({
  professionalId: z.number(),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
});

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

interface AvailabilityRegistrationFormProps {
  professionalId: number;
}

export function AvailabilityRegistrationForm({ professionalId }: AvailabilityRegistrationFormProps) {
  const router = useRouter();
  const [createAvailability, { isLoading }] = useCreateAvailabilityMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      professionalId
    }
  });

  const onSubmit = async (data: AvailabilityFormData) => {
    try {
      await createAvailability(data).unwrap();
      toast.success("Availability created successfully");
      // Navigate to professional dashboard or next step
      router.push(`/admin-dashboard`);
    } catch (error) {
      toast.error("Failed to create availability");
      console.error(error);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="dayOfWeek">Day of Week</Label>
        <Select
          id="dayOfWeek"
          {...register("dayOfWeek", { valueAsNumber: true })}
          error={errors.dayOfWeek?.message}
        >
          {DAYS_OF_WEEK.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          type="time"
          {...register("startTime")}
          error={errors.startTime?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endTime">End Time</Label>
        <Input
          id="endTime"
          type="time"
          {...register("endTime")}
          error={errors.endTime?.message}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Availability"}
      </Button>
    </form>
  );
}