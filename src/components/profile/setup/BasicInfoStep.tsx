
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BasicInfoStepProps {
  profileData: {
    displayName: string;
    username: string;
    bio: string;
  };
  setProfileData: (data: any) => void;
}

const BasicInfoStep = ({ profileData, setProfileData }: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
        <Input
          id="displayName"
          placeholder="Your full name"
          value={profileData.displayName}
          onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="username" className="text-sm font-medium">Username</Label>
        <Input
          id="username"
          placeholder="username"
          value={profileData.username}
          onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
          className="mt-2"
        />
        <p className="text-xs text-gray-500 mt-1">This will be your profile URL: droplink.gg/username</p>
      </div>
      
      <div>
        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell people about yourself and what you do..."
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          className="mt-2 h-24"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
