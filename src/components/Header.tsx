import { Link, useLocation } from "react-router-dom";
import { Home, Wand2, Github, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const location = useLocation();
  const version = import.meta.env.VITE_APP_VERSION || "dev";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <img
                      src="/semantic-seed/favicon.svg"
                      alt="BIP39 Logo"
                      className="w-6 h-6"
                    />
                    <div className="flex items-baseline">
                      <span className="font-semibold">Semantic Seed</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        v{version}
                      </span>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Version {version}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <nav className="hidden md:flex items-center gap-1">
              <Link to="/">
                <Button
                  variant={location.pathname === "/" ? "secondary" : "ghost"}
                  className="gap-2"
                  size="sm"
                >
                  <Home size={16} />
                  Home
                </Button>
              </Link>
              <Link to="/generator">
                <Button
                  variant={
                    location.pathname === "/generator" ? "secondary" : "ghost"
                  }
                  className="gap-2"
                  size="sm"
                >
                  <Wand2 size={16} />
                  Generator
                </Button>
              </Link>
              <a
                href="https://github.com/ddecoene/semantic-seed/wiki"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" className="gap-2" size="sm">
                  <Library size={16} />
                  <span className="hidden sm:inline">Docs</span>
                </Button>
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
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

            <Link to="/generator">
              <Button className="hidden sm:flex gap-2" size="sm">
                <Wand2 size={16} />
                Create Phrase
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
