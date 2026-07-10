# Blog Go-Live Checklist (Step 4)

Single source of truth for launching the blog. Work through every item, in
order, when Post #1 is approved and ready. Keep this file updated as steps
complete or the plan changes.

## Pre-flight gates (before anything below)

- [ ] **Written permission from Sam at CES Power on file** for the broadcast
      case study (Post #1).
- [ ] **No Ball Arena / NHL naming** unless that permission explicitly covers it.
- [ ] Post framed as "AFP + The Fuel Guys"; event leads route to AFP per the
      agreement with Justin.

## Launch toggles

1. [ ] Build Post #1 from `/blog/_template/` → `/blog/<slug>/`
       (follow the checklist comment at the top of the template; DELETE the
       noindex line in the copy).
2. [ ] Remove `<meta name="robots" content="noindex, follow">` from
       `/blog/index.html` (marked with a `REMOVE noindex` comment).
3. [ ] Add Post #1's card to the `/blog/index.html` grid (commented example
       card is in the file).
4. [ ] Enable the Blog nav item on ALL pages: search the repo for
       `ENABLE at Step 4 go-live` and uncomment every match
       (19 pages + blog index + template + 404 page).
5. [ ] Uncomment the internal links: search the repo for `STEP 4 LINK`
       (homepage ×3, services ×3, pump-outs ×1) — only uncomment the ones
       whose target post is actually live; leave the rest for later posts.
6. [ ] `sitemap.xml`: add `https://thefuelguysdiesel.com/blog/` and
       `https://thefuelguysdiesel.com/blog/<slug>/` with `<lastmod>`.
7. [ ] `blog/feed.xml`: add the first `<item>` (template is in the feed's
       maintenance comment).
8. [ ] DELETE `/blog/sample-post/` entirely.
9. [ ] Commit, push, verify Pages deploy succeeds.

## Post-launch (same day)

- [ ] Submit `sitemap.xml` in Google Search Console; request indexing of
      `/blog/` and the post URL.
- [ ] Verify live: post renders, JSON-LD passes Google's Rich Results Test,
      noindex gone from blog index, nav shows Blog on every page.
- [ ] Spot-check `robots.txt` still allows everything except `/blog/_template/`.

## Standing rules (never toggle these)

- `/blog/_template/` stays noindexed and unlinked forever.
- NAP in every schema block: `The Fuel Guys LLC` / `(720) 736-1614` /
  `https://thefuelguysdiesel.com` — character-for-character, no address.
- Every FAQ in FAQPage schema mirrors the visible FAQ word-for-word.
