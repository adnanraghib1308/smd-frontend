import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import ImageCropper from "../components/ImageCropper";
import axiosClient from "../axios-client";

// Utility function to convert base64 to Blob
const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

const Submit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const contestId = searchParams.get("contestId");
  const contestName = searchParams.get("contestName");

  const [formData, setFormData] = useState({
    contestId: parseInt(contestId),
    babyName: "",
    babyDob: "",
    babyGender: "",
    parentName: "",
    parentContactNumber: "",
    city: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImage = async (croppedImage: any) => {
    const formData = new FormData();
    formData.append("image", croppedImage);

    const response = await axiosClient.post(`/participants/upload/${contestId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFormData((prev) => ({ ...prev, babyImage: response.imageUrl }));
    setPreviewUrl(response.imageUrl);
    setShowCropper(false);
  };

  const removeImage = () => {
    setFormData({ ...formData, photo: null });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosClient.post("/participants/join", formData);

    toast.success("Entry submitted successfully!");
    navigate(`/contest/${contestId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Join the Contest</h1>
        <p className="text-lg text-pink-500 mb-8">{contestName}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Baby's Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <span className="text-gray-600">Click to upload a photo</span>
                    <span className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Baby's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Name</label>
            <input
              type="text"
              name="babyName"
              value={formData.babyName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Baby's DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Date of Birth</label>
            <input
              type="date"
              name="babyDob"
              value={formData.babyDob}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Baby's Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Gender</label>
            <select
              name="babyGender"
              value={formData.babyGender}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Gender</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
          </div>

          {/* Parent's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent's Name</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Parent's Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent's Whatsapp Number</label>
            <input
              type="tel"
              name="parentContactNumber"
              value={formData.parentContactNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {showCropper && imageSrc && <ImageCropper imageSrc={imageSrc} onCropComplete={handleCroppedImage} onClose={() => setShowCropper(false)} />}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <Check className="h-5 w-5" />
            <span>Submit Entry</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Submit;
