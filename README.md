# BIP39 Semantic Seed Phrase Generator

A secure, offline-first application that generates memorable BIP39 seed phrases by creating grammatically correct sentences. This tool helps users create cryptographically valid seed phrases that are easier to memorize while maintaining the highest security standards.

## 🔑 Key Features

- **🔒 Air-gapped Security**: Designed to run completely offline for maximum security when generating seed phrases
- **📝 Semantic Sentence Construction**: Creates meaningful, grammatically correct sentences using BIP39 words
- **🎯 Interactive Builder**: Drag-and-drop interface for customizing sentence structure
- **✨ Smart Templates**: Pre-built templates for both 12-word and 24-word seed phrases
- **✅ BIP39 Validation**: Real-time validation ensures all generated phrases are valid BIP39 mnemonics
- **🏗️ Flexible Structure**: Choose from categories like articles, adjectives, persons, actions, etc.
- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🛡️ Security Considerations

- **Always Run Offline**: Generate seed phrases only on an air-gapped computer
- **Never Online**: Do not enter or generate seed phrases on internet-connected devices
- **Verify Words**: All generated words are validated against the official BIP39 wordlist
- **No Storage**: Phrases are never stored or transmitted - everything happens in memory

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/bip39-semantic-seed
cd bip39-semantic-seed
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

### Building for Production

```bash
yarn build
```

The built application can be served from any static file server or opened directly in a browser on an air-gapped system.

## 💡 Usage

1. **Select a Template** (Optional)
   - Choose from pre-built 12-word or 24-word sentence structures
   - Templates ensure grammatically correct and memorable phrases

2. **Build Your Structure**
   - Add word categories (articles, adjectives, nouns, etc.)
   - Drag and drop to rearrange the structure
   - Clear or modify as needed

3. **Generate Sentence**
   - Click "Generate Sentence" to create a new phrase
   - Each word is randomly selected from the appropriate category
   - All words are guaranteed to be from the BIP39 wordlist

4. **Validate Existing Phrases**
   - Use the validator to check if your existing phrases use valid BIP39 words
   - Get immediate feedback on invalid words

## 🧑‍💻 Development

### Project Structure
```
src/
  ├── components/         # React components
  ├── lib/               # Core functionality
  │   ├── WordListManager.ts    # Word list management
  │   └── utils.ts             # Utility functions
  └── data/              # BIP39 wordlists and categories
```

### Built With

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Vite

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is provided for educational purposes and should be used responsibly. Always verify the security of your seed phrases and follow best practices for cryptocurrency wallet management.

---

⭐️ Star this repository if you find it helpful!