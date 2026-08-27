"use client";

import { storeConfig } from "../../../devsmith.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          {storeConfig.newsletter.heading}
        </h2>
        <p className="text-slate-300 mb-8">
          {storeConfig.newsletter.description}
        </p>
        
        {subscribed ? (
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="font-semibold text-green-400">Thanks for subscribing!</p>
            <p className="text-sm text-slate-400 mt-2">You&apos;ll receive our next update soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-primary h-12"
              required
            />
            <Button type="submit" size="lg" className="h-12 w-full sm:w-auto">
              {storeConfig.newsletter.buttonText}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
