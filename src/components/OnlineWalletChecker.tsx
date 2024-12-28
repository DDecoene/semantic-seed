import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import {
  BitcoinAddressChecker,
  WalletCheckResult,
} from "@/lib/BitcoinAddressChecker";
import WordListManager from "@/lib/WordListManager";
import { useState } from "react";

interface OnlineWalletCheckerProps {
  sentence: string;
}

const OnlineWalletChecker = ({ sentence }: OnlineWalletCheckerProps) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WalletCheckResult | null>(null);
  const [wordListManager] = useState(() => WordListManager.getInstance());

  const handleCheck = async () => {
    setChecking(true);
    setError(null);
    setResult(null);

    // First validate the sentence
    const validation = wordListManager.validateMnemonic(sentence);
    if (!validation.isValid) {
      setError(
        validation.message +
          (validation.invalidWords.length > 0
            ? "\nInvalid words: " + validation.invalidWords.join(", ")
            : "")
      );
      setChecking(false);
      return;
    }

    try {
      const result = await BitcoinAddressChecker.checkSeedPhrase(sentence);
      setResult(result);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to check wallet status. Please try again later.";
      setError(errorMessage);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <CardTitle>
          <SectionHeader
            title="Online Wallet Checker"
            helpKey="walletChecker"
          />
        </CardTitle>
        <div className="flex flex-col gap-6 mt-6">
          {/* Display the sentence being checked */}
          <Card className="bg-muted/50">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Checking phrase:
              </p>
              <p className="bg-background rounded-md p-3 text-sm break-all font-mono">
                {sentence}
              </p>
            </CardContent>
          </Card>

          {!acknowledged ? (
            <Alert variant="destructive">
              <AlertTitle className="flex items-center gap-2 mb-2">
                ⚠️ Security Warning
              </AlertTitle>
              <AlertDescription className="space-y-4">
                <p>
                  This feature will connect to public Bitcoin nodes to check
                  wallet usage. This violates the air-gapped security principle
                  of this application.
                </p>
                <ul className="list-disc pl-4 space-y-2">
                  <li>
                    Your IP address will be exposed to the Bitcoin network
                  </li>
                  <li>
                    Your seed phrase derived addresses will be linkable to your
                    IP
                  </li>
                  <li>
                    Network requests could potentially leak sensitive
                    information
                  </li>
                  <li>
                    For maximum security, seed phrases should be generated
                    offline
                  </li>
                </ul>
                <div className="pt-2">
                  <Button
                    variant="destructive"
                    className="gap-2"
                    onClick={() => setAcknowledged(true)}
                  >
                    <ExternalLink className="w-4 h-4" />I understand the risks,
                    proceed anyway
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="whitespace-pre-line">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {result && (
                <Alert variant={result.used ? "destructive" : "default"}>
                  <AlertTitle>
                    {result.used ? "Wallet Already Used" : "No Usage Found"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.used
                      ? "This wallet appears to have been used before. Consider generating a new seed phrase."
                      : "No previous usage detected for this wallet on the public blockchain."}
                    {result.address && (
                      <div className="mt-2">
                        <p className="font-medium">Generated Address:</p>
                        <p className="text-sm break-all font-mono flex items-center gap-2">
                          <a
                            href={`https://www.blockchain.com/explorer/addresses/btc/${result.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-blue hover:underline inline-flex items-center gap-1"
                          >
                            {result.address}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  onClick={handleCheck}
                  disabled={checking}
                  className="gap-2"
                >
                  {checking && <Loader2 className="w-4 h-4 animate-spin" />}
                  {checking ? "Checking Blockchain..." : "Check Wallet Usage"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAcknowledged(false)}
                  disabled={checking}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineWalletChecker;
