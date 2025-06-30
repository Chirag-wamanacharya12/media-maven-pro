import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Building, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Sample client data
const clients = [
  {
    id: 1,
    name: 'GlowUp Cosmetics',
    contact: 'Sarah Johnson',
    email: 'sarah@glowup.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    projects: 3,
    revenue: '$45,000',
    lastActivity: '2 days ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    company: 'Beauty & Skincare',
    data: {
      projects: [
        { name: 'Instagram Reels - Summer Glow Kit', status: 'Ongoing', deadline: '2025-07-20', budget: '$15,000' },
        { name: 'YouTube Shorts - Influencer Collab', status: 'Completed', deadline: '2025-05-10', budget: '$20,000' },
        { name: 'Story Highlights - Product Reviews', status: 'On Hold', deadline: 'TBD', budget: '$10,000' }
      ],
      invoices: [
        { id: '001', status: 'Paid', amount: '$10,000', date: '2025-04-01' },
        { id: '002', status: 'Pending', amount: '$15,000', dueDate: '2025-07-15' },
        { id: '003', status: 'Paid', amount: '$20,000', date: '2025-05-01' }
      ],
      documents: ["GlowUp_BrandGuidelines.pdf", "GlowUp_Campaign_Agreement.pdf", "GlowUp_CreativeBrief.docx"],
      team: [
        { name: 'John Doe', role: 'Campaign Manager', email: 'john@glowup.com' },
        { name: 'Lisa Smith', role: 'Content Producer', email: 'lisa@glowup.com' },
        { name: 'Ryan Lee', role: 'Visual Designer', email: 'ryan@glowup.com' }
      ],
      activity: [
        'Jun 25 - Uploaded new product teaser for approval',
        'Jun 15 - Finalized influencer list',
        'Jun 10 - Reviewed summer campaign proposal'
      ]
    }
  }
  ,
  {
    "id": 2,
    "name": "PixelPerfect Productions",
    "contact": "David Chen",
    "email": "david@techsolutions.com",
    "phone": "+1 (555) 987-6543",
    "status": "Active Client",
    "projects": 2,
    "revenue": "$75,000",
    "lastActivity": "Just wrapped up a review call!",
    "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
    "company": "Software & IT Niche",
    "data": {
      "projects": [
        { "name": "Website Relaunch Hype Videos", "status": "In Progress", "deadline": "2025-08-15", "budget": "$30,000" },
        { "name": "Mobile App Launch Content", "status": "Published", "deadline": "2025-06-01", "budget": "$45,000" }
      ],
      "invoices": [
        { "id": "004", "status": "Paid", "amount": "$25,000", "date": "2025-05-15" },
        { "id": "005", "status": "Pending", "amount": "$30,000", "dueDate": "2025-08-01" },
        { "id": "006", "status": "Paid", "amount": "$20,000", "date": "2025-06-01" }
      ],
      "documents": ["Content Strategy Brief - Website", "App Video Script & Storyboard", "Brand Guidelines - Tech"],
      "team": [
        { "name": "Emily White", "role": "Client Project Lead", "email": "emily@techsolutions.com" },
        { "name": "Michael Brown", "role": "Tech Liaison", "email": "michael@techsolutions.com" }
      ],
      "activity": [
        "Jun 29 - Pitched new video series ideas.",
        "Jun 20 - Final edits approved for website teaser!",
        "Jun 10 - Delivered final mobile app launch videos."
      ]
    }
  },
  {
    "id": 3,
    "name": "EcoVibe Media",
    "contact": "Maria Garcia",
    "email": "maria@greenearth.com",
    "phone": "+1 (555) 234-5678",
    "status": "Active Client",
    "projects": 4,
    "revenue": "$60,000",
    "lastActivity": "Brainstorming new content!",
    "avatar": "https://randomuser.me/api/portraits/women/67.jpg",
    "company": "Sustainable Food & Beverage",
    "data": {
      "projects": [
        { "name": "Organic Snacks Launch Campaign", "status": "In Progress", "deadline": "2025-09-01", "budget": "$25,000" },
        { "name": "Sustainability Story Series", "status": "Published", "deadline": "2025-04-20", "budget": "$15,000" },
        { "name": "Farm-to-Table Feature Videos", "status": "In Progress", "deadline": "2025-10-01", "budget": "$10,000" },
        { "name": "New Packaging Reveal", "status": "On Hold", "deadline": "TBD", "budget": "$10,000" }
      ],
      "invoices": [
        { "id": "007", "status": "Paid", "amount": "$15,000", "date": "2025-04-25" },
        { "id": "008", "status": "Pending", "amount": "$25,000", "dueDate": "2025-09-10" },
        { "id": "009", "status": "Paid", "amount": "$20,000", "date": "2025-05-20" }
      ],
      "documents": ["Content Calendar - Q3", "Organic Snacks Creative Brief", "Sustainability Campaign Report"],
      "team": [
        { "name": "Carlos Rodriguez", "role": "Client Marketing Lead", "email": "carlos@greenearth.com" },
        { "name": "Sophia Miller", "role": "Brand Liaison", "email": "sophia@greenearth.com" }
      ],
      "activity": [
        "Jun 26 - Sent snack campaign visuals for approval.",
        "Jun 18 - Signed off on local farm collaboration script.",
        "Jun 10 - Pitched new ideas for sustainable content."
      ]
    }
  },
  {
    "id": 4,
    "name": "InsightStream Content",
    "contact": "Robert Davis",
    "email": "robert@globalventures.com",
    "phone": "+1 (555) 876-5432",
    "status": "Past Client",
    "projects": 1,
    "revenue": "$10,000",
    "lastActivity": "Project delivered!",
    "avatar": "https://randomuser.me/api/portraits/men/19.jpg",
    "company": "Business Consulting",
    "data": {
      "projects": [
        { "name": "APAC Market Insights Video Report", "status": "Delivered", "deadline": "2025-03-01", "budget": "$10,000" }
      ],
      "invoices": [
        { "id": "010", "status": "Paid", "amount": "$10,000", "date": "2025-03-05" }
      ],
      "documents": ["Final Video Report - APAC", "Client Feedback Summary"],
      "team": [
        { "name": "Anna Kim", "role": "Client Consultant", "email": "anna@globalventures.com" }
      ],
      "activity": [
        "Mar 02 - Final video report submitted.",
        "Feb 15 - Received positive client feedback.",
        "Feb 01 - Shared initial video drafts for review."
      ]
    }
  },
  {
    "id": 5,
    "name": "Crafted Lens Studio",
    "contact": "Jessica Lee",
    "email": "jessica@artisan.com",
    "phone": "+1 (555) 345-6789",
    "status": "Active Client",
    "projects": 2,
    "revenue": "$30,000",
    "lastActivity": "Reviewing holiday photo edits!",
    "avatar": "https://randomuser.me/api/portraits/women/23.jpg",
    "company": "E-commerce & Retail",
    "data": {
      "projects": [
        { "name": "Holiday Collection Photoshoot & Reels", "status": "In Progress", "deadline": "2025-11-01", "budget": "$12,000" },
        { "name": "New E-commerce Platform Launch Content", "status": "In Progress", "deadline": "2025-09-30", "budget": "$18,000" }
      ],
      "invoices": [
        { "id": "011", "status": "Pending", "amount": "$12,000", "dueDate": "2025-11-15" },
        { "id": "012", "status": "Paid", "amount": "$18,000", "date": "2025-06-25" }
      ],
      "documents": ["Holiday Content Shot List", "Website Launch Video Script", "Brand Aesthetic Guide"],
      "team": [
        { "name": "Daniel Clark", "role": "Creative Director", "email": "daniel@artisan.com" },
        { "name": "Olivia Martinez", "role": "Website Lead", "email": "olivia@artisan.com" }
      ],
      "activity": [
        "Jun 30 - Sent first round of holiday edits for client review.",
        "Jun 28 - Confirmed all content synced for new website.",
        "Jun 20 - Locked in themes for holiday content."
      ]
    }
  },
  {
    "id": 6,
    "name": "ProcessFlow Media",
    "contact": "Kevin Wong",
    "email": "kevin@apex.com",
    "phone": "+1 (555) 111-2222",
    "status": "Active Client",
    "projects": 3,
    "revenue": "$90,000",
    "lastActivity": "Planning Q3 content!",
    "avatar": "https://randomuser.me/api/portraits/men/55.jpg",
    "company": "Industrial Manufacturing",
    "data": {
      "projects": [
        { "name": "Supply Chain Storytelling Series", "status": "In Progress", "deadline": "2025-12-31", "budget": "$40,000" },
        { "name": "New Machine Showcase Videos", "status": "Published", "deadline": "2025-06-15", "budget": "$35,000" },
        { "name": "Quality Control System Teasers", "status": "On Hold", "deadline": "TBD", "budget": "$15,000" }
      ],
      "invoices": [
        { "id": "013", "status": "Paid", "amount": "$35,000", "date": "2025-06-20" },
        { "id": "014", "status": "Pending", "amount": "$40,000", "dueDate": "2025-12-01" },
        { "id": "015", "status": "Paid", "amount": "$15,000", "date": "2025-05-10" }
      ],
      "documents": ["SCM Content Brief", "Machine Launch Script & Shotlist", "QC Teaser Concept"],
      "team": [
        { "name": "Sarah Green", "role": "Operations Comms", "email": "sarahg@apex.com" },
        { "name": "Tom Adams", "role": "Logistics Liaison", "email": "tom@apex.com" }
      ],
      "activity": [
        "Jun 25 - Pitched new content angles for supply chain.",
        "Jun 18 - Final machine showcase video published!",
        "Jun 01 - Sent initial ideas for QC system content."
      ]
    }
  },
  {
    "id": 7,
    "name": "InnovationPulse Productions",
    "contact": "Chris Evans",
    "email": "chris@futurelabs.com",
    "phone": "+1 (555) 777-8888",
    "status": "Active Client",
    "projects": 2,
    "revenue": "$120,000",
    "lastActivity": "Just wrapped up a big report!",
    "avatar": "https://randomuser.me/api/portraits/men/70.jpg",
    "company": "R&D & Deep Tech",
    "data": {
      "projects": [
        { "name": "AI Prototype Visual Explanations", "status": "In Progress", "deadline": "2026-01-31", "budget": "$80,000" },
        { "name": "Biotech Breakthrough Series", "status": "Published", "deadline": "2025-05-25", "budget": "$40,000" }
      ],
      "invoices": [
        { "id": "016", "status": "Pending", "amount": "$80,000", "dueDate": "2026-01-15" },
        { "id": "017", "status": "Paid", "amount": "$40,000", "date": "2025-05-30" }
      ],
      "documents": ["AI Concept Storyboard", "Biotech Visual Report", "Research Findings Summary"],
      "team": [
        { "name": "Dr. Alice Chen", "role": "Lead Scientist (Client)", "email": "alice@futurelabs.com" },
        { "name": "Dr. Ben Carter", "role": "Research Engineer (Client)", "email": "ben@futurelabs.com" }
      ],
      "activity": [
        "Jun 23 - Submitted AI prototype video draft.",
        "Jun 10 - Discussed new visual needs for next research phase.",
        "May 28 - All visuals for Biotech Project A finalized."
      ]
    }
  }
];


const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);


  const itemsPerPage = 6;

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const ClientCard = ({ client }: { client: typeof clients[0] }) => (
    <div onClick={() => setSelectedClient(client)} className="cursor-pointer">
      <Card className="dark-card hover:border-cyan-500/30 transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={client.avatar} alt={client.contact} />
                <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white">
                  {client.contact.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{client.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{client.company}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(client.status)}>
              {client.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{client.lastActivity}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-muted-foreground">{client.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span className="text-muted-foreground">{client.phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-semibold text-cyan-400">{client.projects}</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-green-400">{client.revenue}</p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  );

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Clients & Workspaces</h1>
          <p className="text-muted-foreground">Manage your client relationships and projects</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="dark-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold">{clients.filter(c => c.status === 'Active').length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">$186K</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80 bg-muted/50 border-muted focus:border-cyan-500"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <Card className="dark-card mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={client.avatar} alt={client.contact} />
                        <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white text-xs">
                          {client.contact.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{client.contact}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.projects}</TableCell>
                  <TableCell className="text-green-400 font-medium">{client.revenue}</TableCell>
                  <TableCell className="text-muted-foreground">{client.lastActivity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {selectedClient && (
        <Dialog open={true} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-8 bg-[#101114] text-white rounded-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center text-2xl font-bold">
                <span>{selectedClient.name}</span>
                {/* <Button size="icon" variant="ghost" onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-red-500">
                  <X className="w-6 h-6" />
                </Button> */}
              </DialogTitle>
            </DialogHeader>

            {/* Contact and Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1a1b1f] rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.email} placeholder="Email" />
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.phone} placeholder="Phone" />
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.company} placeholder="Industry" />
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.status} placeholder="Status" />
                  <Button className="mt-2 bg-cyan-600 hover:bg-cyan-700">Save Contact Info</Button>
                </div>
              </div>
              <div className="bg-[#1a1b1f] rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Client Statistics</h3>
                <div className="space-y-3 text-sm">
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.projects} placeholder="Projects" />
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.revenue} placeholder="Revenue" />
                  <input className="bg-[#2a2b30] text-white w-full p-2 rounded" defaultValue={selectedClient.lastActivity} placeholder="Last Activity" />
                  <Button className="mt-2 bg-cyan-600 hover:bg-cyan-700">Save Statistics</Button>
                </div>
              </div>
            </section>

            {/* Editable Sections */}
            <section className="space-y-6 text-sm">
              {/* Projects Section */}
              <div className="bg-[#1c1c1e] rounded-lg p-5 border border-[#2a2a2d]">
                <h3 className="text-lg font-semibold text-white mb-3">Projects</h3>
                {selectedClient.data.projects.map((project, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-2 items-center">
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={project.name} placeholder="Name" />
                    <input
                      className="bg-[#2a2a2d] text-white p-2 rounded border-l-4"
                      style={{
                        borderColor:
                          project.status === 'Ongoing' ? 'green' :
                            project.status === 'Pending' ? 'yellow' :
                              project.status === 'Requested' ? 'red' : '#2a2a2d'
                      }}
                      defaultValue={project.status}
                      placeholder="Status"
                    />
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={project.deadline} placeholder="Deadline" />
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={project.budget} placeholder="Budget" />
                    <Button variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => confirm('Are you sure you want to delete this project?') && console.log('delete project', index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">+ Add Project</Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Save Projects</Button>
                </div>
              </div>

              {/* Invoices Section */}
              <div className="bg-[#1c1c1e] rounded-lg p-5 border border-[#2a2a2d]">
                <h3 className="text-lg font-semibold text-white mb-3">Invoices</h3>
                {selectedClient.data.invoices.map((invoice, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-2 items-center">
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={invoice.id} placeholder="Invoice ID" />
                    <input
                      className="bg-[#2a2a2d] text-white p-2 rounded border-l-4"
                      style={{
                        borderColor:
                          invoice.status === 'Ongoing' ? 'green' :
                            invoice.status === 'Pending' ? 'yellow' :
                              invoice.status === 'Completed' || invoice.status === 'Paid' ? 'cyan' : '#2a2a2d'
                      }}
                      defaultValue={invoice.status}
                      placeholder="Status"
                    />
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={invoice.amount} placeholder="Amount" />
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={invoice.date || invoice.dueDate} placeholder="Date" />
                    <Button variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => confirm('Are you sure you want to delete this invoice?') && console.log('delete invoice', index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">+ Add Invoice</Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Save Invoices</Button>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-[#1c1c1e] rounded-lg p-5 border border-[#2a2a2d]">
                <h3 className="text-lg font-semibold text-white mb-3">Documents</h3>
                {selectedClient.data.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 mb-2">
                    <input className="bg-[#2a2a2d] text-white p-2 rounded w-full" defaultValue={doc} placeholder="Document name" />
                    <Button variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => confirm('Delete this document?') && console.log('delete doc', index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">+ Add Document</Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Save Documents</Button>
                </div>
              </div>

              {/* Team Members Section */}
              <div className="bg-[#1c1c1e] rounded-lg p-5 border border-[#2a2a2d]">
                <h3 className="text-lg font-semibold text-white mb-3">Team Members</h3>
                {selectedClient.data.team.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2 items-center">
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={member.name} placeholder="Name" />
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={member.role} placeholder="Role" />
                    <input className="bg-[#2a2a2d] text-white p-2 rounded" defaultValue={member.email} placeholder="Email" />
                    <Button variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => confirm('Delete team member?') && console.log('delete team', index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">+ Add Member</Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Save Team</Button>
                </div>
              </div>

              {/* Activity Logs Section */}
              <div className="bg-[#1c1c1e] rounded-lg p-5 border border-[#2a2a2d]">
                <h3 className="text-lg font-semibold text-white mb-3">Activity Logs</h3>
                {selectedClient.data.activity.map((log, index) => (
                  <div key={index} className="flex items-center gap-3 mb-2">
                    <input className="bg-[#2a2a2d] text-white p-2 rounded w-full" defaultValue={log} placeholder="Log entry" />
                    <Button variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => confirm('Delete this log?') && console.log('delete log', index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">+ Add Log</Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Save Logs</Button>
                </div>
              </div>

            </section>
          </DialogContent>
        </Dialog>
      )}



    </div>
  );
};

export default Clients;
