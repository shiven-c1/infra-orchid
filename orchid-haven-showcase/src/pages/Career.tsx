import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

type Job = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  responsibilities: string[];
  requirements: string[];
  isHiring: boolean;
};

const Career = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    linkedin: "",
    comments: "",
  });
  const [cvFileName, setCvFileName] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, position: data[0].title }));
        }
      } else {
        console.error('Failed to fetch jobs');
        toast({
          title: 'Error',
          description: 'Failed to load jobs. Please try again later.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error',
        description: 'Network error. Please check your connection.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const business = "918830892682";
    const msg = `Job Application%0A%0A` +
      `Name: ${form.firstName} ${form.lastName}%0A` +
      `Email: ${form.email}%0A` +
      `Phone: ${form.phone}%0A` +
      `Position: ${form.position}%0A` +
      `LinkedIn: ${form.linkedin || "-"}%0A` +
      `Comments: ${form.comments || "-"}%0A` +
      `${cvFileName ? `CV: ${cvFileName}%0A` : ""}`;
    window.open(`https://wa.me/${business}?text=${msg}`, "_blank");
    toast({ title: "Opening WhatsApp", description: "Pre-filled application ready to send" });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 15MB" });
      return;
    }
    setCvFileName(f.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation onCall={() => {}} onWhatsApp={() => {}} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onCall={() => {}} onWhatsApp={() => {}} />

      <section className="bg-gradient-to-b from-black to-zinc-900 text-white py-16 md:py-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Career</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium">Join our team and build with excellence.</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Application Form - Mobile First (Top) */}
          <div className="lg:hidden mb-12">
            <Card className="bg-card/90 border-border shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Apply for a Position</h3>
                  <p className="text-muted-foreground">Fill out the form below to submit your application.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                      <input 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                        placeholder="First Name" 
                        value={form.firstName} 
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                      <input 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                        placeholder="Last Name" 
                        value={form.lastName} 
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input 
                      className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <input 
                      className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                      placeholder="+91 98765 43210" 
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Position *</label>
                    <select 
                      className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                      value={form.position} 
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                    >
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">LinkedIn Profile</label>
                    <input 
                      className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                      placeholder="https://linkedin.com/in/yourprofile" 
                      value={form.linkedin} 
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CV/Resume</label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={onFileChange}
                      className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                    />
                    {cvFileName && (
                      <p className="text-sm text-green-600 mt-1">✓ {cvFileName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
                    <textarea 
                      className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent min-h-[100px]" 
                      placeholder="Tell us why you'd be a great fit for this position..." 
                      value={form.comments} 
                      onChange={(e) => setForm({ ...form, comments: e.target.value })} 
                    />
                  </div>
                  <Button 
                    onClick={openWhatsApp} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                    disabled={!form.firstName || !form.lastName || !form.email || !form.phone || !form.position}
                  >
                    Submit Application via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
              <div className="space-y-6">
                {jobs.filter(job => job.isHiring).map((job) => (
                  <Card key={job.id} className="bg-card/90 border-border shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Hiring Now
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{job.summary}</p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Key Details:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {job.details.slice(0, 3).map((detail, index) => (
                              <li key={index}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application Form - Desktop (Right Side) */}
            <div className="lg:block">
              <Card className="bg-card/90 border-border shadow-lg sticky top-8">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Apply for a Position</h3>
                    <p className="text-muted-foreground">Fill out the form below to submit your application.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                        <input 
                          className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                          placeholder="First Name" 
                          value={form.firstName} 
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                        <input 
                          className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                          placeholder="Last Name" 
                          value={form.lastName} 
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <input 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                        placeholder="+91 98765 43210" 
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Position *</label>
                      <select 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                        value={form.position} 
                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                      >
                        {jobs.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">LinkedIn Profile</label>
                      <input 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                        placeholder="https://linkedin.com/in/yourprofile" 
                        value={form.linkedin} 
                        onChange={(e) => setForm({ ...form, linkedin: e.target.value })} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CV/Resume</label>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={onFileChange}
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" 
                      />
                      {cvFileName && (
                        <p className="text-sm text-green-600 mt-1">✓ {cvFileName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
                      <textarea 
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent min-h-[100px]" 
                        placeholder="Tell us why you'd be a great fit for this position..." 
                        value={form.comments} 
                        onChange={(e) => setForm({ ...form, comments: e.target.value })} 
                      />
                    </div>
                    <Button 
                      onClick={openWhatsApp} 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                      disabled={!form.firstName || !form.lastName || !form.email || !form.phone || !form.position}
                    >
                      Submit Application via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;


