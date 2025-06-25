
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  // Sample events for demonstration
  const events = [
    {
      id: 1,
      title: 'LinkedIn post about AI trends',
      time: '14:30',
      platform: 'LinkedIn',
      date: '2024-01-15',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Instagram story - behind the scenes',
      time: '18:00',
      platform: 'Instagram',
      date: '2024-01-15',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Twitter thread about social media automation',
      time: '10:00',
      platform: 'Twitter',
      date: '2024-01-16',
      status: 'scheduled'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Twitter': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'Instagram': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Facebook': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Calendar</h1>
          <p className="text-muted-foreground">Plan and schedule your content across all platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-border hover:border-cyan-500">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="glass border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-xl">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="ghost" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button 
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Month
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div key={day} className="bg-muted p-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {getDaysInMonth(currentDate).map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              const isToday = day && 
                new Date().getDate() === day && 
                new Date().getMonth() === currentDate.getMonth() && 
                new Date().getFullYear() === currentDate.getFullYear();
              
              return (
                <div
                  key={index}
                  className={`bg-card min-h-[120px] p-2 relative group hover:bg-muted/50 transition-colors ${
                    !day ? 'opacity-50' : ''
                  } ${isToday ? 'bg-cyan-500/10 border border-cyan-500/30' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isToday ? 'text-cyan-400' : ''}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded bg-muted/50 hover:bg-muted transition-colors cursor-pointer truncate"
                          >
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getPlatformColor(event.platform).split(' ')[0]}`} />
                              <span className="truncate">{event.title}</span>
                            </div>
                            <div className="text-muted-foreground mt-1">{event.time}</div>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                      {/* Add Event Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Posts */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle>Upcoming Posts (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={getPlatformColor(event.platform)}>
                    {event.platform}
                  </Badge>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
