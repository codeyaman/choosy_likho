import type { IndustryDef } from "../types";

export const jewellery: IndustryDef = {
  key: "jewellery",
  label: "Jewellery",
  shortLabel: "Fine Jewellery",
  audience: "Women · Gifters · Luxury buyers",
  voice: "Elegant, sensory, emotionally rich",
  description:
    "Speaks like a luxury storyteller — craftsmanship, occasion and the quiet weight of pieces that outlive trends.",
  keywords: [
    "gold", "karat", "carat", "diamond", "polki", "kundan", "gram",
    "hallmark", "bis", "certif", "bridal", "necklace", "bangle", "ring",
    "earring", "platinum", "gemstone", "emerald", "ruby", "sapphire",
  ],
  broadTags: [
    "#Jewellery", "#GoldJewellery", "#Diamonds", "#LuxuryLifestyle",
    "#FineJewelry", "#JewelleryDesign", "#StyleStatement", "#ElegantStyle",
  ],
  nicheTags: [
    "#HandcraftedGold", "#BridalJewellery", "#PolkiJewellery",
    "#CertifiedDiamonds", "#JewelleryBoutique", "#IndianJewellery",
    "#DesignerJewellery", "#HeirloomPiece",
  ],
  pillars: {
    spotlight: {
      key: "spotlight",
      label: "The Piece",
      category: "Product",
      time: "11:00 AM",
      hooks: [
        "Some jewellery is worn. This is inherited in advance.",
        "2,400 minutes of handwork. You'll see it in two seconds.",
        "We almost kept this one in the vault.",
        "Say hello to the piece that gets asked about at every dinner.",
      ],
      bodies: [
        [
          "Hand-set stones, each chosen under northern daylight — the light that never flatters. Only the honest ones make the cut.",
          "From first sketch to final polish, one master artisan shepherds every piece.",
        ],
        [
          "Notice how it catches light even when you're standing perfectly still. That's not chance — that's geometry, patience, and a workshop that refuses to rush.",
          "Some pieces sparkle. This one glows.",
        ],
        [
          "Wear it with silk. Wear it with denim. Watch it rearrange the entire outfit either way.",
          "Investment dressing, distilled into a single piece.",
        ],
      ],
      closers: [
        "Comment “VAULT” for private viewing details and pricing.",
        "Available in limited number at our boutique — link in bio.",
        "Save this. Birthday hints don't drop themselves.",
      ],
      support: [
        "\nCertificate of authenticity with every piece.",
        "\nComplimentary insured shipping, worldwide.",
      ],
      visuals: [
        "Macro product photograph on black silk: the hero piece at a three-quarter angle, one precise shaft of warm light from the left igniting the stones, deep shadow everywhere else. Jewellery-editorial grade, razor focus on the clasp. Overlay in gold serif: “2,400 minutes. One piece.”",
        "Lifestyle shot: a woman's collarbone and jawline in soft window light, the necklace resting on bare skin, hair swept up. Champagne-and-ebony palette, intimate crop, zero clutter. Overlay small: “meant to be remembered.”",
        "Flat-lay on warm charcoal stone: the piece beside its hand-drawn design sketch and the artisan's setting tools — the story told in one frame, museum-catalogue lighting. Overlay: “From sketch to skin.”",
      ],
      tags: [
        "#FineJewellery", "#LuxuryJewellery", "#HandcraftedJewellery",
        "#StatementPiece", "#Heirloom", "#JewelleryLover",
      ],
    },
    craft: {
      key: "craft",
      label: "The Atelier",
      category: "Craft",
      time: "12:00 PM",
      hooks: [
        "The steadiest hands in the building. Sixty years of them.",
        "Meet the people your jewellery trusts.",
        "This is what “handmade” actually means.",
        "Before the shine, seventy-two quiet steps.",
      ],
      bodies: [
        [
          "Our senior setter has placed over a hundred thousand stones. He still checks each one three times — loupe, breath, steadiness.",
          "Machines are fast. We prefer right.",
        ],
        [
          "Every design passes through seventy-two steps before it earns the hallmark. Sketch, wax, cast, set, polish, and a final inspection under unforgiving light.",
          "If a piece doesn't move us, it never reaches you.",
        ],
        [
          "The techniques in this workshop were old when the building was new — passed bench to bench, hand to hand, generation to generation.",
          "You can't download this kind of knowledge.",
        ],
      ],
      closers: [
        "Book an atelier visit — watch a piece being born.",
        "Ask us anything about craftsmanship in the comments.",
        "Share this with someone who notices the details.",
      ],
      support: [
        "\nHallmarked. Certified. Guaranteed for life.",
        "\nEvery artisan's initials archived with the piece.",
      ],
      visuals: [
        "Documentary photograph of a master artisan's hands at the workbench — magnifier visor, tweezers holding a stone mid-setting, warm tungsten desk light against deep workshop shadow. Gritty-elegant, respectful. Overlay in gold serif: “Check. Check. Check again.”",
        "Black-and-white crop: weathered hands holding finished jewellery that gleams impossibly bright — the texture of skin against the perfection of metal. Overlay: “The hands behind the hallmark.”",
        "Macro of a goldsmith's torch flame annealing metal, sparks frozen against deep blacks. Dramatic, elemental. Overlay in lowercase: “seventy-two quiet steps.”",
      ],
      tags: [
        "#JewelleryMaking", "#ArtisanCraft", "#MadeByHand",
        "#AtelierLife", "#Craftsmanship", "#Goldsmith",
      ],
    },
    educational: {
      key: "educational",
      label: "The Connoisseur",
      category: "Educational",
      time: "10:00 AM",
      hooks: [
        "How to tell real craftsmanship from a convincing imitation.",
        "A diamond certificate? Read these three lines first.",
        "Gold karat, decoded in thirty seconds.",
        "What nobody tells you before your first fine jewellery purchase.",
      ],
      bodies: [
        [
          "Turn the piece over. Fine jewellery is finished on the inside too — no rough edges, no shortcuts hidden from view.",
          "Then weigh it in your palm. Real substance has a quiet, particular confidence.",
        ],
        [
          "18K or 22K? 18K holds stones more securely; 22K carries deeper colour and tradition. Neither is wrong — your lifestyle decides.",
          "And always read the hallmark. Four tiny symbols that say everything.",
        ],
        [
          "A grading certificate is only as strong as its issuing lab. Look for the name before the numbers — reputable labs, legible inscriptions.",
          "And if a price feels impossible, it usually is.",
        ],
      ],
      closers: [
        "Save this for your next visit — and send it to someone about to buy their first piece.",
        "Comment “GUIDE” for our full connoisseur's checklist.",
        "Follow for a new note from the vault every week.",
      ],
      support: [
        "\nPart of our Buy Once, Buy Well series.",
        "\nOur gemologists answer every question personally.",
      ],
      visuals: [
        "Elegant macro still-life: a ring turned upside down on velvet, revealing immaculate inner finishing, a jeweller's loupe resting beside it. Dark scholarly palette with gold accents. Overlay in refined serif: “Turn it over.”",
        "Educational editorial graphic on matte black: enlarged hallmark symbols rendered in delicate gold line-work with thin serif annotations, museum-label aesthetic. Headline: “Four symbols that say everything.”",
        "Photograph of a certificate, a wax seal and a piece under a jeweller's lamp — chiaroscuro lighting, cinematic stillness. Overlay: “Read the lab before the numbers.”",
      ],
      tags: [
        "#JewelleryGuide", "#DiamondEducation", "#GoldJewellery",
        "#BuySmart", "#JewelleryTips", "#Connoisseur",
      ],
    },
    lifestyle: {
      key: "lifestyle",
      label: "Moments in Gold",
      category: "Emotional",
      time: "7:30 PM",
      hooks: [
        "She wore her mother's bangles. They fit perfectly.",
        "Some heirlooms remember the weddings better than we do.",
        "The gift that made her call her grandmother.",
        "Fifty years of anniversaries live in this one bracelet.",
      ],
      bodies: [
        [
          "Jewellery is memory, cast in metal. The earrings from a first salary. The ring that witnessed the question. The pendant that never leaves her collarbone.",
          "We don't make accessories. We make future evidence of love.",
        ],
        [
          "There's a version of this piece in every family's story — polished once a year, spoken of often, fought over gently.",
          "Give the next generation something worth inheriting.",
        ],
        [
          "Watch a bride's hands during the ceremony. The jewellery steadies her. It has steadied brides for a thousand years.",
          "Certain traditions endure because they carry weight — literally and otherwise.",
        ],
      ],
      closers: [
        "Tag someone whose story deserves to be cast in gold.",
        "Begin your family's next heirloom — link in bio.",
        "Save this for the moment that deserves more than flowers.",
      ],
      support: [
        "\nEngraving available — dates, initials, secret messages.",
        "\nEvery piece arrives gift-ready, wrapped for the moment.",
      ],
      visuals: [
        "Emotional photograph: a grandmother's wrinkled hand and a young bride's hand, both wearing matching bangles, interlaced. Warm candlelight tones, shallow focus, wedding-morning softness. Overlay in script serif: “Some bonds are cast in gold.”",
        "Still-life: an open vintage jewellery box with pieces layered across generations — a 1960s brooch beside a modern ring — arranged on lace. Nostalgic warm grade. Overlay: “Evidence of love.”",
        "Close photograph of a bride mid-ceremony, hands folded, henna and gold bangles catching low light. Documentary intimacy, rich reds and golds. Overlay in lowercase: “the weight of every blessing.”",
      ],
      tags: [
        "#HeirloomJewellery", "#FamilyTradition", "#LoveInGold",
        "#WeddingJewellery", "#BridalGold", "#SentimentalValue",
      ],
    },
    occasion: {
      key: "occasion",
      label: "The Occasion",
      category: "Occasion",
      time: "8:00 PM",
      hooks: [
        "Anniversary loading. Flowers are lovely. Gold is forever.",
        "Proposal season has officially opened.",
        "Festive gifting, solved in one velvet box.",
        "She's been hinting since March. We noticed.",
      ],
      bodies: [
        [
          "A decade deserves more than dinner. Mark the year with something she'll still be wearing at the silver jubilee — and the golden one after that.",
          "Time flies. Gold doesn't.",
        ],
        [
          "The right piece this season isn't the biggest — it's the most her. Our stylists read hints beautifully.",
          "Come in with a photo of her jewellery box. Leave with the perfect answer.",
        ],
        [
          "Festivals are the year's golden commas — pauses that sparkle. Diyas at the door, silk on shoulders, and one new piece that makes the whole family lean in.",
          "Tradition says buy gold. We say make it unforgettable.",
        ],
      ],
      closers: [
        "Message us the occasion and budget — we'll curate three options within the day.",
        "Festive appointments now open. Comment “GIFT” to reserve a private viewing.",
        "Send this to someone whose hint needs a little forward momentum.",
      ],
      support: [
        "\nPrivate gifting consultations, no charge.",
        "\nDiscreet delivery available — the surprise stays safe.",
      ],
      visuals: [
        "Luxe still-life: a deep-green velvet box opened to reveal the piece, ribbon mid-curl beside it, scattered marigold petals on dark stone. Cinematic warm spotlight from above. Overlay in gold serif: “One box. Forever sorted.”",
        "Photograph of a couple at candlelit dinner, her hand touching a new earring mid-surprised-smile, warm bokeh behind. Editorial romance. Overlay: “the hint was received.”",
        "Festive flat-lay: the piece among diyas, silk folds and a handwritten gift note, rich jewel-toned palette. Overlay: “Tradition says buy gold. Make it unforgettable.”",
      ],
      tags: [
        "#AnniversaryGift", "#FestiveGifting", "#ProposalReady",
        "#GiftOfGold", "#OccasionJewellery", "#PerfectGift",
      ],
    },
    engagement: {
      key: "engagement",
      label: "Your Voice",
      category: "Engagement",
      time: "7:00 PM",
      hooks: [
        "Settle the eternal debate: gold or diamonds?",
        "One piece, worn forever. Which do you choose?",
        "Confess: what did your first piece of real jewellery mean?",
        "Bold earring people and delicate pendant people are different species. Discuss.",
      ],
      bodies: [
        [
          "Team Gold loves tradition with weight. Team Diamonds loves light that argues back. Both are welcome here — but only one wins today.",
          "Defend your side in the comments.",
        ],
        [
          "Desert-island rules: a single piece of jewellery for the rest of your life. The statement earrings? The everyday ring? The bracelet that never comes off?",
          "Choose wisely. Permanence is the whole point.",
        ],
        [
          "Every piece in our archive started with someone's story. Tell us yours — the first piece, who gave it, what it meant.",
          "The best stories get featured. One may even be immortalised in a design.",
        ],
      ],
      closers: [
        "Vote below. We're tallying, officially.",
        "Best story gets pinned — and a little surprise in the DMs.",
        "Tag the friend who'd fight you over this.",
      ],
      support: [
        "\nOur designers read every single comment.",
        "\nPoll results revealed Friday in stories.",
      ],
      visuals: [
        "Bold split graphic: left half molten-gold texture, right half macro diamond sparkle on black, “OR” in a gold circle at the centre. Overlay in oversized serif: “Pick a side.” Campaign energy.",
        "Minimal gallery photograph: one solitary ring on a plinth of black stone under a single spotlight, infinite dark background. Overlay: “One piece. Forever. Choose.”",
        "Scrapbook-luxe collage: three polaroid-framed hands wearing different pieces, handwritten captions in the borders, warm and human. Overlay: “Every piece starts with a story.”",
      ],
      tags: [
        "#JewelleryDebate", "#GoldVsDiamonds", "#JewelleryStories",
        "#StylePoll", "#FashionTalk", "#YourChoice",
      ],
    },
    value: {
      key: "value",
      label: "The Investment",
      category: "Value",
      time: "6:30 PM",
      hooks: [
        "The only beautiful thing in your portfolio.",
        "Gold has outlived every trend since 3000 BC.",
        "Wear it for thirty years. Then pass it on, worth more.",
        "Some assets appreciate. Ours also accessorise.",
      ],
      bodies: [
        [
          "Fine jewellery holds a rare position in the asset world: it delights you daily and quietly retains its worth across decades.",
          "Few purchases carry you through life this gracefully.",
        ],
        [
          "Gold prices tell the same story to every generation — upward, onward, unbothered.",
          "Our grandmothers understood portfolio diversification before it had a name.",
        ],
        [
          "A certified piece from an established house is wearable wealth: liquid, lasting, and considerably more enjoyable than a deposit certificate.",
          "Ask our consultants about certification and buy-back assurance.",
        ],
      ],
      closers: [
        "Comment “VALUE” for our guide to buying gold wisely.",
        "Speak to our consultants about pieces that hold their worth — link in bio.",
        "Share this with the practical romantic in your life.",
      ],
      support: [
        "\nTransparent pricing. Published rates. Always.",
        "\nBuy-back and exchange policies, in writing.",
      ],
      visuals: [
        "High-concept still-life: the piece resting on a small antique brass scale, balanced against a stack of gold coins, dark background, single dramatic light. Overlay in gold serif: “Wears beautifully. Weighs in your favour.”",
        "Macro of gold granules mid-pour into a crucible, liquid-fire tones against matte black. Elemental, precious. Overlay: “Since 3000 BC. Still undefeated.”",
        "Photograph of a ledger book with elegant handwritten entries, a gold bangle resting on the open page like a bookmark. Scholarly luxury. Overlay: “the family ledger never lies.”",
      ],
      tags: [
        "#GoldInvestment", "#WearableWealth", "#SmartLuxury",
        "#InvestmentJewellery", "#GoldPrice", "#AssetClass",
      ],
    },
    sensory: {
      key: "sensory",
      label: "The Feel of Fine",
      category: "Sensory",
      time: "6:00 PM",
      hooks: [
        "Real gold has a temperature. You'll feel it in one second.",
        "Listen: that's the sound of a perfectly weighted bangle.",
        "Close your eyes. Fine jewellery announces itself on the skin.",
        "The weight, the warmth, the whisper of a quality clasp.",
      ],
      bodies: [
        [
          "Solid gold sits on the skin with a calm, even warmth — plated things feel hollow the moment you compare.",
          "Your skin is the best appraiser you own.",
        ],
        [
          "A masterfully finished piece has no sharp thoughts. Every edge softened, every joint invisible, every surface like still water.",
          "Run it along the inside of your wrist. That smoothness took four hours of polishing.",
        ],
        [
          "There's a particular click when a fine clasp closes — crisp, certain, final. Jewellers call it “the handshake.”",
          "Once you've heard it, everything else sounds like an apology.",
        ],
      ],
      closers: [
        "Visit the boutique. Your wrist will understand in five seconds.",
        "Book a private trying session — link in bio.",
        "Tell us: which piece first made you understand quality?",
      ],
      support: [
        "\nTry before you decide. Always encouraged.",
        "\nEvery boutique visit includes a connoisseur's walkthrough.",
      ],
      visuals: [
        "Intimate macro: a bangle mid-slide onto a wrist, skin texture and gold surface equally crisp, a single warm light raking across. Sensuous, tactile, editorial. Overlay in whisper-serif: “Feel the difference.”",
        "Extreme close-up of a precision clasp mid-close, warm gold bokeh behind. Mechanical elegance. Overlay: “the handshake of a fine clasp.”",
        "Photograph of a woman's hand resting on dark silk, a ring catching one blade of light, shadows deep and velvety — old-master painting palette. Overlay in lowercase: “gold has a temperature.”",
      ],
      tags: [
        "#LuxuryDetails", "#FineCraftsmanship", "#SolidGold",
        "#SensoryLuxury", "#QualityMatters", "#TactileLuxury",
      ],
    },
  },
};
