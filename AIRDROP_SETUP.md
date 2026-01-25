# Airdrop Excel Setup Guide

## How to Create Your Airdrop Excel File

### File Location
Place your Excel file at: `public/airdrop_list.xlsx`

### Required Columns

Your Excel spreadsheet should have the following columns:

| Column Name | Data Type | Example | Required |
|------------|-----------|---------|----------|
| wallet_address | Text | `EPjFWaQbgjtgTt3g6X7Q1PmUv3C8KKo` | ✅ Yes |
| eligible_amount | Text/Number | `1000` or `1000 $APC` | ⭕ Optional |
| added_date | Date (optional) | `2026-01-24` | ⭕ Optional |

### Example Excel Data

Here's what your spreadsheet should look like:

```
wallet_address                          | eligible_amount | added_date
EPjFWaQbgjtgTt3g6X7Q1PmUv3C8KKo       | 1000 $APC       | 2026-01-24
8sHBAP2Z8kTFd92FpenyziMjhWmZqkXy7B5x  | 500 $APC        | 2026-01-24
9B2sFZKmFKXvKN7y6L9s8Q2z4V5T6U8K9M0L  | 750 $APC        | 2026-01-24
```

### Setup Instructions

1. **Create a new Excel file** (`.xlsx` format)
2. **Add column headers** in the first row:
   - Column A: `wallet_address`
   - Column B: `eligible_amount`
   - Column C: `added_date` (optional)

3. **Add eligible wallet addresses** starting from row 2
   - Make sure wallet addresses are in the correct Solana format
   - They should be 43-44 characters long
   - Use base58 characters only (no lowercase 'l', uppercase 'O', uppercase 'I', '0')

4. **Save the file** as `airdrop_list.xlsx`

5. **Place it in the public folder**:
   ```
   project-root/
   └── public/
       └── airdrop_list.xlsx  ← Your file goes here
   ```

6. **Restart your development server** (the API will reload the Excel data on first request)

### Tips & Best Practices

- **Wallet Address Validation**: The system will only accept valid Solana addresses (44 characters, base58 encoding)
- **Case Insensitive**: Wallet addresses are checked case-insensitively, so uppercase and lowercase don't matter
- **Caching**: The Excel file is cached in memory for 5 minutes for performance. If you update the file, the cache will refresh automatically
- **Large Lists**: For lists with thousands of wallets, the system creates an optimized lookup map for fast O(1) searches
- **Error Handling**: If the Excel file is missing or has errors, users will see an appropriate error message

### Common Issues & Solutions

**Problem**: "File not found" error
- **Solution**: Make sure the file is named exactly `airdrop_list.xlsx` and placed in the `public` folder

**Problem**: Wallet addresses not being found
- **Solution**: Check that addresses are spelled correctly and in the correct format (44 characters, base58)
- The system normalizes addresses to lowercase, so case doesn't matter, but formatting does

**Problem**: Want to update the eligible list?
- **Solution**: Just update the Excel file and the system will reload it on the next API call (cache expires after 5 minutes, or you can restart the server)

### API Response Examples

**Success Response**:
```json
{
  "isEligible": true,
  "amount": "1000 $APC",
  "message": "✅ Big news! Your wallet correct! You go get airdrop - 1000 $APC"
}
```

**Not Found Response**:
```json
{
  "isEligible": false,
  "message": "❌ Sorry, your address no be for the airdrop list. No worry, follow us for next one!"
}
```

**Invalid Address Response**:
```json
{
  "isEligible": false,
  "message": "❌ Wallet address no valid. Make sure the address correct and long enough."
}
```

## Testing the Setup

1. Create the Excel file with test wallet addresses
2. Place it in `public/airdrop_list.xlsx`
3. Visit your website and go to the "Get Airdrop" section
4. Try entering one of your test wallet addresses
5. You should see a success message if the setup is correct

Enjoy! 🎉
