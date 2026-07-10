# Blog Go-Live Checklist (Step 4) — EXECUTED 2026-07-10

Post #1 published: `/blog/diesel-delivery-cost-denver/` (pricing post, per owner
decision — zero permission dependencies). The CES Power broadcast case study
becomes a later post; its gates below still apply when it publishes.

## Launch toggles — DONE 2026-07-10

1. [x] Post #1 built from `/blog/_template/` → `/blog/diesel-delivery-cost-denver/`
       (noindex deleted, all tokens filled, FAQ schema 1:1 with visible FAQs).
2. [x] `noindex` removed from `/blog/index.html`.
3. [x] Post card added to the `/blog/index.html` grid.
4. [x] Blog nav item enabled on all pages (22 files, incl. template and 404).
5. [x] Internal links: 3 pricing links live (homepage under services grid,
       services page ×2). Emergency (×2: homepage card + services), broadcast
       banner (homepage), and pump-outs links remain commented — their target
       posts are unpublished. Uncomment each when its post ships.
6. [x] `sitemap.xml`: `/blog/` + post URL added (lastmod 2026-07-10).
7. [x] `blog/feed.xml`: first `<item>` added.
8. [x] `/blog/sample-post/` deleted.
9. [x] 404 page Blog button enabled.

## Post-launch (do these once deployed)

- [ ] Submit `sitemap.xml` in Google Search Console; request indexing of
      `/blog/` and `/blog/diesel-delivery-cost-denver/`.
- [ ] Verify live: post renders, JSON-LD passes Google's Rich Results Test.

## MAINTENANCE — pricing post

**Review `/blog/diesel-delivery-cost-denver/` ranges MONTHLY.** When updating:
1. Update the numbers in the Quick Answer, the table, and the body copy.
2. Update the visible "Prices last reviewed: <Month Year>" line under the byline.
3. Update `dateModified` in the BlogPosting schema AND the visible
   "Updated" `<time>` in the byline (both the `datetime` attr and display text).
4. Update `<lastmod>` for the post in `sitemap.xml`.

## Publishing the next post (repeat per post)

1. Copy `/blog/_template/` → `/blog/<slug>/`; follow the token checklist in the
   template header; DELETE the noindex line.
2. Add the post's card to `/blog/index.html` (newest first).
3. Add URL + lastmod to `sitemap.xml`; add `<item>` to `blog/feed.xml` (newest first).
4. Uncomment any `STEP 4 LINK` comments that target the new post
   (search the repo for the slug).
5. Replace one "Coming soon" related-post card on existing posts with the new post.

## Gates for the CES Power broadcast case study (when it publishes)

- [ ] Written permission from Sam at CES Power on file.
- [ ] No Ball Arena / NHL naming unless that permission explicitly covers it.
- [ ] Framed as "AFP + The Fuel Guys"; event leads route to AFP per the
      agreement with Justin.

## Standing rules (never toggle these)

- `/blog/_template/` stays noindexed and unlinked forever.
- NAP in every schema block: `The Fuel Guys LLC` / `(720) 736-1614` /
  `https://thefuelguysdiesel.com` — character-for-character, no address.
- Every FAQ in FAQPage schema mirrors the visible FAQ word-for-word.
