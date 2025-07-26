import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, TrendingUp, Smartphone, Shield, BarChart3, Zap, Globe } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Crypto Portfolio Tracker",
    subtitle: "Professional Cryptocurrency Investment Management",
    content: (
      <div className="text-center animate-fade-in">
        <div className="text-6xl mb-8 animate-float">💼</div>
        <p className="text-xl text-muted-foreground mb-8">
          A modern, real-time cryptocurrency portfolio tracking application
        </p>
        <div className="flex justify-center gap-4">
          <div className="bg-primary/20 px-4 py-2 rounded-full text-primary font-medium">React</div>
          <div className="bg-primary/20 px-4 py-2 rounded-full text-primary font-medium">TypeScript</div>
          <div className="bg-primary/20 px-4 py-2 rounded-full text-primary font-medium">Tailwind</div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Key Features",
    subtitle: "Everything you need to track your crypto investments",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary animate-float" />
            <div>
              <h3 className="font-semibold text-foreground">Real-time Price Tracking</h3>
              <p className="text-muted-foreground">Live cryptocurrency prices from CoinGecko API</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-success animate-float" style={{ animationDelay: '0.5s' }} />
            <div>
              <h3 className="font-semibold text-foreground">Portfolio Analytics</h3>
              <p className="text-muted-foreground">Comprehensive P&L calculations and performance metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Smartphone className="h-8 w-8 text-accent animate-float" style={{ animationDelay: '1s' }} />
            <div>
              <h3 className="font-semibold text-foreground">Responsive Design</h3>
              <p className="text-muted-foreground">Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-warning animate-float" style={{ animationDelay: '1.5s' }} />
            <div>
              <h3 className="font-semibold text-foreground">Local Storage</h3>
              <p className="text-muted-foreground">Your data stays private and secure on your device</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Zap className="h-8 w-8 text-danger animate-float" style={{ animationDelay: '2s' }} />
            <div>
              <h3 className="font-semibold text-foreground">Fast Performance</h3>
              <p className="text-muted-foreground">Lightning-fast updates and smooth animations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Globe className="h-8 w-8 text-primary animate-float" style={{ animationDelay: '2.5s' }} />
            <div>
              <h3 className="font-semibold text-foreground">Global Markets</h3>
              <p className="text-muted-foreground">Track cryptocurrencies from markets worldwide</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Technology Stack",
    subtitle: "Built with modern, industry-standard technologies",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:scale-105 transition-all duration-300 animate-scale-in">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-float">⚛️</div>
            <h3 className="font-semibold text-foreground mb-2">React 18</h3>
            <p className="text-muted-foreground text-sm">Modern React with hooks, context, and functional components</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center">
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>🔷</div>
            <h3 className="font-semibold text-foreground mb-2">TypeScript</h3>
            <p className="text-muted-foreground text-sm">Type-safe development with better IDE support and error prevention</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '1s' }}>🎨</div>
            <h3 className="font-semibold text-foreground mb-2">Tailwind CSS</h3>
            <p className="text-muted-foreground text-sm">Utility-first CSS framework for rapid UI development</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '1.5s' }}>🧩</div>
            <h3 className="font-semibold text-foreground mb-2">Shadcn/ui</h3>
            <p className="text-muted-foreground text-sm">Beautiful, accessible UI components built on Radix</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '2s' }}>⚡</div>
            <h3 className="font-semibold text-foreground mb-2">Vite</h3>
            <p className="text-muted-foreground text-sm">Next-generation frontend tooling for faster development</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '2.5s' }}>🔗</div>
            <h3 className="font-semibold text-foreground mb-2">CoinGecko API</h3>
            <p className="text-muted-foreground text-sm">Reliable cryptocurrency market data and price feeds</p>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: 4,
    title: "How It Works",
    subtitle: "Simple three-step process to track your investments",
    content: (
      <div className="space-y-12 animate-fade-in">
        <div className="flex items-center gap-8">
          <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold animate-glow">1</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">Add Your Holdings</h3>
            <p className="text-muted-foreground">Search for cryptocurrencies and add them to your portfolio with purchase amount and price</p>
          </div>
          <div className="text-4xl animate-float">🔍</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold animate-glow" style={{ animationDelay: '0.5s' }}>2</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground">The app automatically fetches current prices and calculates your portfolio performance</p>
          </div>
          <div className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>📊</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold animate-glow" style={{ animationDelay: '1s' }}>3</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">Track Performance</h3>
            <p className="text-muted-foreground">Monitor your profits, losses, and overall portfolio performance with beautiful visualizations</p>
          </div>
          <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>💰</div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Benefits & Value",
    subtitle: "Why choose our crypto portfolio tracker?",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        <div className="space-y-6">
          <div className="bg-success/20 p-6 rounded-lg border border-success/30">
            <h3 className="font-semibold text-success mb-2">💡 Smart Insights</h3>
            <p className="text-muted-foreground">Get instant visibility into your portfolio performance with detailed P&L calculations</p>
          </div>
          <div className="bg-primary/20 p-6 rounded-lg border border-primary/30">
            <h3 className="font-semibold text-primary mb-2">🔒 Privacy First</h3>
            <p className="text-muted-foreground">Your data never leaves your device - complete privacy and security</p>
          </div>
          <div className="bg-warning/20 p-6 rounded-lg border border-warning/30">
            <h3 className="font-semibold text-warning mb-2">⚡ Lightning Fast</h3>
            <p className="text-muted-foreground">Optimized performance with smooth animations and instant updates</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-accent/20 p-6 rounded-lg border border-accent/30">
            <h3 className="font-semibold text-accent mb-2">📱 Mobile Ready</h3>
            <p className="text-muted-foreground">Fully responsive design works perfectly on all your devices</p>
          </div>
          <div className="bg-danger/20 p-6 rounded-lg border border-danger/30">
            <h3 className="font-semibold text-danger mb-2">🚀 Modern UI</h3>
            <p className="text-muted-foreground">Beautiful, intuitive interface with stunning animations and smooth interactions</p>
          </div>
          <div className="bg-muted/20 p-6 rounded-lg border border-muted/30">
            <h3 className="font-semibold text-foreground mb-2">🔄 Real-time Data</h3>
            <p className="text-muted-foreground">Always up-to-date cryptocurrency prices from reliable market data sources</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Thank You!",
    subtitle: "Ready to start tracking your crypto portfolio?",
    content: (
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-8 animate-float">🎉</div>
        <p className="text-xl text-muted-foreground mb-8">
          Start building your cryptocurrency portfolio today!
        </p>
        <div className="space-y-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg animate-glow"
            onClick={() => window.location.href = '/'}
          >
            Go to Portfolio Tracker
          </Button>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    )
  }
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Crypto Portfolio Tracker</h1>
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="border-border hover:bg-muted/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="border-border hover:bg-muted/50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="container mx-auto px-4 py-12">
        <div key={slide.id} className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              {slide.title}
            </h1>
            <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
          </div>
          
          <div className="min-h-[400px] flex items-center justify-center">
            {slide.content}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="fixed bottom-8 right-8 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-2 rounded border border-border">
        Use ← → arrow keys or click dots to navigate
      </div>
    </div>
  );
};

export default Presentation;