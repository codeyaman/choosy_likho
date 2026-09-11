import type { IndustryDef } from "../types";

export const realEstate: IndustryDef = {
  key: "real-estate",
  label: "Real Estate",
  shortLabel: "Property",
  audience: "Homebuyers · Investors · NRIs",
  voice: "Authoritative, aspirational, trust-building",
  description:
    "Speaks like a premium property consultant — location advantage, investment value, design and the life that follows the keys.",
  keywords: [
    "bhk", "sq ft", "sqft", "sq.ft", "acre", "floor", "tower", "amenit",
    "clubhouse", "rera", "price", "crore", " lakh", "metro", "airport",
    "highway", "possession", "balcony", "vastu", "vaastu", "carpet area",
    "club house", "residence", "residences",
  ],
  broadTags: [
    "#RealEstate", "#Property", "#LuxuryHomes", "#RealEstateIndia",
    "#HomeBuyers", "#InvestInProperty", "#RealtyLife", "#PropertyForSale",
  ],
  nicheTags: [
    "#GatedCommunity", "#SkylineLiving", "#PremiumApartments",
    "#NewLaunch", "#RealEstateDeveloper", "#UrbanLiving",
    "#HighRiseLiving", "#PropertyInvestment",
  ],
  pillars: {
    spotlight: {
      key: "spotlight",
      label: "Project Spotlight",
      category: "Product",
      time: "11:00 AM",
      hooks: [
        "Some addresses don't need an introduction. This one earns it.",
        "The view draws you in. The floor plan closes the deal.",
        "We walked the site at 7 AM so you could preview it by lunch.",
        "Not every launch deserves your weekend. This one does.",
      ],
      bodies: [
        [
          "Light-filled living rooms, balconies that fit a chair and a conversation, and layouts designed around how families actually live.",
          "Every square foot has a job to do here — and it does it beautifully.",
        ],
        [
          "From the double-height lobby to the last hinge on the wardrobe, the detailing is deliberate.",
          "This is what happens when an architect is given time, not just a budget.",
        ],
        [
          "Corner residences, cross-ventilation in every bedroom, and a skyline that never gets old.",
          "Come for the brochure. Stay for the way the evening light hits the deck.",
        ],
      ],
      closers: [
        "Site visits open this weekend — comment “TOUR” and we'll hold a slot for you.",
        "Comment “DETAILS” for the full floor plan and price sheet.",
        "Save this post. Your future self at the sample flat will thank you.",
      ],
      support: [
        "\nPossession timelines and payment plans available on request.",
        "\nRERA-registered. Every promise in writing.",
        "\nLimited residences in the first release.",
      ],
      visuals: [
        "Exterior hero shot of the tower at golden hour, photographed from a low three-quarter angle so the façade brushes the sky. Warm bronze and slate-grey palette, soft sun flare kissing the top floor, landscaped driveway slightly blurred in the foreground. Text overlay top-left in a thin serif: “Some addresses earn it.” Brand logo bottom-right in white, small and confident.",
        "Interior wide shot of the show apartment living room at dusk — floor-to-ceiling windows, city lights glittering beyond, a styled sofa in oatmeal linen with a single brass floor lamp. Moody, editorial, architectural-magazine grade. Overlay across the lower third in elegant serif: “Designed around how you live.”",
        "Detail collage: three vertical slices — marble veining close-up, balcony railing against a sunset, and the double-height lobby chandelier. Deep charcoal background between slices. Overlay in letterspaced uppercase sans: “The details are the design.”",
      ],
      tags: [
        "#NewLaunch", "#PremiumResidences", "#PropertyShowcase",
        "#DreamHome", "#SiteVisit", "#LuxuryLiving",
      ],
    },
    craft: {
      key: "craft",
      label: "Built Right",
      category: "Trust & Craft",
      time: "12:00 PM",
      hooks: [
        "Concrete doesn't lie. Neither do we.",
        "What three decades of building teaches you.",
        "Behind the brochure: the unglamorous things that make a building great.",
        "Anyone can promise quality. Ours is poured in concrete.",
      ],
      bodies: [
        [
          "Double-checked waterproofing in every wet zone. Fire systems tested beyond compliance. Lifts from the people who build them for airports.",
          "You may never see these things. You'll feel them every day you live here.",
        ],
        [
          "Our construction partners are chosen the way you'd choose a surgeon — track record first, price second.",
          "Forty-two quality checks happen before a single floor gets its paint.",
        ],
        [
          "Three decades. Thousands of keys handed over. Zero shortcuts we couldn't sleep with.",
          "Reputation isn't built in marketing meetings. It's poured, slab by slab.",
        ],
      ],
      closers: [
        "Ask us anything about construction quality — our engineers answer, not our marketers.",
        "Book a hard-hat tour and see the bones of the building yourself.",
        "Share this with someone who asks the right questions before buying.",
      ],
      support: [
        "\nConstruction updates shared monthly, on record.",
        "\nEvery material certificate available for review.",
      ],
      visuals: [
        "Dramatic black-and-white construction photograph: exposed column reinforcement against the sky, a worker's silhouette, strong diagonal composition. One bronze-toned element — the site crane — as the only colour accent. Overlay in bold sans: “Concrete doesn't lie.”",
        "Close-up macro of a quality-check stamp on a concrete sample, clipboard with checkmarks softly blurred behind. Industrial editorial grade, shallow depth of field. Overlay: “Check 42 of 42.”",
        "Portrait of a veteran site engineer in a hard hat, arms crossed, slight smile, scaffolding bokeh behind — honest documentary style in warm monochrome with a bronze accent. Overlay in serif: “Track record first.”",
      ],
      tags: [
        "#ConstructionQuality", "#TrustedBuilder", "#BuiltToLast",
        "#EngineeringExcellence", "#QualityFirst", "#BehindTheBuild",
      ],
    },
    educational: {
      key: "educational",
      label: "Buyer's Guide",
      category: "Educational",
      time: "10:00 AM",
      hooks: [
        "Before you book a site visit, read this twice.",
        "Five things a checklist won't tell you — but your banker will.",
        "The 10-minute rule that predicts a good neighbourhood.",
        "First home? These mistakes are expensive — and entirely avoidable.",
      ],
      bodies: [
        [
          "Visit the location at 8 AM and 8 PM, not just Sunday noon. Traffic, light and noise tell the truth when nobody is selling.",
          "A home is a morning commute and a midnight grocery run — inspect the life, not just the layout.",
        ],
        [
          "Carpet area, built-up, super built-up — three numbers, three very different things. Ask which one you're paying for, in writing.",
          "Then read the floor plan against the sun path. A west-facing bedroom is a lifestyle decision, not a line item.",
        ],
        [
          "Check the builder's last three deliveries, not the brochure. On-time history is the only amenity list that matters.",
          "Then verify the RERA registration — four minutes online that can save four years of worry.",
        ],
      ],
      closers: [
        "Save this for your next site visit — and share it with someone house-hunting right now.",
        "Comment “GUIDE” for our full buyer's checklist.",
        "Follow for a new buyer tip every week. The honest kind.",
      ],
      support: [
        "\nPart of our No-Jargon Home Buying series.",
        "\nHave a question? Our consultants answer every comment.",
      ],
      visuals: [
        "Editorial flat-lay on a walnut desk: a printed floor plan, brass ruler, espresso cup and reading glasses, shot top-down in soft window light. Warm neutral grade with deep shadows. Overlay in crisp sans: “Read this before your site visit.” Small numbered footnote marks placed directly on the plan.",
        "Clean carousel-cover graphic: an oversized numeral “5” in bronze serif against matte charcoal, with the words “questions to ask before you book” in thin lowercase beneath. Minimal grid, generous negative space, Swiss-poster discipline.",
        "Photograph of a young family crossing a tree-lined street toward a sample-flat entrance, shot from behind at golden hour — documentary, warm, real. Overlay in small serif: “Inspect the life, not just the layout.”",
      ],
      tags: [
        "#HomeBuyingTips", "#FirstTimeBuyer", "#RealEstateAdvice",
        "#PropertyGuide", "#SmartBuyers", "#RERA",
      ],
    },
    lifestyle: {
      key: "lifestyle",
      label: "A Day Here",
      category: "Emotional",
      time: "7:30 PM",
      hooks: [
        "Sunday mornings taste different on the 14th floor.",
        "6:45 AM here: filter coffee, east light, and nowhere to rush to.",
        "This is what “coming home” is supposed to feel like.",
        "The kids learned to cycle in the courtyard. The dog learned to wait by the lift.",
      ],
      bodies: [
        [
          "The clubhouse fills with laughter by four. The pool steams gently at dawn. Somewhere between the reading nook and the jogging trail, neighbours become people you actually know.",
          "A home ends at your door. Life here doesn't.",
        ],
        [
          "Mornings begin on a balcony that catches the sun first. Evenings end with the city glittering quietly below, your phone face-down for once.",
          "Some addresses give you a house. This one gives you your evenings back.",
        ],
        [
          "Festivals in the amphitheatre. Impromptu badminton leagues. A library corner that smells of new books.",
          "Community isn't an amenity. Around here, it might as well be.",
        ],
      ],
      closers: [
        "Tag someone who deserves mornings like these.",
        "Come experience a Sunday here — comment “VISIT” and we'll arrange the coffee too.",
        "Save this for the day you're ready to stop scrolling and start living.",
      ],
      support: [
        "\nResidents' stories, shared with love and permission.",
        "\nBecause square footage never told the whole story.",
      ],
      visuals: [
        "Lifestyle photograph: a sunlit balcony at 7 AM — linen curtain mid-billow, a steel tumbler of filter coffee on a rattan side table, a folded newspaper, soft haze over the treetops. Warm film grade with gentle grain. Overlay in italic serif: “Sunday, 14th floor.”",
        "Blue-hour shot of the pool deck — still water reflecting amber clubhouse lights, a single ripple lane, loungers with folded white towels. Quiet-luxury palette of teal and bronze. Overlay: “Evenings, returned to you.”",
        "Candid photograph of children cycling on a landscaped courtyard path, motion blur on the wheels, parents chatting on a bench behind. Documentary warmth, natural colour. Overlay in lowercase serif: “what coming home feels like.”",
      ],
      tags: [
        "#LuxuryLiving", "#HomeSweetHome", "#CommunityLiving",
        "#SundayMornings", "#LifestyleHomes", "#ApartmentLife",
      ],
    },
    occasion: {
      key: "occasion",
      label: "Milestones & Moments",
      category: "Occasion",
      time: "8:00 PM",
      hooks: [
        "The first bunch of keys changes a family forever.",
        "Festivals hit different when they're celebrated in your own home.",
        "Some gifts come in small boxes. The biggest ones come with a floor plan.",
        "A new nameplate by the door. Is the address ready?",
      ],
      bodies: [
        [
          "This season, trade “someday” for a moving date. A home that hosts the family dinner, the first rangoli at the door, the spare room that finally becomes the nursery.",
          "The best gifts outlive the occasion by decades.",
        ],
        [
          "Every family has that one photo — everyone squeezed onto one sofa, festival lights everywhere. It's time the backdrop was yours.",
          "Own the home where the memories get made.",
        ],
        [
          "Keys handed over. Threshold crossed. A new nameplate by the door.",
          "We never get tired of this moment — and we'd love for it to be yours next.",
        ],
      ],
      closers: [
        "Festive offers now open — comment “CELEBRATE” for the season's payment privileges.",
        "Book your festive site visit this week. Slots fill faster than sweet boxes.",
        "Tag the family member who's been saying “next year” for three years.",
      ],
      support: [
        "\nSpecial festive payment plans for a limited window.",
        "\nEvery handover documented — ours is a community of firsts.",
      ],
      visuals: [
        "Evening photograph of a residence entrance styled for a festival — brass urlis with floating marigolds, warm diya light tracing the doorway, a softly lit nameplate. Rich amber and deep green grading, celebratory but elegant. Overlay in festive gold serif: “Your name. Your door.”",
        "Close-up photograph: two hands exchanging a set of keys with a tassel, shallow depth of field, warm bokeh lights behind. Intimate, emotional crop. Overlay: “The small-box moment. Supersized.”",
        "Wide shot of a family at their new doorway mid-ritual, grandparents smiling, a marigold garland framing the shot. Documentary warmth. Overlay in lowercase: “the photo every family has. at your address.”",
      ],
      tags: [
        "#FestiveHomes", "#NewHomeVibes", "#GrihaPravesh",
        "#HomeGoals", "#CelebrationTime", "#KeysToHome",
      ],
    },
    engagement: {
      key: "engagement",
      label: "Join the Conversation",
      category: "Engagement",
      time: "7:00 PM",
      hooks: [
        "Settle this debate: sea view or city lights?",
        "Be honest — balcony garden or balcony lounge chairs?",
        "If your home had one extra room, what would it become?",
        "Unpopular opinion: the kitchen is the real living room.",
      ],
      bodies: [
        [
          "We've seen a thousand floor plans and everyone fights for a different corner of the home. Team Sea View says mornings matter. Team City Lights says nights win.",
          "Where do you stand?",
        ],
        [
          "Tell us your non-negotiable — the one thing a home must have or it's a hard no. Walk-in wardrobe? East-facing kitchen? A study with a door that locks during meetings?",
          "We're reading every answer. The architects are too.",
        ],
        [
          "Dream scenario: budget isn't the issue, space is. One extra room appears in your floor plan tomorrow. Home theatre? Library? Gym? Legendary walk-in wardrobe?",
          "One choice only. Defend it in the comments.",
        ],
      ],
      closers: [
        "Vote below — the results get surprisingly heated.",
        "Best answer gets pinned. Go.",
        "Tag the person you always argue about interiors with.",
      ],
      support: [
        "\nOur consultants jump into the comments at 8 PM.",
        "\nNo wrong answers. Only strong opinions.",
      ],
      visuals: [
        "Bold split-screen graphic: left half a dawn seascape in cool teal, right half a glittering night skyline in warm bronze, a thin vertical divider with the word “OR” in a circle at centre. Headline across both halves in big serif: “Pick a side.”",
        "Photograph of a beautiful empty room with one dramatic shaft of window light — parquet floor, bare walls. Overlay in huge serif at centre: “One extra room. What moves in?” Gallery-minimal, provocative.",
        "Close-up of an open floor-plan sketch with a hand-drawn question mark in the flexi room, pencil and coffee-ring stains visible — authentic architect's-desk energy. Overlay small: “a genuine question from our design desk.”",
      ],
      tags: [
        "#HomeGoals", "#DreamHome", "#InteriorDebate",
        "#RealEstateTalk", "#YourOpinion", "#DesignQuestions",
      ],
    },
    value: {
      key: "value",
      label: "Investment Lens",
      category: "Investment",
      time: "6:30 PM",
      hooks: [
        "Your money deserves a better postcode.",
        "Rental yield, appreciation, and a metro line 400 metres away. Let's talk numbers.",
        "Investors don't buy square feet. They buy the next five years.",
        "The question isn't “why this project?” It's “why not sooner?”",
      ],
      bodies: [
        [
          "Infrastructure moves prices — and this corridor is mid-transformation. New arterial roads, a business district rising next door, schools parents actually queue for.",
          "Early buyers in growth corridors don't just own homes. They own the upside.",
        ],
        [
          "Compare like-for-like: the price per square foot here still trails the city average while rental demand climbs quarter on quarter.",
          "That gap is called opportunity, and it rarely stays open long.",
        ],
        [
          "For our NRI buyers: a managed leasing desk, transparent documentation, and a location tenants ask for by name.",
          "Owning from 8,000 miles away has never felt this close.",
        ],
      ],
      closers: [
        "Comment “INVEST” for the appreciation report and payment plan.",
        "Book a 15-minute investor call this week — link in bio.",
        "Send this to the friend who says “property is complicated.”",
      ],
      support: [
        "\nFlexible payment plans from the first slab.",
        "\nBank approvals in place with leading lenders.",
      ],
      visuals: [
        "Clean data-editorial graphic on deep charcoal: a minimal rising line chart in bronze-foil texture with three stat callouts — price trend, metro distance, rental yield — rendered as elegant numerals. Serif headline: “The next five years, plotted.” Financial-Times-meets-luxury restraint.",
        "Twilight aerial view of the district with the project highlighted by a soft bronze outline glow; surrounding landmarks marked with thin white annotation lines and tiny serif labels. Overlay at the bottom: “Location is a strategy.”",
        "Split frame: left half a confident couple reviewing documents with a consultant at a marble table; right half a close-up of a fountain pen signing. Desaturated charcoal-and-bronze grade. Overlay: “Own the upside.”",
      ],
      tags: [
        "#PropertyInvestment", "#NRIInvestment", "#RealEstateInvesting",
        "#WealthBuilding", "#SmartInvesting", "#RentalYield",
      ],
    },
    sensory: {
      key: "sensory",
      label: "Design Details",
      category: "Sensory",
      time: "6:00 PM",
      hooks: [
        "Run your hand along the handrail. That coolness? Solid brass.",
        "The lobby smells faintly of cedar. That's not an accident.",
        "You'll notice the silence first. Double-glazed everything.",
        "Design you can hear, touch and smell — not just see.",
      ],
      bodies: [
        [
          "Stone floors stay cool through May. Solid-core doors close with a satisfying hush. Corridor light warms automatically as evening falls.",
          "Luxury isn't a chandelier. It's a hundred decisions you'll never have to think about.",
        ],
        [
          "We argued for weeks over the door handles. The winning argument: how it should feel at 11 PM when you come home exhausted.",
          "That level of obsession lives in every hinge, joint and shadow gap here.",
        ],
        [
          "Natural cross-ventilation means the evening breeze does the work of two air-conditioners. The balcony is positioned for the sunset, not the floor plan's convenience.",
          "Details like these don't photograph well. They live exceptionally.",
        ],
      ],
      closers: [
        "Experience it in person — book a walkthrough of the experience centre.",
        "Which detail would you notice first? Tell us below.",
        "Save this. Then compare it against the next sample flat you visit.",
      ],
      support: [
        "\nEvery finish chosen for a reason we'll happily explain.",
        "\nThe full spec sheet is public. Ask for it.",
      ],
      visuals: [
        "Extreme macro photograph: fingertips brushing a brushed-brass handrail, warm side-lighting revealing the texture, dark moody background with bronze highlights. Overlay in whisper-thin serif: “Solid. Always.”",
        "Sensory collage in a 2×2 grid: stone texture, oak grain, soft corridor lighting, steam rising from a balcony cup of tea at dusk. Unified warm-charcoal grade with thin white gutters. Overlay at centre: “Feel the difference.”",
        "Photograph of an empty corridor washed with warm evening light across terrazzo flooring, one door slightly ajar spilling golden light. Cinematic stillness. Overlay in lowercase serif: “the satisfying hush of home.”",
      ],
      tags: [
        "#DesignDetails", "#ArchitecturalDesign", "#LuxuryInteriors",
        "#MaterialMatters", "#CraftedLiving", "#HomeDesign",
      ],
    },
  },
};
