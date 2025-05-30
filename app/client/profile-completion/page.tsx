import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../../../features/api/clientApi";
import { ClientLayout } from "@/components/layouts/ClientLayout";

const ProfileCompletionForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData = {
      address: formData.get("address") as string,
      preferredLanguage: formData.get("preferredLanguage") as string,
    };

    try {
      await updateProfile(profileData).unwrap();
      router.push("/client");
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Please provide the following information to complete your profile
            and start using our services.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label
                htmlFor="preferredLanguage"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                Failed to update profile. Please try again.
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "Saving..." : "Complete Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
};

export default function ProfileCompletionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileCompletionForm />
    </Suspense>
  );
}
