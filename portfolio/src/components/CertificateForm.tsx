"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CertificateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload image to Cloudinary via our route
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.url;

      // 2. Submit form data to server action
      const form = e.currentTarget;
      const data = new FormData(form);
      data.append("image", imageUrl);

      const { createCertificate } = await import("@/actions/certificates");
      await createCertificate(data);

      // 3. Reset form
      form.reset();
      setImageFile(null);
      setImagePreview(null);
      alert("Certificate added successfully!");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Add New Certificate</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Title</label>
            <input 
              name="title"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors"
              placeholder="e.g. AWS Certified Solutions Architect"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Issuer</label>
            <input 
              name="issuer"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors"
              placeholder="e.g. Amazon Web Services"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Date Earned</label>
            <input 
              name="dateEarned"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors"
              placeholder="e.g. August 2024"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Credential URL (Optional)</label>
            <input 
              name="credentialUrl"
              type="url"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Certificate Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-xl hover:border-[#F5C518]/50 transition-colors bg-white/5 relative overflow-hidden">
            {imagePreview ? (
              <div className="relative w-full aspect-video">
                <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-400">
                  <label className="relative cursor-pointer rounded-md font-medium text-[#F5C518] hover:text-[#d4a912] focus-within:outline-none">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#F5C518] hover:bg-[#d4a912] text-black font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            "Add Certificate"
          )}
        </button>
      </form>
    </div>
  );
}
