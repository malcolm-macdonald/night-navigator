import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Users, Utensils, Music, Check, AlertCircle, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addMonths } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FormData {
  date: Date | undefined;
  time: string;
  people: string;
  occasion: string;
  cuisine: string;
  budget: string;
  dietary: string;
  activities: string[];
  ambiance: string[];
  location: string;
  distance: string;
  transport: string;
}

export const BookingInterface = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    date: undefined,
    time: '',
    people: '2',
    occasion: 'Friends Gathering',
    cuisine: 'Japanese',
    budget: '$$$',
    dietary: '',
    activities: ['Live Music'],
    ambiance: ['Elegant'],
    location: '',
    distance: 'Local (<5 mi)',
    transport: 'Uber/Lyft'
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Calculate date limits - today to 1 month in the future
  const today = new Date();
  const oneMonthFromNow = addMonths(today, 1);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleSelection = (field: keyof FormData, value: string) => {
    if (Array.isArray(formData[field])) {
      const currentValues = formData[field] as string[];
      if (currentValues.includes(value)) {
        setFormData(prev => ({
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [field]: [...currentValues, value]
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateCurrentTab = () => {
    const errors: string[] = [];
    
    // Validate all fields before showing results
    if (!formData.date) errors.push("Please select a date");
    if (!formData.time) errors.push("Please select a time");
    if (!formData.people || parseInt(formData.people) < 1) 
      errors.push("Please enter the number of people");
    if (!formData.location) errors.push("Please enter a location");
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const tabs = [
    { icon: <Calendar className="h-5 w-5" />, label: "When" },
    { icon: <Users className="h-5 w-5" />, label: "Who" },
    { icon: <Utensils className="h-5 w-5" />, label: "Dining" },
    { icon: <Music className="h-5 w-5" />, label: "Activities" },
    { icon: <MapPin className="h-5 w-5" />, label: "Location" },
  ];

  const getTabContent = (tab: number) => {
    switch (tab) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 px-3",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center w-full gap-2">
                      <CalendarIcon className="h-4 w-4 shrink-0" />
                      <span className="flex-grow truncate">
                        {formData.date ? format(formData.date, "EEEE, MMMM d") : "Select a date"}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleInputChange('date', date)}
                    disabled={(date) => 
                      date < today || 
                      date > oneMonthFromNow
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">
                Starting Time
              </label>
              <Select
                value={formData.time}
                onValueChange={(value) => handleInputChange('time', value)}
              >
                <SelectTrigger className="w-full h-10">
                  <div className="flex items-center w-full gap-2">
                    <ClockIcon className="h-4 w-4 shrink-0" />
                    <SelectValue placeholder="Select a time" className="flex-grow truncate" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {generateTimeOptions().map((time) => (
                    <SelectItem key={time} value={time} className="cursor-pointer">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="people" className="text-sm font-medium">
                Number of People
              </label>
              <Input 
                id="people" 
                type="number" 
                min="1" 
                placeholder="2" 
                value={formData.people}
                onChange={(e) => handleInputChange('people', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="occasion" className="text-sm font-medium">
                Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {['Date Night', 'Friends Gathering', 'Birthday', 'Business', 'Other'].map((occasionOption) => (
                  <button
                    key={occasionOption}
                    className={cn(
                      "flex-1 min-w-[150px] h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.occasion === occasionOption && "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                    )}
                    onClick={() => handleInputChange('occasion', occasionOption)}
                  >
                    {occasionOption}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="cuisine" className="text-sm font-medium">
                Preferred Cuisine
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Italian',
                  'Japanese',
                  'French',
                  'Chinese',
                  'Mexican',
                  'Indian',
                  'Thai',
                  'Mediterranean',
                  'American',
                  'Korean',
                  'Vietnamese',
                  'Spanish',
                  'Any'
                ].map((cuisineOption) => (
                  <button
                    key={cuisineOption}
                    className={cn(
                      "h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.cuisine === cuisineOption 
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleInputChange('cuisine', cuisineOption)}
                  >
                    {cuisineOption}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: '$', label: '$' },
                  { value: '$$', label: '$$' },
                  { value: '$$$', label: '$$$' },
                  { value: '$$$$', label: '$$$$' }
                ].map((budgetOption) => (
                  <button
                    key={budgetOption.value}
                    className={cn(
                      "flex-1 h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer justify-center",
                      formData.budget === budgetOption.value 
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleInputChange('budget', budgetOption.value)}
                  >
                    {budgetOption.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dietary" className="text-sm font-medium">
                Dietary Restrictions
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'None',
                  'Vegetarian',
                  'Vegan',
                  'Gluten-Free',
                  'Halal',
                  'Kosher',
                  'Dairy-Free',
                  'Nut-Free'
                ].map((dietaryOption) => (
                  <button
                    key={dietaryOption}
                    className={cn(
                      "flex-1 min-w-[120px] h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.dietary === dietaryOption 
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleInputChange('dietary', dietaryOption)}
                  >
                    {dietaryOption}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground mb-4">Choose as many or as few options as you'd like for your perfect evening.</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Entertainment & Activities
                </label>
                <button
                  onClick={() => {
                    const allOptions = [
                      'Live Music',
                      'Karaoke',
                      'Comedy Show',
                      'Trivia',
                      'Nightclub',
                      'Bowling',
                      'Escape Room',
                      'Mini Golf',
                      'Other'
                    ];
                    const allSelected = allOptions.every(option => formData.activities.includes(option));
                    if (allSelected) {
                      setFormData(prev => ({
                        ...prev,
                        activities: prev.activities.filter(item => !allOptions.includes(item))
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        activities: [...new Set([...prev.activities, ...allOptions])]
                      }));
                    }
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                >
                  <div className={cn(
                    "w-3 h-3 border rounded-sm flex items-center justify-center",
                    ['Live Music', 'Karaoke', 'Comedy Show', 'Trivia', 'Nightclub', 'Bowling', 'Escape Room', 'Mini Golf', 'Other']
                      .every(option => formData.activities.includes(option))
                      ? "bg-gold-500 border-gold-500"
                      : "border-input"
                  )}>
                    {['Live Music', 'Karaoke', 'Comedy Show', 'Trivia', 'Nightclub', 'Bowling', 'Escape Room', 'Mini Golf', 'Other']
                      .every(option => formData.activities.includes(option)) && 
                      <Check className="h-2 w-2 text-white" />
                    }
                  </div>
                  Select All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Live Music',
                  'Karaoke',
                  'Comedy Show',
                  'Trivia',
                  'Nightclub',
                  'Bowling',
                  'Escape Room',
                  'Mini Golf',
                  'Other'
                ].map((activityOption) => (
                  <button
                    key={activityOption}
                    className={cn(
                      "h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.activities.includes(activityOption)
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleToggleSelection('activities', activityOption)}
                  >
                    {activityOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Drinks & Tastings
                </label>
                <button
                  onClick={() => {
                    const allOptions = [
                      'Wine Tasting',
                      'Craft Beer',
                      'Sports Bar',
                      'Speakeasy',
                      'Rooftop Bar',
                      'Whiskey Bar'
                    ];
                    const allSelected = allOptions.every(option => formData.activities.includes(option));
                    if (allSelected) {
                      setFormData(prev => ({
                        ...prev,
                        activities: prev.activities.filter(item => !allOptions.includes(item))
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        activities: [...new Set([...prev.activities, ...allOptions])]
                      }));
                    }
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                >
                  <div className={cn(
                    "w-3 h-3 border rounded-sm flex items-center justify-center",
                    ['Wine Tasting', 'Craft Beer', 'Sports Bar', 'Speakeasy', 'Rooftop Bar', 'Whiskey Bar']
                      .every(option => formData.activities.includes(option))
                      ? "bg-gold-500 border-gold-500"
                      : "border-input"
                  )}>
                    {['Wine Tasting', 'Craft Beer', 'Sports Bar', 'Speakeasy', 'Rooftop Bar', 'Whiskey Bar']
                      .every(option => formData.activities.includes(option)) && 
                      <Check className="h-2 w-2 text-white" />
                    }
                  </div>
                  Select All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Wine Tasting',
                  'Craft Beer',
                  'Sports Bar',
                  'Speakeasy',
                  'Rooftop Bar',
                  'Whiskey Bar'
                ].map((activityOption) => (
                  <button
                    key={activityOption}
                    className={cn(
                      "h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.activities.includes(activityOption)
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleToggleSelection('activities', activityOption)}
                  >
                    {activityOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Desired Ambiance
                  <span className="text-sm text-muted-foreground ml-2">(Select all that apply)</span>
                </label>
                <button
                  onClick={() => {
                    const allOptions = [
                      'Quiet',
                      'Lively',
                      'Upscale',
                      'Casual',
                      'Trendy',
                      'Romantic'
                    ];
                    const allSelected = allOptions.every(option => formData.ambiance.includes(option));
                    if (allSelected) {
                      setFormData(prev => ({
                        ...prev,
                        ambiance: []
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        ambiance: allOptions
                      }));
                    }
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                >
                  <div className={cn(
                    "w-3 h-3 border rounded-sm flex items-center justify-center",
                    ['Quiet', 'Lively', 'Upscale', 'Casual', 'Trendy', 'Romantic']
                      .every(option => formData.ambiance.includes(option))
                      ? "bg-gold-500 border-gold-500"
                      : "border-input"
                  )}>
                    {['Quiet', 'Lively', 'Upscale', 'Casual', 'Trendy', 'Romantic']
                      .every(option => formData.ambiance.includes(option)) && 
                      <Check className="h-2 w-2 text-white" />
                    }
                  </div>
                  Select All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Quiet',
                  'Lively',
                  'Upscale',
                  'Casual',
                  'Trendy',
                  'Romantic'
                ].map((ambianceOption) => (
                  <button
                    key={ambianceOption}
                    className={cn(
                      "h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.ambiance.includes(ambianceOption)
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleToggleSelection('ambiance', ambianceOption)}
                  >
                    {ambianceOption}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Starting Location
              </label>
              <Input 
                id="location" 
                placeholder="Enter address or location" 
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                list="location-suggestions"
                className="w-full"
              />
              <datalist id="location-suggestions">
                <option value="Current Location" />
                <option value="San Francisco, CA" />
                <option value="New York, NY" />
                <option value="Chicago, IL" />
                <option value="Los Angeles, CA" />
                <option value="Seattle, WA" />
              </datalist>
            </div>
            <div className="space-y-2">
              <label htmlFor="radius" className="text-sm font-medium">
                Distance Willing to Travel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Close (< 5 mi)',
                  'Medium (5-10 mi)',
                  'Any Distance'
                ].map((distanceOption) => (
                  <button
                    key={distanceOption}
                    className={cn(
                      "h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.distance === distanceOption
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleInputChange('distance', distanceOption)}
                  >
                    {distanceOption}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="transport" className="text-sm font-medium">
                Transportation Preferences
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Uber/Lyft',
                  'Public Transit',
                  'Walking'
                ].map((transportOption) => (
                  <button
                    key={transportOption}
                    className={cn(
                      "h-10 px-4 rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                      formData.transport === transportOption
                        ? "bg-gold-50 text-gold-900 border-gold-300 dark:bg-gold-900/20 dark:text-gold-400 dark:border-gold-800"
                        : "hover:bg-gold-50/50 hover:text-gold-900 dark:hover:bg-gold-900/10"
                    )}
                    onClick={() => handleInputChange('transport', transportOption)}
                  >
                    {transportOption}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour < 12 ? 'AM' : 'PM';
        const minuteFormatted = minute === 0 ? '00' : minute;
        times.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
      }
    }
    return times;
  };

  const renderPlanResults = () => {
    const formattedDate = formData.date 
      ? format(formData.date, 'EEEE, MMMM d')
      : 'Date not selected';

    return (
      <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Your Perfect Evening</h3>
          <p className="text-muted-foreground">Based on your preferences, we've created a personalized plan.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-gold-500 mt-0.5" />
              <div>
                <h4 className="font-medium">When</h4>
                <p className="text-sm text-muted-foreground">{formattedDate} at {formData.time}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gold-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Who</h4>
                <p className="text-sm text-muted-foreground">{formData.people} people</p>
                <p className="text-sm text-muted-foreground">Occasion: {formData.occasion}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Utensils className="h-5 w-5 text-gold-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Dining</h4>
                <p className="text-sm text-muted-foreground">Cuisine: {formData.cuisine}</p>
                <p className="text-sm text-muted-foreground">Budget: {formData.budget}</p>
                {formData.dietary && <p className="text-sm text-muted-foreground">Dietary: {formData.dietary}</p>}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Music className="h-5 w-5 text-gold-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Activities</h4>
                <p className="text-sm text-muted-foreground">{formData.activities.join(', ') || 'None selected'}</p>
                <p className="text-sm text-muted-foreground">Ambiance: {formData.ambiance.join(', ') || 'None selected'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gold-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-sm text-muted-foreground">Starting from: {formData.location}</p>
                <p className="text-sm text-muted-foreground">Distance: {formData.distance}</p>
                <p className="text-sm text-muted-foreground">Transport: {formData.transport}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            className="bg-gold-500 hover:bg-gold-600 text-black w-full md:w-auto"
            onClick={() => setShowResults(false)}
          >
            Edit Plan
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div id="try-it-now" className="py-24 relative overflow-hidden">
      <div 
        ref={sectionRef}
        className="container max-w-7xl mx-auto px-4 sm:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-4">
            Try It Now
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plan Your Perfect Evening
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our intuitive booking interface and create your perfect night out in minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card rounded-xl overflow-hidden shadow-xl">
          {!showResults ? (
            <div className="flex flex-col">
              <Tabs defaultValue={activeTab.toString()} onValueChange={(value) => setActiveTab(parseInt(value))}>
                <TabsList className="grid grid-cols-5 w-full">
                  {tabs.map((tab, index) => (
                    <TabsTrigger 
                      key={index}
                      value={index.toString()}
                      className="flex flex-col items-center justify-center p-4 data-[state=active]:text-gold-500"
                    >
                      {tab.icon}
                      <span className="mt-1">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="p-6 md:p-8">
                  {formErrors.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <div className="space-y-1">
                          {formErrors.map((error, index) => (
                            <p key={index} className="text-sm text-red-500">
                              {error}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {getTabContent(activeTab)}
                  
                  <div className="mt-8 flex justify-between items-center w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                      disabled={activeTab === 0}
                      className="w-full md:w-auto"
                    >
                      Previous
                    </Button>
                    
                    {activeTab < tabs.length - 1 ? (
                      <Button 
                        variant="outline"
                        onClick={() => setActiveTab(activeTab + 1)}
                        className="w-full md:w-auto"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        className="bg-gold-500 hover:bg-gold-600 text-black w-full md:w-auto"
                        onClick={() => {
                          if (validateCurrentTab()) {
                            setShowResults(true);
                          }
                        }}
                      >
                        Create Plan
                      </Button>
                    )}
                  </div>
                </div>
              </Tabs>
            </div>
          ) : (
            renderPlanResults()
          )}
        </div>
      </div>
    </div>
  );
};
