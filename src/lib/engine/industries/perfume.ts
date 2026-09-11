import type { IndustryDef } from "../types";

export const perfume: IndustryDef = {
  key: "perfume",
  label: "Perfume",
  shortLabel: "Fragrance",
  audience: "Style-conscious individuals · Fragrance enthusiasts",
  voice: "Evocative, intimate, sophisticated",
  description:
    "Speaks like a fragrance poet — notes, mood and memory, written in top, heart and base.",
  keywords: [
    "ml", "eau de", "parfum", "note", "oud", "musk", "amber", "jasmine",
    "vanilla", "bergamot", "cedar", "saffron", "sandalwood", "vetiver",
    "concentration", "sillage", "iris", "tonka", "rose",
  ],
  broadTags: [
    "#Perfume", "#Fragrance", "#PerfumeCollection", "#LuxuryFragrance",
    "#ScentLover", "#Parfum", "#FragranceOfTheDay", "#PerfumeAddict",
  ],
  nicheTags: [
    "#NichePerfume", "#ArtisanFragrance", "#ExtraitDeParfum",
    "#FragranceCommunity", "#ScentProfile", "#PerfumeOil",
    "#LayeringScents", "#FragranceObsession",
  ],
  pillars: {
    spotlight: {
      key: "spotlight",
      label: "The Fragrance",
      category: "Product",
      time: "11:00 AM",
      hooks: [
        "It doesn't enter a room. It arrives.",
        "Three seconds on skin and the compliments start queuing.",
        "This is the scent people lean in for.",
        "Some fragrances you wear. This one you become.",
      ],
      bodies: [
        [
          "It opens with a spark — bergamot cut with something greener, almost mischievous. Ten minutes later the heart unfolds: jasmine, soft-spoken but immovable.",
          "By evening all that remains is amber and the memory of you. Which lingers considerably.",
        ],
        [
          "Two sprays at the collarbone, one at the wrist. That's the entire ritual.",
          "The dry-down stays close to skin — intimate, never loud. The kind of scent that gets discovered, not announced.",
        ],
        [
          "Built like a story in three acts: a bright opening, a romantic heart, and a base that smoulders quietly past midnight.",
          "Longevity: eight hours and counting. Sillage: politely unforgettable.",
        ],
      ],
      closers: [
        "Comment “SCENT” for a discovery sample with your next order.",
        "Full notes breakdown in our stories today. Link in bio for the bottle.",
        "Save this for your next signature-scent audition.",
      ],
      support: [
        "\nFree discovery vial with every full bottle.",
        "\nCruelty-free. Blended in small batches.",
      ],
      visuals: [
        "Studio photograph of the bottle on a smoked-glass surface, backlit with a thin amber glow, wisps of real mist curling behind. Deep plum-to-black gradient background. Overlay in an elegant thin serif: “Arrives. Never enters.”",
        "Macro shot: a single spray burst frozen mid-air above the atomiser, droplets catching gold light against darkness — high-speed photography drama. Overlay: “Three seconds to compliments.”",
        "Editorial still-life: the bottle resting on raw amethyst crystal and a curl of bergamot peel, dark slate beneath, warm side-light. Ingredient-storytelling composition. Overlay in lowercase: “a story in three acts.”",
      ],
      tags: [
        "#NewFragrance", "#SignatureScent", "#LuxuryPerfume",
        "#NicheFragrance", "#PerfumeLover", "#ScentOfTheDay",
      ],
    },
    craft: {
      key: "craft",
      label: "The Perfumer's Art",
      category: "Craft",
      time: "12:00 PM",
      hooks: [
        "Sixty-one trials. Two years. One bottle.",
        "Somewhere in Grasse, a nose just approved your next favourite.",
        "Perfume isn't made. It's composed.",
        "The most talented person in our house works in silence, blindfolded.",
      ],
      bodies: [
        [
          "A perfumer's palette holds 1,500 materials — Bulgarian rose picked at dawn to musks built molecule by molecule.",
          "The art isn't choosing the rarest. It's finding the exact drop where balance becomes beauty.",
        ],
        [
          "Our master perfumer rejected sixty versions of the heart accord before the sixty-first made her stop writing and simply smile.",
          "That accord is in the bottle. So are the two years.",
        ],
        [
          "Every batch macerates for six weeks before bottling — a step most houses quietly skip. We don't.",
          "Patience is the ingredient you can't smell directly. You just notice it.",
        ],
      ],
      closers: [
        "Ask anything about perfumery in the comments — our team answers.",
        "Discover the collection: composed, not manufactured. Link in bio.",
        "Share this with someone who thinks perfume is “just alcohol in a bottle.”",
      ],
      support: [
        "\nFormulated at a 20% parfum concentration.",
        "\nBatch numbers engraved on every bottle.",
      ],
      visuals: [
        "Cinematic photograph: rows of amber raw-material bottles on dark wooden shelves, dramatic lighting, a perfumer's organ fading into shadow. Atelier mystique. Overlay in gold serif on black: “1,500 materials. One decision.”",
        "Portrait of the perfumer mid-evaluation with a smelling strip, eyes closed, soft window light, laboratory glassware in bokeh. Contemplative documentary style. Overlay: “Trial sixty-one.”",
        "Macro of liquid perfume being pipetted into a glass vial, a golden thread frozen against deep shadow. Scientific romance. Overlay in lowercase: “composed, not manufactured.”",
      ],
      tags: [
        "#PerfumerLife", "#NichePerfumery", "#FragranceCraft",
        "#ArtOfPerfume", "#MasterPerfumer", "#HauteParfumerie",
      ],
    },
    educational: {
      key: "educational",
      label: "Notes, Decoded",
      category: "Educational",
      time: "10:00 AM",
      hooks: [
        "Top, heart, base — your perfume, explained in forty seconds.",
        "Why your perfume smells different at 6 PM. (It's supposed to.)",
        "Reading a fragrance pyramid without the marketing fog.",
        "Sillage, longevity, dry-down: the only three words that matter.",
      ],
      bodies: [
        [
          "Top notes are the opening line — bright, fleeting, gone in fifteen minutes. The heart is the real personality, emerging as you do.",
          "The base is the reputation: what remains on the scarf the next morning.",
        ],
        [
          "Perfume is a conversation with your skin, not a costume. Body chemistry rewrites every formula slightly — which is why the same scent flirts on one wrist and whispers on another.",
          "Always test on skin. Never on paper alone.",
        ],
        [
          "Sillage is the trail you leave. Longevity is how long you last. Projection is how loudly you arrive.",
          "A great fragrance balances all three — present, never pushy.",
        ],
      ],
      closers: [
        "Save this for your next counter visit — paper strips will never fool you again.",
        "Comment “NOTES” for our full fragrance vocabulary guide.",
        "Follow — a new decoding session every week.",
      ],
      support: [
        "\nPart of the Scent School series.",
        "\nQuestions welcome. Snobbery is not.",
      ],
      visuals: [
        "Infographic-as-art: the fragrance pyramid rendered as three fading ink-wash layers — citrus top, floral heart, amber base melting into black — with elegant serif annotations. Headline: “Read the pyramid.”",
        "Photograph of two wrists side by side, one testing a paper strip, one testing on skin — lab-meets-luxury styling, soft clinical light with a warm accent. Overlay: “Paper lies. Skin tells.”",
        "Still-life of ingredients arranged by dry-down stage: citrus peel fading left, jasmine blooms at centre, amber resin and vanilla pods on the right glowing warmest. A left-to-right timeline you can smell. Overlay: “From hello to midnight.”",
      ],
      tags: [
        "#FragranceNotes", "#PerfumeEducation", "#ScentSchool",
        "#FragrancePyramid", "#PerfumeTips", "#LearnPerfume",
      ],
    },
    lifestyle: {
      key: "lifestyle",
      label: "Who Wears It",
      category: "Emotional",
      time: "7:30 PM",
      hooks: [
        "For the one who leaves before the party ends — and is remembered after.",
        "This scent doesn't complete an outfit. It starts a reputation.",
        "You don't choose a signature scent. You recognise it.",
        "Worn by people who never need to introduce themselves twice.",
      ],
      bodies: [
        [
          "It's for slow mornings and deliberate entrances. For black coffee, tailored shoulders, and eye contact that means it.",
          "Not a mood — a standard.",
        ],
        [
          "There's a moment, mid-dry-down, when you catch your own wrist and think: yes, exactly.",
          "That small private pleasure is the entire point. Everyone else's compliments are just applause for a decision you already made.",
        ],
        [
          "Fragrance is the one luxury invisible from across the room — and unforgettable from across the pillow.",
          "Wear it for the people you let close.",
        ],
      ],
      closers: [
        "Is this your energy? Tell us below.",
        "Find your signature — the scent profile quiz is linked in bio.",
        "Tag someone who smells like a decision.",
      ],
      support: [
        "\nGenderless by design. Chemistry decides the rest.",
        "\nOne scent, infinite personalities.",
      ],
      visuals: [
        "Editorial fashion photograph: a figure in a dark tailored coat, collar up, mid-stride walking away down a lamp-lit street at night, slight motion blur, breath visible in cold air. Cinematic teal-and-amber grade. Overlay in thin serif: “Remembered after.”",
        "Intimate photograph: someone touching the collarbone where scent was applied, eyes closed, soft morning light, linen shirt. Sensual but restrained, film grain. Overlay in lowercase: “the scent you wear for yourself.”",
        "Moody close portrait — half-lit face, a confident slight smile, darkness swallowing the background, the bottle glinting small at the frame's edge. Overlay: “Never introduced twice.”",
      ],
      tags: [
        "#SignatureStyle", "#PerfumePersonality", "#EffortlessElegance",
        "#FragranceMood", "#ModernLuxury", "#ScentIdentity",
      ],
    },
    occasion: {
      key: "occasion",
      label: "The Occasion",
      category: "Occasion",
      time: "8:00 PM",
      hooks: [
        "Date night has a dress code. So does your skin.",
        "Wedding guest, dinner host, midnight something — there's a note for that.",
        "The evening starts before you leave the house. Spray accordingly.",
        "Gifting a fragrance is saying: I know who you are.",
      ],
      bodies: [
        [
          "First date: keep it close — skin scents, low sillage, discovery-worthy. Anniversary: bring the amber, the drama, the dry-down that lasts till breakfast.",
          "The calendar changes. Your chemistry curriculum follows.",
        ],
        [
          "Festive evenings call for oud and saffron; summer brunches for fig and neroli. Fragrance is the only accessory that can't clash — only misalign.",
          "Match the moment, then exceed it.",
        ],
        [
          "A fragrance gift says what flowers can't: I noticed. Our gift editions arrive wrapped, wax-sealed, with a handwritten note card.",
          "Some presents are opened. This one is felt.",
        ],
      ],
      closers: [
        "Tell us the occasion in the comments — we'll prescribe the scent.",
        "Gift-wrapped and ready to mean something. Link in bio.",
        "Tag your plus-one. Set the tone early.",
      ],
      support: [
        "\nComplimentary engraving on gift editions.",
        "\nThe occasion-pairing guide lives in our highlights.",
      ],
      visuals: [
        "Split-timeline editorial strip: three moments — coffee at noon in bright citrus light, dinner at eight in candlelit amber, midnight city in deep violet — with the same bottle silhouetted in each. Overlay in serif: “One bottle. Every hour.”",
        "Photograph of hands spritzing perfume over a dressing table scattered with evening accessories — a clutch, cufflinks, an invitation card. Getting-ready intimacy, warm lamp glow. Overlay: “The evening starts here.”",
        "Luxury gift still-life: the boxed fragrance with a wax seal, silk ribbon loose, a handwritten card half-visible, dark florals shadowing the frame. Overlay in script serif: “I noticed.”",
      ],
      tags: [
        "#DateNightScent", "#FragranceGifting", "#OccasionPerfume",
        "#EveningScent", "#LuxuryGifts", "#ScentPairing",
      ],
    },
    engagement: {
      key: "engagement",
      label: "Your Scent Story",
      category: "Engagement",
      time: "7:00 PM",
      hooks: [
        "Your most complimented scent — name it below.",
        "Blind sniff test: could you recognise your own signature?",
        "One fragrance for the rest of your life. Go.",
        "Unpopular opinion: the best fragrance ever made is discontinued. Prove us wrong.",
      ],
      bodies: [
        [
          "Everyone has That Bottle — the one strangers ask about in lifts and old friends remember years later.",
          "Drop the name. We're building a hall of fame.",
        ],
        [
          "Desert island, one bottle, forever. Fresh and safe? Dark and dangerous? The one you wore on the day everything changed?",
          "Rules: you must commit. Comment your final answer.",
        ],
        [
          "Scent is the strongest memory trigger known to science — one note and you're twelve again, standing in your grandfather's garden.",
          "What smell takes you back instantly?",
        ],
      ],
      closers: [
        "The most-mentioned scent gets featured this Friday.",
        "Best answer gets a discovery set in the DMs.",
        "Tag the friend whose taste you'd trust blindfolded.",
      ],
      support: [
        "\nOur perfumer reads (and gently judges) every entry.",
        "\nAnswers may be quoted in an upcoming campaign.",
      ],
      visuals: [
        "Interactive-feel editorial graphic: an empty museum pedestal under a single spotlight on black, a bottle silhouette ghosted above it. Overlay in big serif: “One bottle. Forever. What's on the pedestal?”",
        "Photograph of a laughing, blindfolded person mid-blind-test, three unmarked vials before them, friends watching — dinner-party energy, warm and candid. Overlay: “Could you recognise your own?”",
        "Memory-evocation still: a garden scene in soft focus — a jasmine vine on an old wall, late-afternoon gold. Overlay in lowercase serif: “the smell that takes you back.”",
      ],
      tags: [
        "#FragranceCommunity", "#ScentStories", "#PerfumeTalk",
        "#FragranceAddict", "#ScentMemories", "#PerfumePoll",
      ],
    },
    value: {
      key: "value",
      label: "The Investment",
      category: "Value",
      time: "6:30 PM",
      hooks: [
        "Cost per wear: less than your coffee. Lasts longer too.",
        "Cheap perfume is the most expensive thing you can spray.",
        "One ml of the good stuff outperforms ten of the other.",
        "Quality isn't expensive. Regret is.",
      ],
      bodies: [
        [
          "A 20% parfum concentration means two sprays, not six. The bottle slows down into months; the compliments don't.",
          "Do the long-term arithmetic — then decide what “expensive” means.",
        ],
        [
          "Mass-market formulas evaporate by lunch and demand reapplication by dinner. A small-batch extrait stays until you've forgotten you applied it.",
          "Buy once, wear for years, remember why.",
        ],
        [
          "A signature scent is the highest-return item in a wardrobe — worn daily, recognised instantly, costing less per impression than anything else you own.",
          "Elegance, amortised.",
        ],
      ],
      closers: [
        "Start with the discovery set — the price of a dinner, the verdict decided by your skin.",
        "Comment “SAMPLES” and we'll point you to the entry set.",
        "Share this with a friend still buying by the litre.",
      ],
      support: [
        "\nThe discovery set price is redeemable against a full bottle.",
        "\nRefills available. The bottle is forever.",
      ],
      visuals: [
        "Conceptual still-life: the bottle beside a tiny espresso cup and a receipt stub on dark marble — a wry pricing comparison rendered as luxury minimalism. Overlay in serif: “Less than coffee. Longer than lunch.”",
        "Macro of a near-empty discovery vial beside a pristine full bottle — the journey told in objects — dark background with warm rim light. Overlay: “Discovery first. Devotion later.”",
        "Photograph of an elegant wrist catching one precise spray, the mist suspended in golden light. Restrained, exact. Overlay: “Two sprays. That's the review.”",
      ],
      tags: [
        "#SmartLuxury", "#CostPerWear", "#QualityOverQuantity",
        "#InvestmentPieces", "#LuxuryValue", "#BuyLessBuyBetter",
      ],
    },
    sensory: {
      key: "sensory",
      label: "The Notes",
      category: "Sensory",
      time: "6:00 PM",
      hooks: [
        "Jasmine that smells like midnight, not like soap.",
        "First spray: a green fig crushed between fingers.",
        "There's smoke in this bottle, and honey, and a secret.",
        "Close your eyes. We'll describe what you're about to smell.",
      ],
      bodies: [
        [
          "The opening is wet green leaves after rain — then a slow bloom of night jasmine, indolic and unhurried, the real thing from the real harvest.",
          "Underneath it all: a low hum of vetiver and skin-warm musk, like a voice you recognise from another room.",
        ],
        [
          "Fig leaf first — milky, snapped-stem fresh. Then cedar shavings and a thread of incense: the interior of an old chapel at noon.",
          "The base settles into tonka and worn leather. It smells like a person with excellent secrets.",
        ],
        [
          "Imagine biting a blood orange inside a cedarwood library while someone, far away, burns vanilla.",
          "That's not poetry. That's the formula sheet.",
        ],
      ],
      closers: [
        "Order the discovery vial and test our vocabulary. Link in bio.",
        "Which note would undo you? Comment below.",
        "Save this for your next quiet evening with a testing strip.",
      ],
      support: [
        "\nFull note transparency — every material listed.",
        "\nNatural absolutes wherever it matters most.",
      ],
      visuals: [
        "Synaesthetic still-life: jasmine blossoms on wet dark slate, droplets frozen, a curl of incense smoke rising behind — deep chiaroscuro. Overlay in italic serif: “Night-blooming. Unhurried.”",
        "Macro composition of the dry-down as raw materials: a crushed fig leaf, cedar shavings, a worn leather fragment and vanilla pods arranged in a descending spiral on black linen. Overlay: “Read with your nose.”",
        "Photograph of blood-orange segments backlit like stained glass against darkness, juice vesicles visible. Almost edible. Overlay in lowercase: “the opening line.”",
      ],
      tags: [
        "#FragranceNotes", "#NicheScents", "#JasmineSambac",
        "#OudPerfume", "#ScentDescription", "#PerfumeIngredients",
      ],
    },
  },
};
