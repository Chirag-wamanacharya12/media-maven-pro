import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, LaptopIcon, MailIcon, BellIcon, UserIcon, KeyRoundIcon, Trash2Icon } from 'lucide-react'; // Added KeyRoundIcon and Trash2Icon

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the UI after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8 lg:p-12 animate-fade-in bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">Settings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">Configure your account and preferences.</p>

        <div className="space-y-8">
          {/* Profile Card */}
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center space-x-4 p-6">
              <UserIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Profile</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Update your personal information.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">Name</Label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <Button className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 shadow-md">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Card */}
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center space-x-4 p-6">
              {theme === 'dark' ? (
                <MoonIcon className="h-8 w-8 text-purple-500 dark:text-purple-400" />
              ) : theme === 'light' ? (
                <SunIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
              ) : (
                <LaptopIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
              )}
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Appearance</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Customize the look and feel of the application.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Label htmlFor="theme" className="text-gray-700 dark:text-gray-300 font-medium">Theme</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred theme.</p>
                </div>
                <div className="flex space-x-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Button
                    variant={theme === 'light' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200
                      ${theme === 'light' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    <SunIcon className="h-4 w-4 mr-2" /> Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200
                      ${theme === 'dark' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    <MoonIcon className="h-4 w-4 mr-2" /> Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('system')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200
                      ${theme === 'system' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    <LaptopIcon className="h-4 w-4 mr-2" /> System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center space-x-4 p-6">
              <BellIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Manage your notification preferences.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email.</p>
                </div>
                <Switch id="email-notifications" defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600" />
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="text-gray-700 dark:text-gray-300 font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your devices.</p>
                </div>
                <Switch id="push-notifications" className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600" />
              </div>
            </CardContent>
          </Card>

          {/* Account Management Card */}
          <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center space-x-4 p-6">
              <KeyRoundIcon className="h-8 w-8 text-orange-500 dark:text-orange-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Account Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Manage your account security and data.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className="text-gray-700 dark:text-gray-300 font-medium">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-gray-700 dark:text-gray-300 font-medium">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300 font-medium">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <Button className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 shadow-md">
                  Change Password
                </Button>
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Label htmlFor="delete-account" className="text-gray-700 dark:text-gray-300 font-medium">Delete Account</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all associated data.</p>
                </div>
                <Button variant="destructive" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200 shadow-md">
                  <Trash2Icon className="h-4 w-4 mr-2" /> Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
