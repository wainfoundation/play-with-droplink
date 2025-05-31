
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUser } from '@/context/UserContext';

const formSchema = z.object({
  display_name: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must be no more than 160 characters.",
  }).optional(),
});

type FormData = z.infer<typeof formSchema>;

const NameImageBio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { updateProfile } = useUserProfile();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: user?.username || "",
      bio: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const profileUpdates: any = {
        display_name: data.display_name,
        bio: data.bio
      };

      if (avatarFile) {
        // Upload avatar logic would go here
        // profileUpdates.avatar_url = uploadedUrl;
      }

      const success = await updateProfile(profileUpdates);

      if (success) {
        toast({
          title: "Profile created!",
          description: "Your profile has been set up successfully.",
        });
        
        const searchParams = new URLSearchParams(location.search);
        const entryPoint = searchParams.get('freeEntryPoint') || 
                          searchParams.get('basicEntryPoint') || 
                          searchParams.get('proEntryPoint') || 
                          searchParams.get('premiumEntryPoint');
        
        navigate(`/register/create/complete?${entryPoint}EntryPoint=ON_SIGNUP`);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Add Your Name, Image & Bio</h1>
        <p className="text-gray-500">Make your profile stand out!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="display_name">Display Name</Label>
          <Input
            id="display_name"
            type="text"
            placeholder="Your Name"
            {...register("display_name")}
          />
          {errors.display_name && (
            <p className="text-red-500 text-sm mt-1">{errors.display_name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="A short bio about you"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="avatar">Profile Image</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setAvatarFile(e.target.files[0]);
              }
            }}
          />
          <p className="text-gray-500 text-sm mt-1">Upload a profile picture (optional)</p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating Profile..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default NameImageBio;
