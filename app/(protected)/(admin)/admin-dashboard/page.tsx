'use client'
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { useGetProfileQuery } from "@/features/api/professionalApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfessionalRegistrationForm } from "@/components/forms/ProfessionalRegistrationForm";

export default function AdminDashboardPage() {
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !profile) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Register Your Professional Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfessionalRegistrationForm />
        </CardContent>
      </Card>
    );
  }

  return <AdminDashboard />;
}
