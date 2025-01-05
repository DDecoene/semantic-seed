import { Github, Library, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const version = import.meta.env.VITE_APP_VERSION || "dev";

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Semantic Seed v{version}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/ddecoene/semantic-seed"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Github size={16} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/ddecoene/semantic-seed/wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Library size={16} />
                <span className="hidden sm:inline">Docs</span>
              </a>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://ko-fi.com/ddecoene"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2 text-orange-500 hover:text-orange-600"
              >
                <Coffee size={16} />
                <span className="hidden sm:inline">Buy me a coffee</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;