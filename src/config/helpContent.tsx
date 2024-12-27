export const helpContent = {
  category: {
    title: "Category Selection",
    content: (
      <div>
        <p className="mb-2">Choose from different word categories to build your BIP39 seed phrase structure:</p>
        <ul className="space-y-1">
          <li>• <strong>Article:</strong> Basic determiners (a, the, this)</li>
          <li>• <strong>Adjective:</strong> Descriptive words from the BIP39 list</li>
          <li>• <strong>Person:</strong> Words describing people or roles</li>
          <li>• <strong>Action:</strong> Verbs from the BIP39 wordlist</li>
          <li>• <strong>Direction:</strong> Spatial words and prepositions</li>
          <li>• <strong>Place:</strong> Locations and environments</li>
          <li>• <strong>Time Word:</strong> Temporal expressions</li>
          <li>• <strong>Conjunction:</strong> Words that connect phrases</li>
        </ul>
      </div>
    )
  },
  template: {
    title: "Template Selection",
    content: (
      <div>
        <p className="mb-2">Choose from pre-built sentence structures:</p>
        <ul className="space-y-1">
          <li>• 12-word templates for standard wallets</li>
          <li>• 24-word templates for enhanced security</li>
          <li>• Each template creates grammatically correct sentences</li>
          <li>• Templates ensure proper word category placement</li>
        </ul>
      </div>
    )
  },
  structure: {
    title: "Sentence Structure",
    content: (
      <div>
        <p className="mb-2">Build and modify your sentence structure:</p>
        <ul className="space-y-1">
          <li>• Drag and drop categories to reorder</li>
          <li>• Click X to remove individual categories</li>
          <li>• Clear All to start over</li>
          <li>• Generate creates a random sentence using your structure</li>
          <li>• All words are valid BIP39 seed words</li>
        </ul>
      </div>
    )
  },
  validator: {
    title: "Sentence Validator",
    content: (
      <div>
        <p className="mb-2">Verify BIP39 compatibility:</p>
        <ul className="space-y-1">
          <li>• Enter any sentence to check if words are valid</li>
          <li>• Validates against official BIP39 wordlist</li>
          <li>• Highlights invalid words</li>
          <li>• Use for checking existing seed phrases</li>
        </ul>
      </div>
    )
  },
  generated: {
    title: "Generated Sentence",
    content: (
      <div>
        <p className="mb-2">View and validate your generated BIP39 sentence:</p>
        <ul className="space-y-1">
          <li>• Each word is randomly selected from its category</li>
          <li>• All words are from the official BIP39 wordlist</li>
          <li>• Click Validate to check the entire sentence</li>
          <li>• Generate new sentences until you find one you like</li>
          <li>• Use for cryptocurrency wallet seed phrases</li>
        </ul>
      </div>
    )
  }
};