// app/dashboard/profile/page.tsx
import { getProfile, updateProfile } from "@/lib/actions/profile-actions";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  // 1) Load the existing profile on the server
  const profile = await getProfile();

  // 2) Inline Server Action to handle the POST
  async function handleSave(formData: FormData) {
    "use server";
    // parse the incoming values
    const data = {
      name:   formData.get("name")?.toString() || "",
      age:    formData.get("age") ? parseInt(formData.get("age")!.toString(), 10) : undefined,
      gender: formData.get("gender")?.toString() || "",
      bio:    formData.get("bio")?.toString() || "",
      goals:  formData.get("goals")?.toString() || "",
    };
    // call your existing Prisma action
    await updateProfile(data);
    // after saving, reload the same page (or go elsewhere)
    redirect("/dashboard/profile");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* form posts to our handleSave Server Action */}
          <form action={handleSave} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profile?.name}
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                defaultValue={profile?.age?.toString() || ""}
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                defaultValue={profile?.gender || ""}
                placeholder="male, female, etc."
              />
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile?.bio || ""}
                className="min-h-[100px]"
              />
            </div>

            {/* Goals */}
            <div className="space-y-1">
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                name="goals"
                defaultValue={profile?.goals || ""}
                className="min-h-[100px]"
              />
            </div>

            <CardFooter>
              <Button type="submit" className="w-full">
                Save Profile
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
