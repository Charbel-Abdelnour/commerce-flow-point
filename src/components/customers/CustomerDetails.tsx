
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  ShoppingBag,
  X,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Customer } from './CustomerManagement';

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
  onEdit: () => void;
}

// Mock purchase history data
const purchaseHistory = [
  { id: '1', date: '2025-04-10', amount: 350.50, items: 3, status: 'completed' },
  { id: '2', date: '2025-03-25', amount: 120.75, items: 1, status: 'completed' },
  { id: '3', date: '2025-03-15', amount: 520.00, items: 5, status: 'completed' },
  { id: '4', date: '2025-02-28', amount: 45.25, items: 1, status: 'completed' },
];

const CustomerDetails = ({ customer, onClose, onEdit }: CustomerDetailsProps) => {
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl">Customer Details</DialogTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={onEdit}>
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row items-start gap-4 py-4">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
            <User size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{customer.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                customer.type === 'retail' ? 'bg-blue-50 text-blue-700' :
                customer.type === 'wholesale' ? 'bg-purple-50 text-purple-700' :
                'bg-green-50 text-green-700'
              }`}>
                {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)} Customer
              </span>
              <span>•</span>
              <span>ID: {customer.id}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{customer.address}</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="purchases" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Last Purchase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{customer.lastPurchase}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{purchaseHistory.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 text-sm">
                        <th className="p-2 text-left font-medium">Date</th>
                        <th className="p-2 text-left font-medium">Order ID</th>
                        <th className="p-2 text-left font-medium">Items</th>
                        <th className="p-2 text-right font-medium">Amount</th>
                        <th className="p-2 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseHistory.map(purchase => (
                        <tr key={purchase.id} className="border-b">
                          <td className="p-2 text-sm">{purchase.date}</td>
                          <td className="p-2 text-sm">#{purchase.id}</td>
                          <td className="p-2 text-sm">{purchase.items}</td>
                          <td className="p-2 text-right text-sm">${purchase.amount.toFixed(2)}</td>
                          <td className="p-2 text-right">
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700">
                              {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                      <Mail size={16} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email Sent - Order Confirmation</p>
                      <p className="text-xs text-muted-foreground">
                        Order #1245 confirmation email was sent to {customer.email}
                      </p>
                      <p className="text-xs text-muted-foreground">April 10, 2025 at 3:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                      <ShoppingBag size={16} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-muted-foreground">
                        Customer placed order #1245 for $350.50
                      </p>
                      <p className="text-xs text-muted-foreground">April 10, 2025 at 3:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
                      <User size={16} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Profile Updated</p>
                      <p className="text-xs text-muted-foreground">
                        Customer updated their shipping address
                      </p>
                      <p className="text-xs text-muted-foreground">March 25, 2025 at 2:15 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Prefers email communication</h4>
                      <span className="text-xs text-muted-foreground">April 1, 2025</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Customer mentioned they prefer to be contacted via email rather than phone calls.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Interested in new product line</h4>
                      <span className="text-xs text-muted-foreground">March 15, 2025</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Customer expressed interest in our upcoming summer collection. Follow up when products are in stock.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Add New Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetails;
