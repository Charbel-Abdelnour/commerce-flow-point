
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Mail, Bell, ShieldAlert, Shield } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileSettingsProps {
  onSave: () => void;
}

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  securityAlerts: z.boolean().default(true),
});

const ProfileSettings = ({ onSave }: ProfileSettingsProps) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Smith",
      email: "john@flowpos.com",
      phone: "(555) 123-4567",
      jobTitle: "Store Manager",
      bio: "Experienced retail manager with 5 years of experience in POS systems.",
      emailNotifications: true,
      smsNotifications: false,
      securityAlerts: true,
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    onSave();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex flex-col items-center mb-4 md:mb-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JS</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Change
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Brief description for your profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Profile</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Manage your notification settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <div className="text-sm">Email Notifications</div>
                      <div className="text-xs text-muted-foreground">Receive notifications via email</div>
                    </div>
                  </div>
                  <Switch 
                    checked={form.watch("emailNotifications")}
                    onCheckedChange={(checked) => form.setValue("emailNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <div className="text-sm">SMS Notifications</div>
                      <div className="text-xs text-muted-foreground">Receive notifications via text message</div>
                    </div>
                  </div>
                  <Switch 
                    checked={form.watch("smsNotifications")}
                    onCheckedChange={(checked) => form.setValue("smsNotifications", checked)}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Security</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <div className="text-sm">Security Alerts</div>
                      <div className="text-xs text-muted-foreground">Get notified about security events</div>
                    </div>
                  </div>
                  <Switch 
                    checked={form.watch("securityAlerts")}
                    onCheckedChange={(checked) => form.setValue("securityAlerts", checked)}
                  />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {}}>
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
