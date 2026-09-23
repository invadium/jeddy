# Fonts

Copyrights, licences and sources for every font here are recorded in
[../../ext/credits.md](../../ext/credits.md), with the licence texts in
`ext/3rd-party-licenses/`.

## Notes

- `WorkSans.woff2` and `EBGaramond.woff2` are variable fonts (`wght` axis); the
  editor uses the default 400 instance.
- Merriweather is split into `latin`, `latin-ext`, `cyrillic` and `cyrillic-ext`
  subsets with `unicode-range`, because the full variable file is 4.6MB.
  The browser only fetches the subsets a document actually needs.
- Cyrillic coverage: iA Writer Quattro, EB Garamond, Merriweather and monofur
  cover Ukrainian. Everything else here is Latin only.
