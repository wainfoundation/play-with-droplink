
import { Wrench } from "lucide-react";

interface MaintenanceModeProps {
  message?: string;
  estimatedTime?: string;
}

export function MaintenanceMode({ 
  message = "We're currently performing scheduled maintenance.",
  estimatedTime 
}: MaintenanceModeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full text-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Wrench className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Maintenance in Progress
          </h1>
          <p className="text-gray-600 mb-4">{message}</p>
          {estimatedTime && (
            <p className="text-sm text-gray-500">
              Estimated completion: {estimatedTime}
            </p>
          )}
          <div className="mt-6">
            <div className="text-xs text-gray-400">
              Thank you for your patience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
