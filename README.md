# 💸 Expense Tracker DApp – BlockBase Project (FEC Submission)

This is a decentralized expense tracking application built as part of the **BlockBase Project**, mentored by FEC. The DApp allows users to register using their Ethereum wallet and track group expenses, all powered by smart contracts on the Sepolia testnet.

---

## 🚀 Features Implemented

### ✅ Solidity Feature Implemented:
**getTotalRegistered()**
- Returns the total number of users registered on the platform.
- This function was added to the original smart contract:
```solidity
function getTotalRegistered() public view returns (uint) {
    return people.length;
}
```
