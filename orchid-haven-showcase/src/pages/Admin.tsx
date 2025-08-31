import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Building2, 
  Briefcase, 
  Upload, 
  Edit, 
  Trash2, 
  Plus, 
  LogOut, 
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  images: string[];
  customInfo?: string[];
  type: string;
  filterCategory: string;
  isActive: boolean;
  amenities?: string[];
}

interface Job {
  id: number;
  title: string;
  summary: string;
  details: string[];
  responsibilities: string[];
  requirements: string[];
  isHiring: boolean;
}

interface ExecutiveTeam {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

const Admin = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [executiveTeam, setExecutiveTeam] = useState<ExecutiveTeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingExecutive, setEditingExecutive] = useState<ExecutiveTeam | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{filename: string; url: string}[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCheckingAuth(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setCheckingAuth(false);
        fetchProperties();
        fetchJobs();
        fetchExecutiveTeam();
        fetchImages();
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCheckingAuth(false);
        navigate('/login');
        toast({ title: 'Error', description: 'Session expired. Please login again.' });
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCheckingAuth(false);
      navigate('/login');
      toast({ title: 'Error', description: 'Authentication failed. Please login again.' });
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch properties' });
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch jobs' });
    }
  };

  const fetchExecutiveTeam = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/executive-team');
      const data = await response.json();
      setExecutiveTeam(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch executive team' });
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images');
      const data = await response.json();
      setUploadedImages(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch images' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        toast({ title: 'Success', description: 'Image uploaded successfully' });
        fetchImages();
        return data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image' });
      return null;
    }
  };

  const handleImageUpload = async (file: File, isProfileImage: boolean) => {
    const url = await uploadImage(file);
    if (url) {
      setEditingProperty(prev => {
        if (!prev) return null;
        const newImages = [...prev.images];
        if (isProfileImage) {
          return { ...prev, profileImage: url };
        } else {
          newImages.push(url);
          return { ...prev, images: newImages };
        }
      });
    }
  };

  const handleExecutiveImageUpload = async (file: File) => {
    const url = await uploadImage(file);
    if (url && editingExecutive) {
      setEditingExecutive({ ...editingExecutive, image: url });
    }
  };

  const saveProperty = async (property: Property) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/properties/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(property)
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Property updated successfully' });
        fetchProperties();
        setEditingProperty(null);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update property' });
    }
  };

  const saveJob = async (job: Job) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(job)
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Job updated successfully' });
        fetchJobs();
        setEditingJob(null);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update job' });
    }
  };

  const saveExecutive = async (executive: ExecutiveTeam) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/executive-team/${executive.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(executive)
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Executive updated successfully' });
        fetchExecutiveTeam();
        setEditingExecutive(null);
      } else {
        throw new Error('Failed to update executive');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update executive' });
    }
  };

  const deleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Property deleted successfully' });
        fetchProperties();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete property' });
    }
  };

  const deleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Job deleted successfully' });
        fetchJobs();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete job' });
    }
  };

  const deleteExecutive = async (id: number) => {
    if (!confirm('Are you sure you want to delete this executive?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/executive-team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Executive deleted successfully' });
        fetchExecutiveTeam();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete executive' });
    }
  };

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login redirect if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Orchid Haven Admin</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Properties</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="executive" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span>Executive Team</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span>Images</span>
            </TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProperty(property)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProperty(property.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="font-semibold text-green-600">{property.price}</p>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{property.type}</Badge>
                      <Badge variant="outline">{property.filterCategory}</Badge>
                    </div>
                    {property.images && property.images.length > 0 && (
                      <div className="flex space-x-1">
                        {property.images.slice(0, 3).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${property.title} ${idx + 1}`}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ))}
                        {property.images.length > 3 && (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">
                            +{property.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingJob(job)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{job.summary}</p>
                    <Badge variant={job.isHiring ? "default" : "secondary"}>
                      {job.isHiring ? "Hiring" : "Not Hiring"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Executive Team Tab */}
          <TabsContent value="executive" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executiveTeam.map(executive => (
                <Card key={executive.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{executive.name}</CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingExecutive(executive)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteExecutive(executive.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{executive.position}</p>
                    <p className="text-sm text-gray-800">{executive.bio}</p>
                    {executive.image && (
                      <img
                        src={executive.image}
                        alt={executive.name}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                  />
                  <Button
                    onClick={async () => {
                      if (selectedImage) {
                        await uploadImage(selectedImage);
                        setSelectedImage(null);
                      }
                    }}
                    disabled={!selectedImage}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {uploadedImages.map((image) => (
                <Card key={image.filename} className="relative group">
                  <CardContent className="p-2">
                    <img
                      src={image.url}
                      alt={image.filename}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          const token = localStorage.getItem('token');
                          await fetch(`http://localhost:5000/api/images/${image.filename}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                          });
                          fetchImages();
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Property Dialog */}
        {editingProperty && (
          <Dialog open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Property</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={editingProperty.title}
                      onChange={(e) => setEditingProperty({...editingProperty, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={editingProperty.location}
                      onChange={(e) => setEditingProperty({...editingProperty, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input
                      value={editingProperty.price}
                      onChange={(e) => setEditingProperty({...editingProperty, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Input
                      value={editingProperty.type}
                      onChange={(e) => setEditingProperty({...editingProperty, type: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Custom Info (comma-separated)</label>
                    <Input
                      value={editingProperty.customInfo?.join(', ') || ''}
                      onChange={(e) => setEditingProperty({...editingProperty, customInfo: e.target.value.split(',').map(item => item.trim()).filter(item => item)})}
                      placeholder="e.g., 4 BHK, 1450 sq.ft."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Filter Category</label>
                    <Input
                      value={editingProperty.filterCategory}
                      onChange={(e) => setEditingProperty({...editingProperty, filterCategory: e.target.value})}
                      placeholder="e.g., 4BHK, 3BHK, Ready Possession"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Images (one URL per line)</label>
                  <Textarea
                    value={editingProperty.images.join('\n')}
                    onChange={(e) => setEditingProperty({...editingProperty, images: e.target.value.split('\n').map(url => url.trim()).filter(url => url)})}
                    placeholder="Enter image URLs, one per line"
                    rows={4}
                  />
                  {uploadedImages.length > 0 && (
                    <div className="mt-2">
                      <label className="text-sm font-medium text-gray-600">Add Uploaded Images:</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {uploadedImages.map((img) => (
                          <button
                            key={img.filename}
                            type="button"
                            onClick={() => {
                              if (!editingProperty.images.includes(img.url)) {
                                setEditingProperty({...editingProperty, images: [...editingProperty.images, img.url]});
                              }
                            }}
                            className="relative group"
                            disabled={editingProperty.images.includes(img.url)}
                          >
                            <img
                              src={img.url}
                              alt={img.filename}
                              className={`w-16 h-16 object-cover rounded border ${editingProperty.images.includes(img.url) ? 'opacity-50' : 'hover:opacity-75'}`}
                            />
                            {editingProperty.images.includes(img.url) && (
                              <div className="absolute inset-0 bg-green-500 bg-opacity-50 rounded flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {editingProperty.images.length > 0 && (
                    <div className="mt-2">
                      <label className="text-sm font-medium text-gray-600">Current Images:</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {editingProperty.images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded border"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = editingProperty.images.filter((_, i) => i !== idx);
                                setEditingProperty({...editingProperty, images: newImages});
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingProperty(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => saveProperty(editingProperty)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Job Dialog */}
        {editingJob && (
          <Dialog open={!!editingJob} onOpenChange={() => setEditingJob(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Job</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Summary</label>
                  <Textarea
                    value={editingJob.summary}
                    onChange={(e) => setEditingJob({...editingJob, summary: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Details (one per line)</label>
                  <Textarea
                    value={editingJob.details.join('\n')}
                    onChange={(e) => setEditingJob({...editingJob, details: e.target.value.split('\n').filter(line => line.trim())})}
                    placeholder="Enter details, one per line"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Responsibilities (one per line)</label>
                  <Textarea
                    value={editingJob.responsibilities.join('\n')}
                    onChange={(e) => setEditingJob({...editingJob, responsibilities: e.target.value.split('\n').filter(line => line.trim())})}
                    placeholder="Enter responsibilities, one per line"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Requirements (one per line)</label>
                  <Textarea
                    value={editingJob.requirements.join('\n')}
                    onChange={(e) => setEditingJob({...editingJob, requirements: e.target.value.split('\n').filter(line => line.trim())})}
                    placeholder="Enter requirements, one per line"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isHiring"
                    checked={editingJob.isHiring}
                    onChange={(e) => setEditingJob({...editingJob, isHiring: e.target.checked})}
                  />
                  <label htmlFor="isHiring" className="text-sm font-medium">Currently Hiring</label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingJob(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => saveJob(editingJob)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Executive Dialog */}
        {editingExecutive && (
          <Dialog open={!!editingExecutive} onOpenChange={() => setEditingExecutive(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Executive</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editingExecutive.name}
                    onChange={(e) => setEditingExecutive({...editingExecutive, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Position</label>
                  <Input
                    value={editingExecutive.position}
                    onChange={(e) => setEditingExecutive({...editingExecutive, position: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={editingExecutive.bio}
                    onChange={(e) => setEditingExecutive({...editingExecutive, bio: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Image</label>
                  <div className="space-y-3">
                    {/* File Upload Option */}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Upload Image File:</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                        />
                        <Button
                          onClick={async () => {
                            if (selectedImage) {
                              await handleExecutiveImageUpload(selectedImage);
                              setSelectedImage(null);
                            }
                          }}
                          disabled={!selectedImage}
                          size="sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                    
                    {/* URL Input Option */}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Or Enter Image URL:</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={editingExecutive.image || ''}
                          onChange={(e) => setEditingExecutive({...editingExecutive, image: e.target.value})}
                        />
                        <Button
                          onClick={() => {
                            if (editingExecutive.image) {
                              toast({
                                title: "Image URL Updated",
                                description: "The image URL has been saved. Click Save to apply changes.",
                              });
                            }
                          }}
                          size="sm"
                          variant="outline"
                        >
                          Set URL
                        </Button>
                      </div>
                    </div>
                    
                    {/* Current Image Preview */}
                    {editingExecutive.image && (
                      <div className="mt-2">
                        <label className="text-sm font-medium text-gray-600">Current Image:</label>
                        <img
                          src={editingExecutive.image}
                          alt={editingExecutive.name}
                          className="w-full h-24 object-cover rounded mt-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingExecutive(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => saveExecutive(editingExecutive)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Admin;
