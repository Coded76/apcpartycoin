import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Path to store collected wallet addresses as JSON
const getAirdropFilePath = () => join(process.cwd(), 'public', 'airdrop_wallets.json');

// Load existing wallet data
function loadAirdropWallets() {
  const filePath = getAirdropFilePath();
  try {
    if (existsSync(filePath)) {
      const data = readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading airdrop wallets:', error);
  }
  return [];
}

// Save wallet to the list
function saveAirdropWallet(walletAddress) {
  try {
    const filePath = getAirdropFilePath();
    const wallets = loadAirdropWallets();
    
    // Normalize address (lowercase, trim)
    const normalizedAddress = walletAddress.toLowerCase().trim();
    
    // Check if wallet already exists
    const exists = wallets.some(w => w.address.toLowerCase() === normalizedAddress);
    if (exists) {
      return { success: false, message: '⚠️ This wallet already saved before abeg. No need double registration.' };
    }
    
    // Add new wallet with timestamp
    wallets.push({
      address: walletAddress.trim(),
      registeredDate: new Date().toISOString(),
    });
    
    // Save back to file
    writeFileSync(filePath, JSON.stringify(wallets, null, 2));
    
    return { success: true, message: '✅ Loud and clear! We don save your wallet. When the time come for airdrop, we go send am to this address!' };
  } catch (error) {
    console.error('Error saving airdrop wallet:', error);
    return { success: false, message: '❌ Something go wrong on our side. Try again later please.' };
  }
}

export async function POST(req) {
  try {
    const { walletAddress } = await req.json();

    // Validate input
    if (!walletAddress || typeof walletAddress !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          message: '❌ Please provide a valid wallet address.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Basic Solana address validation (44 characters, base58)
    const solanaAddressRegex = /^[1-9A-HJ-NP-Z]{43,44}$/;
    const trimmedAddress = walletAddress.trim();

    if (!solanaAddressRegex.test(trimmedAddress)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: '❌ Wallet address no valid. Make sure the address correct and long enough (44 characters).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Save the wallet address
    const result = saveAirdropWallet(trimmedAddress);

    return new Response(
      JSON.stringify(result),
      {
        status: result.success ? 200 : 409,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in collect-airdrop API:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: '❌ Something go wrong on our side. Try again later please.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
