"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import {
  useGetCategoryByIdQuery,
  useGetCategoryServicesQuery,
} from "@/features/api/professionalApi";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceList } from "../ServiceList";
import { AddServiceDialog } from "../AddServiceDialog";

export default function CategoryDetailsPage() {
  const { proffessionalId, categoryId } = useParams<{proffessionalId: string, categoryId:string}>();
  const professionalId = proffessionalId;

  const { data: category, isLoading: isCategoryLoading } =
    useGetCategoryByIdQuery(categoryId);
  const { data: services, isLoading: isServicesLoading } =
    useGetCategoryServicesQuery(categoryId);

  if (isCategoryLoading || isServicesLoading) {
    return <CategoryDetailsSkeleton />;
  }

  if (!category) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-red-600">
              Category Not Found
            </h2>
            <Button asChild>
              <Link href={`/professional/${professionalId}`}>
                Back to Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{category.name}</CardTitle>
              <p className="text-slate-600">{category.description}</p>
            </div>
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Services</h3>
              <AddServiceDialog categoryId={categoryId} />
            </div>

            <ServiceList services={services || []} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
