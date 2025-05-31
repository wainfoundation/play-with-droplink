
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from '@/hooks/useUserProfile';

const formSchema = z.object({
  display_name: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must be less than 160 characters.",
  }).optional(),
});

interface FormData {
  display_name: string;
  bio?: string;
}

const YourInformation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProfile, profile } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: "",
      bio: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    if (!profile?.id) return;

    setIsLoading(true);
    try {
      const success = await updateProfile({
        display_name: data.display_name,
        bio: data.bio
      });

      if (success) {
        toast({
          title: "Profile updated!",
          description: "Your information has been saved.",
        });
        navigate('/register/select-categories');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Information</h1>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="display_name">Display Name</Label>
          <Input
            id="display_name"
            type="text"
            placeholder="Your Name"
            {...form.register("display_name")}
          />
          {form.formState.errors.display_name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.display_name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="A short bio about yourself"
            {...form.register("bio")}
          />
          {form.formState.errors.bio && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.bio.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default YourInformation;
