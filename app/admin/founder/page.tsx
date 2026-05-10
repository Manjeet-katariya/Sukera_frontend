'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, X, Upload, Loader2 } from 'lucide-react';

interface Founder {
  _id?: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export default function FounderManagementPage() {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<Founder>({
    name: '',
    title: '',
    quote: '',
    image: '',
    bio: '',
    email: '',
    linkedin: '',
    twitter: '',
    instagram: ''
  });

  // Fetch founder details
  useEffect(() => {
    fetchFounder();
  }, []);

  const fetchFounder = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/founder`);
      const data = await response.json();
      if (data.success && data.data) {
        setFounder(data.data);
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching founder:', error);
      setMessage({ type: 'error', text: 'Error loading founder details' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadCompleted(false);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const uploadImageToCloudinary = async (file: File) => {
    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: uploadFormData
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success) {
        setFormData(prev => ({
          ...prev,
          image: uploadResult.url
        }));
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
        setSelectedFile(null);
        setImagePreview('');
        setUploadCompleted(true);
        return uploadResult.url;
      } else {
        throw new Error(uploadResult.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image' });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/founder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setFounder(data.data);
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Founder details updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Error updating founder' });
      }
    } catch (error) {
      console.error('Error saving founder:', error);
      setMessage({ type: 'error', text: 'Error saving founder details' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(founder || {
      name: '',
      title: '',
      quote: '',
      image: '',
      bio: '',
      email: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    });
    setSelectedFile(null);
    setImagePreview('');
    setUploadCompleted(false);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#a68a6b]"></div>
          <p className="text-zinc-600 mt-4 font-light">Loading founder details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Founder Management</h1>
          <p className="text-slate-600 font-light">Update founder details and information</p>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex-1">{message.text}</div>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-zinc-200"
        >
          {!isEditing ? (
            // View Mode
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Founder Image */}
                <div className="md:col-span-1">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-200 shadow-md">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt={formData.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Founder Details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                      Name
                    </p>
                    <h2 className="text-3xl font-serif text-slate-900">{formData.name}</h2>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                      Title
                    </p>
                    <p className="text-lg text-slate-700">{formData.title}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      Quote
                    </p>
                    <p className="text-slate-600 font-light italic leading-relaxed">
                      "{formData.quote}"
                    </p>
                  </div>

                  {formData.bio && (
                    <div>
                      <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                        Bio
                      </p>
                      <p className="text-slate-600 font-light leading-relaxed text-sm">
                        {formData.bio}
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#a68a6b] text-white rounded-lg hover:bg-[#9a7a5a] transition-colors font-semibold"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {(formData.email || formData.linkedin || formData.twitter || formData.instagram) && (
                <div className="pt-8 border-t border-zinc-200">
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                    Social Links
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.email && (
                      <div className="p-3 bg-zinc-50 rounded-lg">
                        <p className="text-xs text-zinc-500 uppercase mb-1">Email</p>
                        <p className="text-sm text-slate-700 break-all">{formData.email}</p>
                      </div>
                    )}
                    {formData.linkedin && (
                      <div className="p-3 bg-zinc-50 rounded-lg">
                        <p className="text-xs text-zinc-500 uppercase mb-1">LinkedIn</p>
                        <p className="text-sm text-slate-700 truncate">{formData.linkedin}</p>
                      </div>
                    )}
                    {formData.twitter && (
                      <div className="p-3 bg-zinc-50 rounded-lg">
                        <p className="text-xs text-zinc-500 uppercase mb-1">Twitter</p>
                        <p className="text-sm text-slate-700 truncate">{formData.twitter}</p>
                      </div>
                    )}
                    {formData.instagram && (
                      <div className="p-3 bg-zinc-50 rounded-lg">
                        <p className="text-xs text-zinc-500 uppercase mb-1">Instagram</p>
                        <p className="text-sm text-slate-700 truncate">{formData.instagram}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Edit Mode
            <div className="p-8">
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-3">
                    Founder Image
                  </label>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 border-2 border-dashed border-zinc-300 rounded-lg p-6 bg-zinc-50">
                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                        {uploading ? (
                          <>
                            <Loader2 className="w-6 h-6 text-zinc-400 mb-2 animate-spin" />
                            <p className="text-sm text-zinc-600">Uploading selected image...</p>
                          </>
                        ) : selectedFile ? (
                          <>
                            <Upload className="w-6 h-6 text-zinc-400" />
                            <p className="text-sm font-semibold text-slate-900">{selectedFile.name}</p>
                            <p className="text-xs text-zinc-500">Selected file ready to upload.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() => uploadImageToCloudinary(selectedFile)}
                                className="px-4 py-2 bg-[#a68a6b] text-white rounded-lg hover:bg-[#9a7a5a] transition-colors text-sm"
                              >
                                Upload Image
                              </button>
                              <button
                                type="button"
                                onClick={handleSelectImage}
                                disabled={uploading}
                                className="px-4 py-2 border border-zinc-300 rounded-lg text-sm text-slate-700 hover:bg-zinc-100 transition-colors"
                              >
                                Choose Different File
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-zinc-400" />
                            <p className="text-sm font-semibold text-slate-900">Select an image file</p>
                            <p className="text-xs text-zinc-500">Supported: JPG, PNG. Select a file and then click Upload Image.</p>
                            <button
                              type="button"
                              onClick={handleSelectImage}
                              className="mt-2 px-4 py-2 bg-[#a68a6b] text-white rounded-lg hover:bg-[#9a7a5a] transition-colors text-sm"
                            >
                              Choose Image
                            </button>
                          </>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={uploading}
                      />
                    </div>

                    {(formData.image || imagePreview) && (
                      <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden bg-zinc-200 flex-shrink-0">
                        <img
                          src={imagePreview || formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-zinc-500">
                    {selectedFile && !uploading && (
                      <p>Please upload the selected image before saving changes.</p>
                    )}
                    {uploadCompleted && (
                      <p className="text-emerald-600">Image uploaded successfully. Click Save Changes to save the founder details.</p>
                    )}
                    {!selectedFile && !uploadCompleted && (
                      <p>Choose an image, upload it, then save the page to persist the new founder image.</p>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                    placeholder="Founder name"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                    placeholder="e.g., Principal Architect & CEO"
                  />
                </div>

                {/* Quote */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Quote *
                  </label>
                  <textarea
                    name="quote"
                    value={formData.quote}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                    placeholder="Founder's quote"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                    placeholder="Additional biography information"
                  />
                </div>

                {/* Social Links */}
                <div className="border-t border-zinc-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Social Links</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">
                        Twitter
                      </label>
                      <input
                        type="url"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                        placeholder="https://twitter.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">
                        Instagram
                      </label>
                      <input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a68a6b] focus:border-transparent"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-zinc-200">
                  <button
                    onClick={handleSave}
                    disabled={saving || (!!selectedFile && !uploadCompleted)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#a68a6b] text-white rounded-lg hover:bg-[#9a7a5a] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 text-slate-700 rounded-lg hover:bg-zinc-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
