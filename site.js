(() => {
  'use strict';
  const content = window.siteContent;
  if (!content) return;
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
  document.title = name + ' — Personal website';
  if (content.description) document.querySelector('meta[name="description"]').content = content.description;
  $('affiliation').textContent = [content.role, content.institution].filter(Boolean).join(' · ');
  $('affiliation').hidden = !$('affiliation').textContent;
  $('bio').replaceChildren(...(content.bio || []).map(text => make('p', text)));
  renderLinks($('profile-links'), content.links);
  const photoUrl = safeUrl(content.photo);
  if (photoUrl && !photoUrl.startsWith('mailto:')) {
    const portrait = $('portrait');
    portrait.alt = 'Portrait of ' + name;
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
    details.append(make('h3', paper.title));
    if (paper.authors) details.append(make('p', paper.authors, 'paper-authors'));
    const meta = make('div', '', 'paper-meta');
    const venue = [paper.venue, paper.year].filter(Boolean).join(' · ');
    if (venue) meta.append(make('span', venue, 'paper-venue'));
    const links = make('div', '', 'paper-links');
    renderLinks(links, paper.links);
    meta.append(links);
    details.append(meta);
    row.append(number, details);
    return row;
  }));
  if (!papers.length) {
    $('research').hidden = true;
    document.querySelector('nav a[href="#research"]').hidden = true;
  }
  const contact = $('contact-details');
  contact.replaceChildren();
  if (content.email || content.draft) {
    const block = make('div');
    block.append(make('span', 'Email', 'contact-label'));
    const paragraph = make('p');
    if (content.email) {
      const email = make('a', content.email);
      email.href = 'mailto:' + content.email;
      paragraph.append(email);
    } else paragraph.textContent = 'Your email address';
    block.append(paragraph);
    contact.append(block);
  }
  if (content.office) {
    const block = make('div');
    block.append(make('span', 'Office', 'contact-label'), make('p', content.office));
    contact.append(block);
  }
  if (!contact.children.length) {
    $('contact').hidden = true;
    document.querySelector('nav a[href="#contact"]').hidden = true;
  }
  $('copyright').textContent = '© ' + new Date().getFullYear() + ' ' + name;
  $('draft-note').hidden = !content.draft;
})();
