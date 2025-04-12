
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Filter,
  Download,
  Upload,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import CustomerForm from './CustomerForm';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import CustomerDetails from './CustomerDetails';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  lastPurchase: string;
  type: 'retail' | 'wholesale' | 'online';
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State',
    totalSpent: 1250.50,
    lastPurchase: '2025-04-01',
    type: 'retail'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Town, State',
    totalSpent: 3420.75,
    lastPurchase: '2025-04-05',
    type: 'wholesale'
  },
  {
    id: '3',
    name: 'Sam Taylor',
    email: 'sam@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, Village, State',
    totalSpent: 750.25,
    lastPurchase: '2025-03-28',
    type: 'online'
  },
  {
    id: '4',
    name: 'Jordan Williams',
    email: 'jordan@example.com',
    phone: '(555) 456-7890',
    address: '101 Elm Blvd, County, State',
    totalSpent: 2150.00,
    lastPurchase: '2025-04-10',
    type: 'retail'
  },
  {
    id: '5',
    name: 'Taylor Lee',
    email: 'taylor@example.com',
    phone: '(555) 567-8901',
    address: '202 Maple Dr, District, State',
    totalSpent: 4750.80,
    lastPurchase: '2025-04-08',
    type: 'wholesale'
  }
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm);
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && customer.type === activeFilter;
  });

  const handleAddCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: `${customers.length + 1}`,
    };
    setCustomers([...customers, newCustomer]);
    setIsAddingCustomer(false);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ));
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = () => {
    if (customerToDelete) {
      setCustomers(customers.filter(c => c.id !== customerToDelete.id));
      setCustomerToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage your customer database and track customer information.
          </p>
        </div>
        <Button onClick={() => setIsAddingCustomer(true)} className="shrink-0">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ToggleGroup type="single" value={activeFilter} onValueChange={(val) => val && setActiveFilter(val)}>
                  <ToggleGroupItem value="all">All</ToggleGroupItem>
                  <ToggleGroupItem value="retail">Retail</ToggleGroupItem>
                  <ToggleGroupItem value="wholesale">Wholesale</ToggleGroupItem>
                  <ToggleGroupItem value="online">Online</ToggleGroupItem>
                </ToggleGroup>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Last Purchase</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setViewingCustomer(customer)}
                          >
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                              <User size={14} />
                            </div>
                            <div>
                              {customer.name}
                              <p className="text-xs text-muted-foreground hidden sm:block">
                                {customer.address}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <Mail size={12} />
                              <span className="text-xs">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Phone size={12} />
                              <span className="text-xs">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            customer.type === 'retail' ? 'bg-blue-50 text-blue-700' :
                            customer.type === 'wholesale' ? 'bg-purple-50 text-purple-700' :
                            'bg-green-50 text-green-700'
                          }`}>
                            {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{customer.lastPurchase}</TableCell>
                        <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost" 
                              size="icon"
                              onClick={() => setEditingCustomer(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost" 
                              size="icon"
                              onClick={() => setCustomerToDelete(customer)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
            </p>
          </CardFooter>
        </Card>
      </div>

      {(isAddingCustomer || editingCustomer) && (
        <CustomerForm
          customer={editingCustomer}
          onSave={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
          onCancel={() => {
            setIsAddingCustomer(false);
            setEditingCustomer(null);
          }}
        />
      )}

      {customerToDelete && (
        <DeleteCustomerDialog
          customerName={customerToDelete.name}
          onDelete={handleDeleteCustomer}
          onCancel={() => setCustomerToDelete(null)}
        />
      )}

      {viewingCustomer && (
        <CustomerDetails
          customer={viewingCustomer}
          onClose={() => setViewingCustomer(null)}
          onEdit={() => {
            setEditingCustomer(viewingCustomer);
            setViewingCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerManagement;
