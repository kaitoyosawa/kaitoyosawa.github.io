// Load after ../content.js to share publication details and contact information.
(() => {
  const source = window.siteContent;
  // Shared relative assets are resolved from the English page's directory.
  const fromRoot = (url) => url ? new URL(url, new URL('../', document.baseURI)).href : url;
  const personLink = (label) => source.bio.flat().find((part) =>
    part && typeof part === "object" && part.label === label
  );
  const translatedPersonLink = (label) => {
    const link = personLink(label);
    return link ? { ...link, url: fromRoot(link.url) } : label;
  };

  window.siteContent = {
    ...source,
    role: "博士研究員",
    institution: "ミュンスター大学",
    photo: fromRoot(source.photo),
    description: "Kai Toyosawaの個人ウェブサイト。ミュンスター大学の博士研究員。研究分野は作用素環論、幾何学的群論、エルゴード理論です。",
    bio: [
      [
        "ミュンスター大学で博士研究員として、",
        translatedPersonLink("David Kerr"),
        "とともに研究を行っています。2025年5月に、",
        translatedPersonLink("Jesse Peterson"),
        "の指導のもと、ヴァンダービルト大学で数学の博士号を取得しました。"
      ],
      "研究分野は作用素環論、幾何学的群論、エルゴード理論です。"
    ],
    links: source.links.map((link) => ({
      ...link,
      label: /^cv\.pdf(?:[?#]|$)/.test(link.url) ? "CV（英語・PDF）" : link.label,
      url: fromRoot(link.url)
    })),
    publicationLanguage: "en",
    papers: source.papers.map((paper) => ({
      ...paper,
      venue: paper.venue === "Preprint" ? "プレプリント" : paper.venue,
      venueLanguage: paper.venue === "Preprint" ? "ja" : "en",
      links: paper.links.map((link) => ({
        ...link,
        url: fromRoot(link.url),
        label: link.label === "Journal" ? "掲載誌" : link.label
      }))
    })),
    ui: {
      pageTitle: "個人ウェブサイト",
      email: "メール",
      office: "研究室",
      emailPlaceholder: "メールアドレス",
      portraitSuffix: "のポートレート"
    }
  };
})();
