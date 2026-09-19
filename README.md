# Kai Toyosawa — Personal website

A black-and-white academic website with responsive alignment, publications, contact details, and a CV. No photograph is required.

## Hosting

Live website: https://ktoyosaw.github.io/

This folder is ready for a GitHub Pages user site. Place its contents at the root of a public repository named `ktoyosaw.github.io`.

In the repository, open **Settings → Pages**. Choose **Deploy from a branch**, select **main** and **/(root)**, then save. The empty `.nojekyll` file keeps the site as plain static HTML, CSS, and JavaScript.

## Update the page

- Edit `content.js` to change the introduction, publications, contact details, or links.
- Update the corresponding text and metadata in `index.html` too, so search engines and visitors without JavaScript see the same information.
- Replace `cv.pdf` with your new CV, keeping the same filename.
- Edit `styles.css` to change the appearance.
- To add a photo later, upload `portrait.jpg` and set `photo: "portrait.jpg"` in `content.js`. Leave it empty to keep the current layout.

Save changes using GitHub's **Commit changes** button. GitHub Pages republishes automatically; changes can take up to 10 minutes to appear.

The site has no external fonts, analytics, dependencies, or build step.

## Documentation

- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
