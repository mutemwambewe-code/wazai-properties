
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Search, MapPin, DollarSign, Home, Loader2, Sparkles } from 'lucide-react';

import { suggestProperties } from '@/ai/flows/property-search-suggestions';

const searchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  propertyType: z.enum(['Commercial', 'Residential', 'Land', 'Mine', 'Any']).default('Any'),
  status: z.enum(['For Sale', 'For Rent', 'Any']).default('Any'),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function PropertySearchForm() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: '',
      location: '',
      propertyType: 'Any',
      status: 'Any',
    },
  });

  const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    form.setValue('query', query);
    
    if (query.length > 3) {
      setIsLoadingSuggestions(true);
      try {
        const userType = form.getValues('propertyType') === 'Commercial' ? 'investor' : 'residential';
        const result = await suggestProperties({ query, userType });
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error('Failed to get suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    } else {
      setSuggestions([]);
    }
  };
  
  const onSuggestionClick = (suggestion: string) => {
    form.setValue('query', suggestion);
    setSuggestions([]);
  };

  const onSubmit = (values: SearchFormValues) => {
    console.log(values);
    // In a real app, you would redirect to /listings with query params
  };

  return (
    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-white/10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input
                          {...field}
                          onChange={handleQueryChange}
                          placeholder="Search by keyword, e.g., 'land for office park'"
                          className="pl-10 h-12 text-base"
                          autoComplete="off"
                        />
                       {isLoadingSuggestions && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <AnimatePresence>
            {suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-10"
                >
                  <div className="p-2 text-sm font-semibold text-muted-foreground flex items-center"><Sparkles className="w-4 h-4 mr-2 text-primary"/> AI Suggestions</div>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-accent cursor-pointer" onClick={() => onSuggestionClick(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     <div className="relative">
                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input {...field} placeholder="Location" className="pl-10 h-12" />
                     </div>
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Any">Any Type</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Mine">Mine</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                       <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="For Sale / Rent" />
                        </SelectTrigger>
                       </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Any">Any Status</SelectItem>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 text-base lg:col-span-1">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
