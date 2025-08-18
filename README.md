# Mythosymbolic Fractalism (MSF)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.XXXXXXX.svg)](https://doi.org/10.5281/zenodo.XXXXXXX)

**Mythosymbolic Fractalism (MSF)** is an experimental framework under **RANNTA** for embedding, verifying, and distributing symbolic–fractal artworks with integrity and provenance.  
It combines fractal symbolism with verifiable metadata, ensuring transparency, authorship tracking, and reproducibility.

---

## 🚀 Features
- 📜 **Spec**: [`msf-spec.md`](spec/msf-spec.md) — formal specification.
- ⚖️ **Licenses**:  
  - `ART_LICENSE` (for artwork/media)  
  - `CODE_LICENSE` (MIT, for code)  
- 🧩 **Metadata**:  
  - `creator_signature.json`  
  - `nft-example.json`  
- 🛠️ **Scripts**:  
  - `scripts/hash_and_embed.sh` (hashing + embedding)  
- 🔐 **CI/CD**:  
  - `.github/workflows/verify-and-sign.yml`  
- 🎨 **Examples**:  
  - `examples/` (artwork examples & usage guide)

---

## 📂 Repository Structure
```text
.
├── examples/              # Example artworks, with README
├── metadata/              # Signatures, example JSON, hashes
├── scripts/               # Hashing and embedding scripts
├── .github/workflows/     # CI automation
├── ART_LICENSE            # License for artworks
├── CODE_LICENSE           # MIT License for code
├── CITATION.cff           # Academic citation metadata
├── LICENSE                # General project license
├── msf-spec.md            # MSF technical specification
├── README.md              # Project overview (this file)
