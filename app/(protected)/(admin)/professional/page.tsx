"use client";

import { useGetAllProfessionalsQuery } from "@/features/api/professionalApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Tag,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfessionalsPage() {
  const {
    data: professionals,
    isLoading,
    error,
  } = useGetAllProfessionalsQuery();

  if (isLoading) {
    return <ProfessionalsSkeleton />;
  }

  if (error || !professionals) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-red-600">
              Error Loading Professionals
            </h2>
            <p className="text-slate-600">
              Failed to load professional profiles. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (professionals.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>No Professionals Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            You haven't created any professional profiles yet.
          </p>
          <Button asChild>
            <Link href="/admin/professional/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Professional
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Professional Profiles</h1>
        <Button asChild>
          <Link href="/admin/professional/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Professional
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {professionals.map((professional) => (
          <Card
            key={professional.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={professional.avatar || "/placeholder.svg"}
                    alt={professional.businessName}
                  />
                  <AvatarFallback>
                    {professional.businessName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {professional.businessName}
                      </h3>
                      <p className="text-slate-600">
                        {professional.professionalTitle}
                      </p>
                    </div>
                    {professional.isVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{professional.businessAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{professional.businessPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {professional.yearsOfExperience} years experience
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>${professional.hourlyRate}/hour</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      {professional.categories?.slice(0, 3).map((category) => (
                        <Badge key={category.id} variant="secondary">
                          {category.name}
                        </Badge>
                      ))}
                      {professional.categories?.length > 3 && (
                        <Badge variant="secondary">
                          +{professional.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/professional/${professional.id}`}>
                        View Profile
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProfessionalsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-6 w-20" />
                      ))}
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
