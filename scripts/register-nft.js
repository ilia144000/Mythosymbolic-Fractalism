#!/usr/bin/env node
/**
 * Append a single NFT record into registry.json (root).
 * Works with GitHub Actions inputs (register-nft.yml) or local CLI.
 *
 * Usage (local):
 *   node scripts/register-nft.js \
 *     --token-id 40 \
 *     --token-uri ipfs://... \
 *     --media-uri ipfs://... \
 *     --tx 0x... \
 *     --minted-at 2025-08-18T05:46:00Z \
 *     --network polygon \
 *     --contract 0xYourContract
 */

const fs = require("fs");
const path = require("path");

// --- helpers ---------------------------------------------------------------
function getArg(flag, fallback = null) {
  const i = process.argv.indexOf(flag);
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  const envKey = flag.replace(/^--/, "").toUpperCase().replace(/-/g, "_");
  if (process.env[envKey]) return process.env[envKey];
  return fallback;
}

function fail(msg) {
  console.error("❌ " + msg);
  process.exit(1);
}

function isIpfsUri(v) {
  return /^ipfs:\/\/(Qm|bafy)[A-Za-z0-9]+(\S*)?$/.test(v || "");
}

function isAddress(v) {
  return /^0x[a-fA-F0-9]{40}$/.test(v || "");
}

function isTx(v) {
  return /^0x[a-fA-F0-9]{64}$/.test(v || "");
}

function isIso8601(v) {
  // Basic check; workflow already validates, this is a safety net.
  return !isNaN(Date.parse(v || ""));
}

// --- inputs ----------------------------------------------------------------
const tokenId   = getArg("--token-id");
const tokenUri  = getArg("--token-uri");
const mediaUri  = getArg("--media-uri");
const txHash    = getArg("--tx");
const mintedAt  = getArg("--minted-at");
const network   = getArg("--network", "polygon");
const contract  = getArg("--contract");

// --- minimal validation (defensive; main validation is in the workflow) ----
if (!tokenId) fail("Missing --token-id");
if (!tokenUri || !isIpfsUri(tokenUri)) fail("Missing/invalid --token-uri (ipfs://...)");
if (!mediaUri || !isIpfsUri(mediaUri)) fail("Missing/invalid --media-uri (ipfs://...)");
if (!txHash || !isTx(txHash)) fail("Missing/invalid --tx (0x...)");
if (!mintedAt || !isIso8601(mintedAt)) fail("Missing/invalid --minted-at (ISO-8601)");
if (!contract || !isAddress(contract)) fail("Missing/invalid --contract (0x...)");

// --- load or init registry --------------------------------------------------
const REG_PATH = path.join(process.cwd(), "registry.json");
let registry = [];
if (fs.existsSync(REG_PATH)) {
  try {
    const raw = fs.readFileSync(REG_PATH, "utf8").trim();
    registry = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(registry)) throw new Error("registry.json must be a JSON array");
  } catch (e) {
    fail("registry.json parse error: " + e.message);
  }
}

// --- prevent duplicates (by contract + token_id) ---------------------------
const exists = registry.find(
  (r) =>
    String((r.contract_address || r.contract) || "").toLowerCase() === String(contract).toLowerCase() &&
    String(r.token_id) === String(tokenId)
);
if (exists) fail(`Entry already exists for contract ${contract} token_id ${tokenId}`);

// --- build record -----------------------------------------------------------
const record = {
  token_id: isNaN(Number(tokenId)) ? tokenId : Number(tokenId),
  token_uri: tokenUri,
  media_uri: mediaUri,
  minted_at: mintedAt,           // ISO-8601 (UTC recommended)
  transaction_hash: txHash,
  network,
  contract_address: contract
};

// Optional: keep a stable sort (by minted_at asc, fallback by token_id)
registry.push(record);
registry.sort((a, b) => {
  const ta = Date.parse(a.minted_at || "") || 0;
  const tb = Date.parse(b.minted_at || "") || 0;
  if (ta !== tb) return ta - tb;
  const ia = String(a.token_id), ib = String(b.token_id);
  return ia.localeCompare(ib, "en", { numeric: true });
});

// --- write pretty JSON ------------------------------------------------------
fs.writeFileSync(REG_PATH, JSON.stringify(registry, null, 2) + "\n", "utf8");
console.log("✅ Appended to registry.json:");
console.log(record);
