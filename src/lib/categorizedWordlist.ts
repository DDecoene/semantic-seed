const categorizedBIP39 = {
    // Core sentence components
    determiners: [
      "a", "an", "the", "this", "that", "these", "those", "any", "all"
    ],
    
    adjectives: {
      descriptive: [
        "ancient", "basic", "big", "black", "blue", "bright", "broad", "brown", 
        "clean", "clear", "close", "cold", "dark", "deep", "empty", "entire", 
        "extra", "fair", "fast", "fine", "firm", "flat", "fresh", "full", 
        "gentle", "good", "great", "green", "grey", "hard", "heavy", "high", 
        "hollow", "hot", "huge", "large", "left", "light", "little", "long", 
        "loud", "low", "main", "narrow", "new", "nice", "normal", "old", "open", 
        "outer", "pink", "plain", "quick", "quiet", "rare", "raw", "red", "rich", 
        "right", "rough", "round", "sharp", "short", "silent", "simple", "small", 
        "smooth", "soft", "solid", "spare", "square", "steady", "steep", "still", 
        "straight", "strange", "strong", "sweet", "swift", "tall", "thick", "thin", 
        "tight", "tiny", "tired", "tough", "true", "weak", "wet", "white", "whole", 
        "wide", "wild", "yellow", "young"
      ],
      quality: [
        "able", "actual", "average", "aware", "awesome", "careful", "classic", 
        "clever", "common", "correct", "curious", "different", "difficult", "early",
        "easy", "exact", "famous", "favorite", "final", "first", "general", 
        "genius", "giant", "happy", "hidden", "humble", "ideal", "inner", "junior", 
        "lazy", "lucky", "magic", "maximum", "minimum", "modern", "moral", "mutual",
        "natural", "negative", "nervous", "neutral", "notable", "perfect", "popular",
        "positive", "possible", "primary", "private", "proud", "pure", "rare", 
        "ready", "real", "regular", "royal", "senior", "serious", "simple", 
        "single", "special", "stable", "super", "sure", "useful", "valid", "vital",
        "weird", "worthy"
      ]
    },
  
    nouns: {
      people: [
        "actor", "adult", "agent", "artist", "athlete", "aunt", "author", "baby",
        "boy", "brother", "captain", "chef", "child", "citizen", "daughter", 
        "doctor", "enemy", "expert", "father", "friend", "genius", "girl", "guard",
        "guide", "hero", "human", "husband", "judge", "king", "lady", "leader",
        "master", "mother", "nurse", "parent", "people", "person", "pilot",
        "pioneer", "police", "prince", "princess", "queen", "rebel", "sister",
        "soldier", "spirit", "student", "teacher", "uncle", "warrior", "wife",
        "woman", "worker", "writer", "youth"
      ],
      places: [
        "airport", "arena", "beach", "bridge", "building", "castle", "cave", 
        "church", "city", "clinic", "coast", "country", "court", "desert", 
        "earth", "factory", "field", "forest", "garden", "gate", "harbor", 
        "heaven", "hill", "home", "hospital", "hotel", "house", "island", 
        "jungle", "lake", "land", "library", "market", "meadow", "mountain", 
        "museum", "ocean", "office", "palace", "park", "planet", "pond", "port", 
        "river", "road", "school", "sea", "shop", "shore", "space", "stadium", 
        "station", "street", "temple", "theater", "tower", "town", "valley", 
        "village"
      ],
      objects: [
        "album", "anchor", "apple", "arrow", "bag", "ball", "barrel", "basket",
        "belt", "blade", "blanket", "bone", "book", "bottle", "box", "branch",
        "bread", "bridge", "brush", "bubble", "bucket", "camera", "card", "carpet",
        "chain", "chair", "clock", "cloud", "coin", "computer", "crack", "cup",
        "desk", "diamond", "door", "drum", "echo", "engine", "fence", "finger",
        "flag", "flame", "flower", "foam", "fork", "frame", "fuel", "glass",
        "glove", "hammer", "hat", "heart", "key", "knife", "lamp", "leaf",
        "letter", "lock", "machine", "mask", "metal", "mirror", "needle", "net",
        "paper", "pen", "pencil", "phone", "piano", "picture", "pillow", "pipe",
        "pistol", "plate", "prize", "radio", "ring", "rocket", "rope", "rubber",
        "shield", "shoe", "spoon", "stamp", "star", "stick", "stone", "stove",
        "sword", "table", "ticket", "tool", "tooth", "torch", "train", "tree",
        "truck", "tube", "umbrella", "wall", "watch", "weapon", "wheel", "window",
        "wing", "wire"
      ]
    },
  
    verbs: {
      action: [
        "abandon", "absorb", "abuse", "access", "achieve", "act", "adapt", "add",
        "adjust", "admire", "admit", "adopt", "advance", "afford", "agree", "aim",
        "alert", "allow", "alter", "analyze", "announce", "appear", "apply",
        "approve", "argue", "arrange", "arrest", "arrive", "ask", "assist",
        "attack", "attend", "attract", "avoid", "base", "battle", "beam", "beat",
        "become", "beg", "begin", "behave", "bend", "bet", "bind", "bite", "blame",
        "blast", "blend", "bless", "blind", "blink", "blush", "boost", "borrow",
        "bounce", "bow", "box", "breach", "break", "breathe", "breed", "bring",
        "brush", "build", "bump", "burn", "burst", "buy", "buzz", "calculate",
        "call", "calm", "camp", "cancel", "capture", "care", "carry", "carve",
        "catch", "cause", "cease", "celebrate", "change", "charge", "chase",
        "check", "cheer", "chew", "choose", "claim", "clap", "clean", "clear",
        "click", "climb", "clip", "close", "coach", "collect", "combine",
        "comfort", "command", "commit", "compare", "compete", "complain",
        "complete", "compose", "compute", "conceal", "concern", "confirm",
        "connect", "consider", "consist", "contain", "continue", "convert", "copy",
        "correct", "count", "cover", "crack", "crash", "crawl", "create", "cross",
        "crush", "cry", "cure", "curl", "curve", "cut", "dance", "dare", "dash",
        "deal", "decay", "decide", "decode", "decorate", "decrease", "dedicate",
        "delay", "deliver", "demand", "deny", "depend", "describe", "desert",
        "deserve", "destroy", "detect", "develop", "devise", "dial", "dig",
        "dinner", "dip", "direct", "discover", "display", "dive", "divide", "do",
        "double", "doubt", "drag", "drain", "draw", "dream", "dress", "drift",
        "drill", "drink", "drip", "drive", "drop", "drum", "dry", "duck", "earn",
        "eat", "echo", "edit", "educate", "eject", "elect", "elevate", "emerge",
        "employ", "enable", "enact", "end", "endure", "enforce", "engage",
        "enhance", "enjoy", "enter", "escape", "evolve", "exact", "excite",
        "excuse", "execute", "exercise", "exist", "expand", "expect", "expire",
        "explain", "expose", "extend", "face", "fade", "fail", "fall", "fancy",
        "farm", "fashion", "fasten", "fight", "fill", "film", "find", "finish",
        "fire", "fit", "fix", "flash", "flee", "float", "flood", "flow", "fly",
        "fold", "follow", "force", "forget", "form", "found", "frame", "freeze",
        "frown", "gain", "game", "garden", "gather",       "gaze", "generate", "get", "give", "glance", "glow", "grab", "grant",
        "greet", "grind", "grip", "grow", "guard", "guess", "guide", "hammer",
        "hand", "handle", "hang", "happen", "harvest", "hate", "heal", "hear",
        "heat", "help", "hide", "hit", "hold", "hope", "hunt", "hurry", "hurt",
        "identify", "ignore", "imagine", "imitate", "impact", "impose", "improve",
        "include", "increase", "indicate", "infect", "inflict", "inform", "inject",
        "injure", "insert", "inspect", "inspire", "install", "intend", "invest",
        "invite", "involve", "iron", "issue", "join", "joke", "judge", "jump",
        "keep", "kick", "kill", "kiss", "knock", "know", "label", "laugh", "launch",
        "lay", "lead", "lean", "learn", "leave", "lend", "let", "level", "lift",
        "light", "like", "limit", "link", "list", "listen", "live", "load", "lock",
        "look", "lose", "love", "maintain", "make", "manage", "march", "mark",
        "match", "mean", "measure", "meet", "melt", "merge", "mix", "modify",
        "monitor", "move", "name", "need", "note", "notice", "obey", "observe",
        "obtain", "occur", "offer", "open", "operate", "order", "organize", "own",
        "pack", "paint", "park", "part", "pass", "pause", "pay", "peel", "perform",
        "permit", "phone", "pick", "pierce", "place", "plan", "plant", "play",
        "please", "plug", "point", "possess", "post", "pour", "practice", "praise",
        "pray", "preach", "predict", "prefer", "prepare", "present", "preserve",
        "press", "prevent", "print", "process", "produce", "program", "project",
        "promise", "promote", "protect", "provide", "pull", "punch", "push", "put",
        "question", "race", "raise", "reach", "read", "realize", "recall",
        "receive", "recognize", "record", "reduce", "reflect", "refuse", "regret",
        "release", "relieve", "remain", "remember", "remind", "remove", "render",
        "repair", "repeat", "replace", "reply", "report", "require", "rescue",
        "resist", "resolve", "respond", "restore", "retain", "retire", "return",
        "reveal", "review", "reward", "ride", "ring", "rise", "risk", "roll",
        "rule", "run", "rush", "save", "say", "scan", "scatter", "schedule",
        "score", "scratch", "scream", "search", "see", "seek", "select", "sell",
        "send", "sense", "separate", "serve", "set", "settle", "sew", "shake",
        "shape", "share", "shield", "shine", "shoot", "shop", "show", "shrink",
        "shrug", "shut", "sign", "signal", "sing", "sit", "sketch", "sleep",
        "slide", "slip", "smell", "smile", "smoke", "solve", "sort", "sound",
        "speak", "spell", "spend", "spill", "spin", "split", "spoil", "spread",
        "spring", "squeeze", "stand", "stare", "start", "state", "stay", "steal",
        "step", "stick", "stir", "stop", "store", "strike", "struggle", "study",
        "stuff", "stumble", "submit", "succeed", "suffer", "suggest", "suit",
        "supply", "support", "suppose", "surprise", "surround", "survive",
        "suspect", "swap", "swim", "swing", "switch", "talk", "tap", "taste",
        "teach", "tear", "tell", "test", "thank", "think", "throw", "tick", "tie",
        "tip", "touch", "trace", "trade", "train", "transfer", "transform",
        "translate", "transport", "trap", "travel", "treat", "trick", "trim",
        "trip", "trust", "try", "turn", "twist", "type", "unite", "unlock",
        "update", "upgrade", "urge", "use", "vanish", "verify", "view", "visit",
        "vote", "wait", "wake", "walk", "wander", "want", "warn", "wash", "waste",
        "watch", "wave", "wear", "weigh", "welcome", "whip", "whisper", "win",
        "wish", "witness", "work", "worry", "wrap", "write", "yell"
      ]
    },
    
    "timeWords": [
      "april", "august", "december", "february", "march", "october", "dawn",
      "morning", "night", "midnight", "today", "tomorrow", "tonight", "early",
      "soon", "later", "often", "never", "now", "always", "forever"
    ],
    
    "conjunctions": [
      "after", "before", "between", "since", "until", "when", "while", "with"
    ],
    
    "directions": [
      "above", "across", "ahead", "around", "behind", "below", "beneath",
      "between", "beyond", "down", "east", "far", "forth", "forward", "here",
      "high", "in", "inside", "into", "near", "north", "out", "outside", "over",
      "south", "through", "toward", "under", "up", "west", "within"
    ]
  };
  
  export default categorizedBIP39;