"use client";

import {
  useGetProfessionalByIdQuery,
  useGetProfessionalAvailabilityQuery,
  useGetProfessionalCategoriesQuery,
} from "@/features/api/professionalApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Tag,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfessionalProfilePage() {
  const {proffessionalId} = useParams<{proffessionalId: string}>();
 
  console.log("the professional id is: ",proffessionalId)
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetProfessionalByIdQuery(proffessionalId);

  const { data: availabilities, isLoading: isAvailabilitiesLoading } =
    useGetProfessionalAvailabilityQuery(proffessionalId);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetProfessionalCategoriesQuery(proffessionalId);

  const isLoading =
    isProfileLoading || isAvailabilitiesLoading || isCategoriesLoading;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (profileError || !profile) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-red-600">
              Profile Not Found
            </h2>
            <p className="text-slate-600">
              The professional profile you're looking for doesn't exist or has
              been removed.
            </p>
            <Button asChild>
              <Link href="/search">Back to Search</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasCategories = categories && categories.length > 0;
  const hasAvailabilities = availabilities && availabilities.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{profile.businessName}</CardTitle>
            {profile.isVerified && (
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Tag className="h-4 w-4" />
                <span>{profile.professionalTitle}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>{profile.businessAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="h-4 w-4" />
                <span>{profile.businessPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="h-4 w-4" />
                <span>{profile.businessEmail}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="h-4 w-4" />
                <span>{profile.yearsOfExperience} years of experience</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <DollarSign className="h-4 w-4" />
                <span>${profile.hourlyRate}/hour</span>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Service Categories</h3>
              {!hasCategories && (
                <Link href={`/professional/${proffessionalId}/category`}>
                  <Button variant="outline" size="sm">
                    Add Categories
                  </Button>
                </Link>
              )}
            </div>
            {hasCategories ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No service categories added yet.</p>
            )}
          </div>

          {/* Availability Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Availability</h3>
              {!hasAvailabilities && (
                <Link href={`/professional/${proffessionalId}/availabilities`}>
                  <Button variant="outline" size="sm">
                    Set Availability
                  </Button>
                </Link>
              )}
            </div>
            {hasAvailabilities ? (
              <div className="space-y-2">
                {availabilities.map((availability) => (
                  <div
                    key={availability.id}
                    className="flex items-center gap-2 text-slate-600"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>
                      {availability.dayOfWeek}: {availability.startTime} -{" "}
                      {availability.endTime}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No availability set yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Loading skeleton component
function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
