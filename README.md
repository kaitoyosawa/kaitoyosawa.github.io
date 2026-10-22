# Kai Toyosawa — Personal website

A compact, single-column academic website in English and Japanese, with publications, contact details, and a CV.

## Hosting

Live website: https://kaitoyosawa.github.io/

This folder is ready for a GitHub Pages user site. Place its contents at the root of a public repository named `kaitoyosawa.github.io`.

In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source. The workflow in `.github/workflows/publish.yml` compiles the CV with XeLaTeX and publishes the static website on every commit to `main`. It can also be run manually from the **Actions** tab.

## Update the page

- Edit `content.js` to change the introduction, publications, contact details, or links.
- Update the corresponding text and metadata in `index.html` too, so search engines and visitors without JavaScript see the same information.
- The Japanese version is at `/ja/`. Edit `ja/content.js` for its translated introduction and labels, and update the matching static text in `ja/index.html` for visitors without JavaScript. Both pages have English / 日本語 links in the header.
- Publications and contact details are shared from `content.js`; the Japanese version keeps published paper titles and author names in their original language and translates the surrounding labels. Update the static publication lists in both HTML files when papers change.
- The Japanese page links to the same English CV and labels it accordingly.
- Edit or replace `CV.tex` and commit the change to `main`. GitHub Actions compiles it and publishes the result at `/cv.pdf`; you do not need to compile or upload a PDF yourself. The existing `cv.pdf` stored in the repository is a legacy copy and is not used by the deployment workflow.
- Edit `styles.css` to change the appearance.
- To add a photo later, upload `portrait.jpg` and set `photo: "portrait.jpg"` in `content.js`. Leave it empty to keep the current layout.

Save changes using GitHub's **Commit changes** button. GitHub Pages republishes automatically; changes can take up to 10 minutes to appear.

The website has no external fonts, analytics, or browser dependencies. The build installs TeX Live and runs XeLaTeX twice with shell escape disabled. It publishes only the website assets and compiled CV, excluding LaTeX source and build logs. Source files remain visible in this public repository. If compilation fails, deployment stops and the previously published site stays available; check the **Actions** tab for the error.

## Documentation

- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
