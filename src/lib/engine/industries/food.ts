import type { IndustryDef } from "../types";

export const food: IndustryDef = {
  key: "food",
  label: "FMCG / Food",
  shortLabel: "Food & FMCG",
  audience: "Families · Young adults · Everyday consumers",
  voice: "Warm, relatable, craving-inducing",
  description:
    "Speaks like a beloved household brand — taste, family moments and the small daily occasions worth savouring.",
  keywords: [
    "gm", "gram", "kg", "protein", "fiber", "fibre", "sugar", "salt",
    "spice", "recipe", "ingredient", "roast", "crunch", "baked",
    "flavour", "flavor", "masala", "grain", "honey", "butter",
  ],
  broadTags: [
    "#Food", "#Foodie", "#InstaFood", "#Snacks", "#Yummy",
    "#FoodLover", "#Tasty", "#FoodGram",
  ],
  nicheTags: [
    "#PackagedFood", "#FMCG", "#SnackBrand", "#IndianSnacks",
    "#TeaTimeSnacks", "#KidsFavourite", "#GroceryEssentials", "#ReadyToEat",
  ],
  pillars: {
    spotlight: {
      key: "spotlight",
      label: "The Star Product",
      category: "Product",
      time: "11:00 AM",
      hooks: [
        "Warning: opened packs don't survive the night.",
        "The crunch has a sound. Everyone in the room will hear it.",
        "Made the way Sunday tastes.",
        "One bite in, and the meeting paused.",
      ],
      bodies: [
        [
          "Real ingredients — the kind you can pronounce without a chemistry degree. Slow-cooked, small-batch, obsessively tasted at every stage.",
          "If our own kids won't finish the pack, we don't ship it.",
        ],
        [
          "Golden on the outside, soft where it counts, seasoned like someone's grandmother was physically supervising.",
          "Because she was. This recipe predates the company — and most family arguments about it.",
        ],
        [
          "The first bite is crisp. The second confirms the first wasn't luck. The third is when sharing officially ends.",
          "We recommend buying two. Experience talking.",
        ],
      ],
      closers: [
        "Available at your neighbourhood store and online — link in bio.",
        "Comment “YUM” and we'll tell you where to find it near you.",
        "Tag the person you'd (reluctantly) share this with.",
      ],
      support: [
        "\nNo shortcuts. No preservatives worth hiding.",
        "\nLoved in thousands of kitchens. Judged in ours first.",
      ],
      visuals: [
        "Appetite-driven macro food photography: the product mid-break, crumbs suspended, golden texture razor-sharp, a soft sheen catching warm raking light. Rustic wooden surface, linen napkin blurred behind. Overlay in warm bold serif: “Good luck sharing.”",
        "Lifestyle photograph: an open pack on a family table mid-chaos — small hands reaching in, laughter implied at the frame edges, late-afternoon home light. Candid documentary warmth. Overlay: “Survives four minutes at our house.”",
        "Product hero on a bold single-colour background with a dramatic drop shadow, real ingredients playfully orbiting the pack. Modern FMCG energy, crisp studio light. Overlay: “The good-stuff pack.”",
      ],
      tags: [
        "#FoodLover", "#SnackTime", "#TasteTest",
        "#FoodieFinds", "#Cravings", "#NewFavourite",
      ],
    },
    craft: {
      key: "craft",
      label: "Inside the Kitchen",
      category: "Craft & Quality",
      time: "12:00 PM",
      hooks: [
        "We still taste every single batch. Every one.",
        "The facility smells like a bakery. That's the point.",
        "Meet the people who've rejected more batches than most brands ship.",
        "Quality control here involves an actual spoon.",
      ],
      bodies: [
        [
          "Our head taster has twenty years on the panel. She can detect a two-degree change in the roast — and does.",
          "Machines measure. Humans decide.",
        ],
        [
          "Every recipe begins in a real kitchen before it ever meets a production line. If it can't work with a home stove and a wooden spoon, it doesn't scale with us.",
          "Good food doesn't speak factory.",
        ],
        [
          "Suppliers are audited, ingredients are traced, and the turmeric really does come from the farm we name on the pack.",
          "Traceability isn't a feature. It's table stakes.",
        ],
      ],
      closers: [
        "Ask us anything about how it's made — real answers in the comments.",
        "Tour the making process in our stories today.",
        "Share this with someone who reads labels.",
      ],
      support: [
        "\nCertified kitchens, third-party audited.",
        "\nIngredient sourcing published on our website.",
      ],
      visuals: [
        "Behind-the-scenes photograph: a food technologist in whites tasting from a wooden spoon at a gleaming prep counter, warm industrial light, the texture of a real working kitchen. Honest documentary style. Overlay in bold serif: “Tasted. Again. And again.”",
        "Top-down photograph of raw ingredients laid out on a steel prep table like a colour palette — spices in small bowls, flours, fresh herbs — crisp and bright. Overlay: “The entire recipe. Seriously.”",
        "Portrait of a smiling production supervisor holding the finished pack, hairnet and all, genuine pride, warm tones. Overlay in lowercase: “approved by the person who made it.”",
      ],
      tags: [
        "#QualityFirst", "#HowItsMade", "#RealIngredients",
        "#FoodSafety", "#MadeWithCare", "#BehindTheScenes",
      ],
    },
    educational: {
      key: "educational",
      label: "Good to Know",
      category: "Educational",
      time: "10:00 AM",
      hooks: [
        "Reading a food label: the five-second skill.",
        "What's actually in your snack? Let's flip the pack.",
        "The ingredient-order trick nobody teaches you.",
        "“No added sugar” — and other phrases worth a second look.",
      ],
      bodies: [
        [
          "Ingredients are listed by weight, most first. If sugar hides up front under three different aliases, that's not a recipe — that's a costume.",
          "Flip the pack. The truth is printed in the smallest font, as always.",
        ],
        [
          "“Natural” sounds lovely and means almost nothing legally. “Fortified” can hide what was removed first.",
          "Our rule: if a ten-year-old can't read the ingredient list aloud, we don't print it.",
        ],
        [
          "Protein per serving only makes sense next to serving size. Check the maths against your actual appetite, not the label's optimism.",
          "Labels don't lie. They whisper selectively.",
        ],
      ],
      closers: [
        "Save this for your next grocery run.",
        "Comment “LABEL” for our full decode guide.",
        "Send this to the friend who meal-plans on Sundays.",
      ],
      support: [
        "\nPart of our Honest Labels series.",
        "\nNo fine print was harmed in our ingredient lists.",
      ],
      visuals: [
        "Clean editorial graphic: an enlarged back-of-pack ingredient panel with friendly hand-drawn annotations and arrows in warm red crayon style on cream paper. Overlay in bold sans: “Flip the pack.”",
        "Top-down photograph: the product beside a magnifying glass hovering over its label, a notebook with handwritten ticks alongside. Warm study-desk light. Overlay: “Decoders, assemble.”",
        "Minimal illustration-style image: a giant question mark formed from scattered ingredients on kraft paper. Playful, smart. Overlay in serif: “Curious? Good.”",
      ],
      tags: [
        "#FoodLabels", "#CleanEating", "#NutritionFacts",
        "#InformedChoices", "#HealthySnacking", "#ReadTheLabel",
      ],
    },
    lifestyle: {
      key: "lifestyle",
      label: "The Family Table",
      category: "Emotional",
      time: "7:30 PM",
      hooks: [
        "The best conversations happen near the snack bowl.",
        "Some of my childhood smells exactly like this.",
        "Home isn't a place. It's a flavour.",
        "Grandma's rule: nobody leaves this table hungry.",
      ],
      bodies: [
        [
          "Homework finished around the kitchen counter. Stories traded over one more helping. The good stuff disappears first — it always does.",
          "Some products fill stomachs. This one fills evenings.",
        ],
        [
          "Every family has one food that means “everything is okay.” It shows up at study sessions, match victories and the midnight raid on the fridge.",
          "We're quietly honoured every time it's ours.",
        ],
        [
          "The lunchbox note is gone by noon, but the treat inside is remembered by dinner.",
          "Love, in our experience, travels extremely well in tiffin.",
        ],
      ],
      closers: [
        "Tag the person who shares your table.",
        "What's the flavour of “home” at your place? Tell us below.",
        "Stock the shelf that matters. Link in bio.",
      ],
      support: [
        "\nMade for tables, not trophy shelves.",
        "\nFamily-approved since day one.",
      ],
      visuals: [
        "Warm documentary photograph: a family kitchen at golden hour — the product open mid-table, grandparents and kids mid-laugh, crumbs and chai cups honestly scattered. No staging gloss. Overlay in warm serif: “Where the good talks happen.”",
        "Nostalgic still-life: an old-school steel tiffin open with the product inside, a chalkboard and pencil shavings soft in the background, window light like a school-day afternoon. Overlay in lowercase: “remember this feeling?”",
        "Evening shot: a snack bowl between two people on a sofa, TV glow on blurred faces, hands meeting mid-bowl. Cosy intimacy. Overlay: “the bowl in the middle says it all.”",
      ],
      tags: [
        "#FamilyTime", "#HomeMoments", "#ComfortFood",
        "#TogetherTime", "#FoodMemories", "#HomeIsWhere",
      ],
    },
    occasion: {
      key: "occasion",
      label: "The Occasion",
      category: "Occasion",
      time: "8:00 PM",
      hooks: [
        "Match night without this is just television.",
        "Festival prep is 90% planning, 10% hiding the good snacks.",
        "Guests in thirty minutes. Hero moves only.",
        "Some occasions demand the big pack.",
      ],
      bodies: [
        [
          "The final over starts in ten minutes and the table needs to perform. Crunchy, crowd-pleasing, quickly refilled — that's the entire game plan.",
          "Leave the suspense to the scoreboard.",
        ],
        [
          "Festive hosting, decoded: something for the aunt who inspects, something for the cousin who devours, and one pack hidden for after.",
          "Tradition finds its way. So does the snack drawer.",
        ],
        [
          "Road-trip rule one: the snack bag rides up front, like a co-pilot with better taste.",
          "Seven hours of highway deserve provisions that survive sun, speed and sibling politics.",
        ],
      ],
      closers: [
        "Stock up before the weekend — the party pack is linked in bio.",
        "What's your occasion essential? Comment below.",
        "Tag your co-pilot. Set the tone early.",
      ],
      support: [
        "\nParty packs now in stores for the season.",
        "\nThe family pack exists for a reason.",
      ],
      visuals: [
        "High-energy photograph: living-room match night — a snack bowl mid-air catch, jersey-clad arms reaching, TV glow as rim light, motion and theatre. Overlay in bold condensed sans: “FINAL OVER. READY.”",
        "Festive table spread: the product among sweet boxes, torans and fairy lights, a warm celebratory palette with the pack confidently front-centre. Overlay in serif: “New tradition, unlocked.”",
        "Styled car-window road-trip shot: the snack pack on the dashboard, highway bokeh through glass, golden-hour flare, a paper map peeking into frame. Wanderlust warmth. Overlay: “Co-pilot duties, accepted.”",
      ],
      tags: [
        "#MatchNight", "#FestiveSeason", "#PartySnacks",
        "#RoadTripEssentials", "#HostingHacks", "#WeekendVibes",
      ],
    },
    engagement: {
      key: "engagement",
      label: "Your Turn",
      category: "Engagement",
      time: "7:00 PM",
      hooks: [
        "Chai team or coffee team — answer carefully.",
        "Dunk it, or keep the crunch sacred?",
        "Defend your weirdest-but-brilliant food combo.",
        "Be honest: does the last piece have an owner?",
      ],
      bodies: [
        [
          "Two kinds of people exist: those who dunk ceremoniously for exactly three seconds, and those who fear sogginess like a villain.",
          "Which one are you? Science (us, reading the comments) demands answers.",
        ],
        [
          "We once watched someone pair this with vanilla ice cream, and now the test kitchen can't unsee it.",
          "Confess your strangest pairing. The best entry gets a surprise box.",
        ],
        [
          "The final piece in the pack: etiquette says offer, instinct says run.",
          "How does your household solve the world's oldest snack dispute?",
        ],
      ],
      closers: [
        "Vote below. Results may divide families.",
        "Best answer gets featured — and possibly a hamper.",
        "Tag your snacking nemesis.",
      ],
      support: [
        "\nWe're reading every comment. Yes, even yours.",
        "\nThe poll closes Sunday. Bragging rights are permanent.",
      ],
      visuals: [
        "Playful split graphic: a mug of chai swirling on the left, an espresso shot on the right, a hand dunking the product dead-centre straddling both — bold flat background, comic energy with premium design restraint. Overlay in huge sans: “DUNK or DON'T?”",
        "Photograph: the final piece alone in an empty pack on a kitchen counter, a single dramatic overhead light like an interrogation scene, long shadow. Overlay in serif: “The last piece has questions.”",
        "Grid of four odd-but-tempting pairings shot as mini food polaroids with handwritten labels, pinned to a corkboard with red string. Playful investigative vibe. Overlay: “Exhibit A, B, C, D.”",
      ],
      tags: [
        "#FoodDebate", "#ChaiTime", "#SnackWars",
        "#FoodPoll", "#WeirdFoodCombos", "#SnackTalk",
      ],
    },
    value: {
      key: "value",
      label: "Everyday Worth",
      category: "Value",
      time: "6:30 PM",
      hooks: [
        "Premium taste shouldn't need a special-occasion budget.",
        "Honest price. Generous pack. Zero asterisks.",
        "The maths of snack happiness, solved.",
        "Big flavour. Small bill. Repeat weekly.",
      ],
      bodies: [
        [
          "We spend on ingredients, not celebrity billboards. You can literally taste the advertising budget — which is to say, there isn't one. That's the good news.",
          "The difference lands in the pack, where it belongs.",
        ],
        [
          "A family pack that actually feeds a family. Revolutionary, we know.",
          "Cost per crunch stays low; satisfaction per rupee stays frankly unreasonable.",
        ],
        [
          "Grocery maths for real life: choose the brand that respects both your tiffin and your budget.",
          "Quality is the shortest route to buying once, not twice.",
        ],
      ],
      closers: [
        "Find the value pack at your nearest store today.",
        "This month's offers are linked in bio.",
        "Share this with the family CFO — they decide; we just taste amazing.",
      ],
      support: [
        "\nCombo packs for the calculated snacker.",
        "\nEveryday low price is the whole idea.",
      ],
      visuals: [
        "Smart editorial still-life: the family pack beside a neat handwritten grocery list and a receipt stub on warm kitchen tile, morning light. Relatable-premium, honest and sunny. Overlay in bold serif: “Approved by the family CFO.”",
        "Photograph of a generous pour from pack to bowl, mid-cascade frozen, bright appetising light. Abundance as the hero. Overlay: “Generous is in the recipe.”",
        "Witty split frame: a blurred plain billboard silhouette on the left versus a crisp macro of real ingredients on the right. Overlay in lowercase: “we spent it here instead.”",
      ],
      tags: [
        "#ValueForMoney", "#FamilyPack", "#SmartShopping",
        "#EverydayEssentials", "#BudgetFriendly", "#PantryStaples",
      ],
    },
    sensory: {
      key: "sensory",
      label: "The Craving",
      category: "Sensory",
      time: "6:00 PM",
      hooks: [
        "That first crunch should be a ringtone.",
        "Golden. Crisp. Gone. The full biography.",
        "You can smell this photo from where you're sitting.",
        "Somewhere between the aroma and the first bite, time stops.",
      ],
      bodies: [
        [
          "The outside shatters delicately; the inside yields like it was waiting for you. Salt lands exactly where your tongue hoped.",
          "Then the slow warmth of spice arrives — patient, certain, exactly enough.",
        ],
        [
          "Steam rises, carrying roasted notes across the table like an announcement.",
          "By the time it reaches the room, spoons are already being assigned.",
        ],
        [
          "Listen closely: the crackle is the overture, the first bite is the chorus, and the last crumb is the standing ovation at the bottom of the pack.",
          "Encores require a second pack. Prepare accordingly.",
        ],
      ],
      closers: [
        "Craving activated? The nearest store is one comment away — ask us.",
        "Save this for your next 4 PM emergency.",
        "Tag someone who can hear this post.",
      ],
      support: [
        "\nBest enjoyed fresh, warm, and barely shared.",
        "\nSensory experiences may cause repeat purchases.",
      ],
      visuals: [
        "Ultra-macro texture shot: the product surface lit by low raking golden light, every crackle and crystal of seasoning visible like a landscape. Almost abstract, deeply appetising. Overlay in thin serif: “Exhibit: the crunch.”",
        "Steam-focused photograph: the product just served, steam backlit into dramatic ribbons against a dark kitchen, a spoon mid-hover. Moody food cinema. Overlay in lowercase: “the announcement of dinner.”",
        "Slow-motion-feel photograph: the product breaking apart mid-air, its interior revealed, crumbs launched like confetti, warm bright light. Overlay: “Biography of a bite.”",
      ],
      tags: [
        "#FoodPorn", "#Craving", "#Foodstagram",
        "#SnackAttack", "#FoodPhotography", "#YummyFood",
      ],
    },
  },
};
