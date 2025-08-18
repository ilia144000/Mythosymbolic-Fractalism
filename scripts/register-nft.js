// Simple registry appender for MSF NFTs
// Usage via GitHub Actions inputs or local CLI.

const fs = require("fs");
const path = require("path");

function getArg(flag, fallback = null) {
  const idx = process.argv.indexOf(flag);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  const envKey = flag.replace(/^--/, "").toUpperCase().replace(/-/g, "_");
  if (process.env[envKey]) return process.env[envKey];
  return fallback;
}

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

const tokenId  = getArg("--token-id");
const tokenUri = getArg("--token-uri");
const mediaUri = getArg("--media-uri");
const txHash   = getArg("--tx");
const mintedAt = getArg("--minted-at");
const network  = getArg("--network", "polygon");
const contract = getArg("--contract");

if (!tokenId)  fail("Missing --token-id");
if (!tokenUri) fail("Missing --token-uri");
if (!mediaUri) fail("Missing --media-uri");
if (!txHash)   fail("Missing --tx");
if (!mintedAt) fail("Missing --minted-at (ISO-8601)");
if (!contract) fail("Missing --contract");

const REGISTRY_PATH = path.join(process.cwd(), "registry.json");

let registry = [];
if (fs.existsSync(REGISTRY_PATH)) {
  try {
    registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    if (!Array.isArray(registry)) throw new Error("registry.json must be an array");
  } catch (e) {
    fail(`registry.json parse error: ${e.message}`);
  }
}

const exists = registry.find(
  r => (String(r.contract_address || r.contract).toLowerCase() === String(contract).toLowerCase())
    && String(r.token_id) === String(tokenId)
);
if (exists) fail(`Entry already exists for contract ${contract} token_id ${tokenId}`);

const record = {
  token_id: isNaN(Number(tokenId)) ? tokenId : Number(tokenId),
  token_uri: tokenUri,
  media_uri: mediaUri,
  minted_at: mintedAt,
  transaction_hash: txHash,
  network,
  contract_address: contract
};

registry.push(record);
fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n", "utf8");
console.log("✅ Appended to registry.json:", record);
