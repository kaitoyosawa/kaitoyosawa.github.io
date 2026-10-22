(() => {
  'use strict';
  const content = window.siteContent;
  if (!content) return;
  const ui = {
    pageTitle: 'Personal website',
    email: 'Email',
    office: 'Office',
    emailPlaceholder: 'Your email address',
    ...content.ui
  };
  const $ = id => document.getElementById(id);
  const make = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const safeUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  };
  const renderLinks = (parent, links) => {
    parent.replaceChildren();
    (links || []).forEach(item => {
      const url = safeUrl(item.url);
      if (!url || !item.label) return;
      const link = make('a', item.label);
      link.href = url;
      parent.append(link);
    });
    parent.hidden = !parent.children.length;
  };
  const name = content.name || 'Your name';
  $('site-name').textContent = name;
  $('name').textContent = name;
  document.title = name + ' — ' + ui.pageTitle;
  if (content.description) document.querySelector('meta[name="description"]').content = content.description;
  $('affiliation').textContent = [content.role, content.institution].filter(Boolean).join(' · ');
  $('affiliation').hidden = !$('affiliation').textContent;
  $('bio').replaceChildren(...(content.bio || []).map(paragraph => {
    const element = make('p');
    (Array.isArray(paragraph) ? paragraph : [paragraph]).forEach(part => {
      if (typeof part === 'string') {
        element.append(document.createTextNode(part));
        return;
      }
      const url = safeUrl(part.url);
      if (url) {
        const link = make('a', part.label);
        link.href = url;
        element.append(link);
      } else element.append(document.createTextNode(part.label || ''));
    });
    return element;
  }));
  renderLinks($('profile-links'), content.links);
  const photoUrl = safeUrl(content.photo);
  if (photoUrl && !photoUrl.startsWith('mailto:')) {
    const portrait = $('portrait');
    portrait.alt = ui.portraitSuffix ? name + ui.portraitSuffix : 'Portrait of ' + name;
    portrait.addEventListener('load', () => { portrait.hidden = false; });
    portrait.addEventListener('error', () => { portrait.hidden = true; });
    portrait.src = photoUrl;
  }
  const papers = content.papers || [];
  $('publications').replaceChildren(...papers.map((paper, index) => {
    const row = make('li', '', 'publication');
    const number = make('span', String(papers.length - index).padStart(2, '0'), 'paper-number');
    number.setAttribute('aria-hidden', 'true');
    const details = make('div');
    const title = make('h3', paper.title);
    if (content.publicationLanguage) title.lang = content.publicationLanguage;
    details.append(title);
    if (paper.authors) {
      const authors = make('p', paper.authors, 'paper-authors');
      if (content.publicationLanguage) authors.lang = content.publicationLanguage;
      details.append(authors);
    }
    const meta = make('div', '', 'paper-meta');
    const venue = [paper.venue, paper.year].filter(Boolean).join(' · ');
    if (venue) {
      const venueLabel = make('span', venue, 'paper-venue');
      if (paper.venueLanguage) venueLabel.lang = paper.venueLanguage;
      meta.append(venueLabel);
    }
    const links = make('div', '', 'paper-links');
    renderLinks(links, paper.links);
    meta.append(links);
    details.append(meta);
    row.append(number, details);
    return row;
  }));
  if (!papers.length) {
    $('research').hidden = true;
  }
  const contact = $('contact-details');
  contact.replaceChildren();
  if (content.email || content.draft) {
    const block = make('div');
    block.append(make('span', ui.email, 'contact-label'));
    const paragraph = make('p');
    paragraph.textContent = content.email || ui.emailPlaceholder;
    block.append(paragraph);
    contact.append(block);
  }
  if (content.office) {
    const block = make('div');
    block.append(make('span', ui.office, 'contact-label'), make('p', content.office));
    contact.append(block);
  }
  if (!contact.children.length) {
    $('contact').hidden = true;
  }
  $('copyright').textContent = '© ' + new Date().getFullYear() + ' ' + name;
  $('draft-note').hidden = !content.draft;
  // Keep the current section when moving between language versions.
  document.querySelectorAll('[data-language-link]').forEach(link => {
    const updateSection = () => {
      const url = new URL(link.href);
      url.hash = window.location.hash;
      link.href = url.href;
    };
    updateSection();
    window.addEventListener('hashchange', updateSection);
  });
})();
