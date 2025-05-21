
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads a file to Supabase storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path
 * @returns The file URL if successful, null if failed
 */
export async function uploadFile(
  file: File,
  bucket: string = "profile_images", 
  folder: string = ""
): Promise<string | null> {
  try {
    const userId = supabase.auth.getUser().then(({ data }) => data.user?.id);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    // Create a unique file name to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get the public URL for the file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

/**
 * Deletes a file from Supabase storage
 * @param filePath - The path of the file to delete
 * @param bucket - The storage bucket name
 * @returns True if successful, false if failed
 */
export async function deleteFile(
  filePath: string,
  bucket: string = "profile_images"
): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}
