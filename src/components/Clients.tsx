
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Building, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    name: 'TechCorp Solutions',
    contact: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    projects: 3,
    revenue: '$45,000',
    lastActivity: '2 days ago',
    avatar: '/placeholder.svg',
    company: 'Technology'
  },
  {
    id: 2,
    name: 'Green Earth Co.',
    contact: 'Michael Chen',
    email: 'michael@greenearth.com',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    projects: 2,
    revenue: '$32,500',
    lastActivity: '1 week ago',
    avatar: '/placeholder.svg',
    company: 'Sustainability'
  },
  {
    id: 3,
    name: 'Urban Fitness',
    contact: 'Jessica Rodriguez',
    email: 'jessica@urbanfitness.com',
    phone: '+1 (555) 456-7890',
    status: 'Pending',
    projects: 1,
    revenue: '$18,000',
    lastActivity: '3 days ago',
    avatar: '/placeholder.svg',
    company: 'Health & Fitness'
  },
  {
    id: 4,
    name: 'Artisan Bakery',
    contact: 'Robert Kim',
    email: 'robert@artisanbakery.com',
    phone: '+1 (555) 321-0987',
    status: 'Inactive',
    projects: 4,
    revenue: '$28,750',
    lastActivity: '2 weeks ago',
    avatar: '/placeholder.svg',
    company: 'Food & Beverage'
  },
  {
    id: 5,
    name: 'Digital Nomads',
    contact: 'Emily Watson',
    email: 'emily@digitalnomads.com',
    phone: '+1 (555) 654-3210',
    status: 'Active',
    projects: 5,
    revenue: '$62,000',
    lastActivity: '1 day ago',
    avatar: '/placeholder.svg',
    company: 'Digital Services'
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
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
    </div>
  );
};

export default Clients;
