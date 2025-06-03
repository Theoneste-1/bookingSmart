import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
}

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No services available in this category.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <Card key={service.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="font-semibold">{service.name}</h4>
              <p className="text-sm text-slate-600">{service.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>{service.durationMinutes} minutes</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <DollarSign className="h-4 w-4" />
                  <span>${service.price}</span>
                </div>
              </div>
            </div>
            <Badge variant={service.isActive ? "default" : "secondary"}>
              {service.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
