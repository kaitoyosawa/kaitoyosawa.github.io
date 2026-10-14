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
    name: "豊沢 可為",
    role: "ポスドク研究員",
    institution: "ミュンスター大学",
    photo: fromRoot(source.photo),
    description: "豊沢 可為（とよさわ かい）のホームページ。ミュンスター大学のポスドク研究員。作用素環論、幾何学的群論、エルゴード理論を研究しています。",
    bio: [
      [
        "ミュンスター大学でポスドク研究員として、",
        translatedPersonLink("David Kerr"),
        "先生とともに研究しています。2025年5月に",
        translatedPersonLink("Jesse Peterson"),
        "先生の指導のもと、ヴァンダービルト大学で数学の博士号を取得しました。"
      ],
      "作用素環論、幾何学的群論、エルゴード理論に興味があります。"
    ],
    links: source.links.map((link) => ({
      ...link,
      label: /^cv\.pdf(?:[?#]|$)/.test(link.url) ? "履歴書（英語・PDF）" : link.label,
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
      pageTitle: "ホームページ",
      email: "メールアドレス",
      office: "所在地",
      emailPlaceholder: "メールアドレス",
      portraitSuffix: "の写真"
    }
  };
})();
