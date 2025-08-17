# Mythosymbolic Fractalism (MSF) — RANNTA

**Mythosymbolic Fractalism (MSF)** is an artistic-philosophical language created by **ilia144000**.  
It fuses body, nature, myth, zodiac, light, mathematics, code, and the subconscious into symbolic structures built upon sacred geometry and the golden ratio.  

MSF is not decorative art and not pop aesthetics. It is a law-driven symbolic grammar where every composition encodes mythic and subconscious narratives through **fractal layering** and **mathematical proportion**.  
Each work must also carry verifiable metadata and integrity proofs (hashes, C2PA manifests, invisible watermarks, and creator signature).  

---

## ✨ Core Principles of MSF
- **Golden Ratio & Fibonacci Spiral**: All compositions are structured upon φ-grids and Fibonacci-based flows.  
- **Sacred Geometry**: Mandalas, spirals, and proportional structures are not decoration but narrative skeletons.  
- **Layering of Realms**:  
  - Body  
  - Nature  
  - Myth & Zodiac  
  - Light & Spectrum  
  - Mathematics & Code  
  - Subconscious Archetypes  
- **Anti-pop, Anti-decorative**: Works are encrypted carriers of meaning and transformation, not surface-level visuals.  
- **Narrative Evolution**: Each artwork evolves in symbolic cycles, often released as **1/1 NFTs** with protected metadata.  

---

## 📜 MSF Specification
The **spec/** directory contains the evolving **MSF Spec** — a formal description of the laws of composition, metadata rules, and integrity protocols.  
- Compositional law (φ-grid, Fibonacci paths, narrative structure)  
- Metadata protocol (C2PA, SHA-256 hashes, steganography)  
- Required `creator_signature` (see [metadata/creator_signature.json](metadata/creator_signature.json))  

---

## 🔒 Creator Signature
Every valid MSF artifact must embed the following signature in both JSON metadata and within the image (steganographically or in EXIF):

```json
"creator_signature": {
  "name": "ilia144000",
  "style": "MSF",
  "symbol": "RANNTA",
  "wallets": [
    "DintDHRdMucAig4mKaupMmS1jursp6H1TZTUJZPPUjno",
    "UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL",
    "TGMK2HM2uk2aiV3EPZKyFeTgyGwYn8asYHfXjdSqEUb"
  ],
  "hash_tag": "#MSFbyILIA144000"
}

