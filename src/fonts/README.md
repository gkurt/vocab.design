# Vendored faces

One file, and it is here rather than in `package.json` because it exists on no
registry. Everything else a specimen needs comes from a package (see
`src/components/SpecimenFonts.astro`).

## junicode-latin.woff2

Junicode 2.226 by Peter S. Baker, [OFL 1.1](./Junicode-OFL.txt), from
[psb1558/Junicode-font](https://github.com/psb1558/Junicode-font). The copyright
line names no Reserved Font Name, so a subset may keep the family name.

It is here for one reason: it carries a REAL `pcap` set. Petite capitals are the
rarest thing in this corner of OpenType, and after measuring nine serifs from
Google's library and every face this site already loads, Junicode is the only
file found that answers the request rather than falling back to small caps. The
`petite-caps` specimen is a picture of the two sets side by side, which is only a
picture if the two are actually different drawings.

Built from `webfiles/JunicodeVF-Roman.woff2` (978KB, three axes, 5,033 glyphs)
down to 25KB, with `fonttools` in a throwaway virtualenv:

```
python -m fontTools.varLib.instancer JunicodeVF-Roman.woff2 wght=400 wdth=100 ENLA=0 -o juni-static.ttf
pyftsubset juni-static.ttf --unicodes="U+0020-007E,U+00A0" \
  --layout-features="smcp,pcap,c2sc,c2pc,kern,liga,calt,ccmp,locl" \
  --flavor=woff2 --output-file=junicode-latin.woff2
```

Keep `pcap` and `smcp` in that feature list if it is ever rebuilt: dropping them
would not fail any gate, it would quietly turn the specimen back into two
identical samples.
