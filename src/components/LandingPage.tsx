import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, Brain, Lock, RefreshCcw, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-accent-blue/10 via-background to-background">
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/10" />
        {/* Radial gradient for added depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 via-accent-blue/10 to-accent-indigo/5" />
        
        <div className="relative">
          <div className="container mx-auto px-4 py-32">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 text-sm bg-accent-blue/10 text-accent-blue px-4 py-1 rounded-full mb-8 hover:bg-accent-blue/20 transition-colors">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                100% Offline & Air-Gap Friendly
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-br from-accent-blue via-accent-purple to-accent-indigo bg-clip-text text-transparent animate-gradient">
                Memorable Seed Phrases
                <br />That Stay Secure
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                Generate cryptographically secure BIP39 seed phrases as meaningful sentences. 
                Easier to remember, impossible to crack.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow bg-accent-blue hover:bg-accent-blue/90" 
                  onClick={() => navigate('/generator')}>
                  Create Your Phrase <ArrowRight className="animate-bounce-x" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Learn More
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="text-accent-blue" size={16} />
                    {indicator}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-dot-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Use Semantic Seeds?</h2>
            <p className="text-muted-foreground">
              Transform random seed phrases into meaningful sentences while maintaining
              the same level of security. Your brain naturally remembers stories better
              than random words.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-accent-blue/10 hover:border-accent-blue/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-accent-blue" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Example Section */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              See how we transform random words into meaningful, memorable sentences
              while maintaining BIP39 compatibility.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground">
                  Traditional BIP39 Phrase
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-muted/50 p-6 rounded-lg font-mono text-sm">
                market onion puzzle wash canvas nuclear usage scene cluster riot fancy pencil
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center">
                <ArrowRight className="w-8 h-8 rotate-90 text-accent-blue" />
              </div>
            </div>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-accent-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent-blue">
                  Semantic Seed Phrase
                  <CheckCircle2 className="text-accent-blue" size={20} />
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-accent-blue/5 p-6 rounded-lg font-medium">
                the brave warrior walks toward the ancient castle when night falls down
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-indigo/10" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Seed Phrase?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate a secure, memorable seed phrase for your cryptocurrency wallet in seconds.
          </p>
          <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-accent-blue hover:bg-accent-blue/90" 
            onClick={() => navigate('/generator')}>
            Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Brain,
    title: "More Memorable",
    description: "Structured as grammatically correct sentences that your brain naturally remembers better than random words"
  },
  {
    icon: Shield,
    title: "Equally Secure",
    description: "Uses only official BIP39 words, maintaining the same cryptographic security as random phrases"
  },
  {
    icon: Lock,
    title: "Offline First",
    description: "Generate phrases on an air-gapped computer for maximum security. No internet required."
  },
  {
    icon: RefreshCcw,
    title: "Flexible Structure",
    description: "Choose from pre-built templates or create your own sentence structure with drag-and-drop simplicity"
  }
];

const trustIndicators = [
  "BIP39 Compatible",
  "Offline Generation",
  "Open Source"
];

export default LandingPage;