

// Example 1A: Simple Calculation Function
// Problem: Create a function that calculates the area of a rectangle


// This function demonstrates the most basic structure
function calculateRectangleArea(length, width) {
    // Step 1: Understand what we're trying to accomplish
    // We need to multiply length by width to get area
    
    // Step 2: Perform the calculation
    const area = length * width;
    
    // Step 3: Return the result so it can be used elsewhere
    return area;
}

// Testing our function with different inputs
console.log("Area of 5x3 rectangle:", calculateRectangleArea(5, 3)); // Expected: 15
console.log("Area of 10x7 rectangle:", calculateRectangleArea(10, 7)); // Expected: 70

// THINKING EXERCISE: What happens if someone passes negative numbers?
// Try running: calculateRectangleArea(-5, 3)


// Example 1B: Function with Input Validation
// Problem: Improve the rectangle function to handle invalid inputs

function calculateRectangleAreaSafe(length, width) {
    // Step 1: Validate our inputs before doing any calculations
    // This is called "defensive programming" - always assume inputs might be wrong
    
    if (typeof length !== 'number' || typeof width !== 'number') {
        return "Error: Both length and width must be numbers";
    }
    
    if (length <= 0 || width <= 0) {
        return "Error: Length and width must be positive numbers";
    }
    
    // Step 2: Now we know our inputs are valid, so we can safely calculate
    const area = length * width;
    
    // Step 3: Return a meaningful result
    return The `area is ${area} square units`;
}

// Test with various inputs to see how validation works
console.log(calculateRectangleAreaSafe(5, 3));      // Good input
console.log(calculateRectangleAreaSafe(-5, 3));     // Negative number
console.log(calculateRectangleAreaSafe("5", 3));    // String instead of number
console.log(calculateRectangleAreaSafe());          // No parameters



// Example 1C: Function that Uses Other Functions
// Problem: Calculate the total cost of flooring for a room


// This demonstrates how functions can work together
// Each function has a single, clear responsibility

function calculateRectangleArea(length, width) {
    // We're reusing our previous function - this is good practice!
    if (length <= 0 || width <= 0) {
        return 0; // Return 0 for invalid dimensions
    }
    return length * width;
}

function calculateFlooringCost(roomLength, roomWidth, pricePerSquareUnit) {
    // Step 1: Calculate the room area using our existing function
    // This shows how functions can call other functions
    const roomArea = calculateRectangleArea(roomLength, roomWidth);
    
    // Step 2: Handle case where area calculation failed
    if (roomArea === 0) {
        return "Error: Invalid room dimensions";
    }
    
    // Step 3: Validate price input
    if (pricePerSquareUnit <= 0) {
        return "Error: Price per square unit must be positive";
    }
    
    // Step 4: Calculate total cost
    const totalCost = roomArea * pricePerSquareUnit;
    
    // Step 5: Return detailed information
    return {
        area: roomArea,
        pricePerUnit: pricePerSquareUnit,
        totalCost: totalCost,
        formattedCost:`$${totalCost.toFixed(2)}`
    };
}

// Usage examples showing different scenarios
const livingRoom = calculateFlooringCost(12, 15, 3.50);
console.log("Living room flooring:");
console.log(`Area: ${livingRoom.area} sq ft`);
console.log(`Cost: ${livingRoom.formattedCost}`);

const bathroom = calculateFlooringCost(8, 6, 5.25);
console.log("\nBathroom flooring:");
console.log(`Area: ${bathroom.area} sq ft`);
console.log(`Cost: ${bathroom.formattedCost}`);



// Advanced Function Examples - Building Complex Logic
// Example 1: Banking System Transaction Processor
// Problem: Build a complete banking transaction system with complex business logic



function processBankTransaction(account, transactionType, amount, metadata = {}) {
    console.log("=== STARTING TRANSACTION PROCESSING ===");
    
    // PHASE 1: INPUT VALIDATION AND SANITIZATION
    console.log("Phase 1: Validating inputs...");
    
    // Step 1a: Validate account structure
    if (!account || typeof account !== 'object') {
        return createErrorResponse("INVALID_ACCOUNT", "Account object is required");
    }
    
    // Step 1b: Validate required account properties
    const requiredProps = ['accountNumber', 'balance', 'accountType', 'status'];
    for (const prop of requiredProps) {
        if (!(prop in account)) {
            return createErrorResponse("MISSING_PROPERTY", `Account missing ${prop}`);
        }
    }
    
    // Step 1c: Validate transaction type
    const validTypes = ['deposit', 'withdrawal', 'transfer', 'fee'];
    if (!validTypes.includes(transactionType)) {
        return createErrorResponse("INVALID_TYPE", "Transaction type not supported");
    }
    
    // Step 1d: Validate and sanitize amount
    const sanitizedAmount = parseFloat(amount);
    if (isNaN(sanitizedAmount) || sanitizedAmount <= 0) {
        return createErrorResponse("INVALID_AMOUNT", "Amount must be positive number");
    }
    
    console.log(`✓ Inputs validated: ${transactionType} of $${sanitizedAmount}`);
    
    // PHASE 2: BUSINESS RULES AND POLICY CHECKS
    console.log("Phase 2: Checking business rules...");
    
    // Step 2a: Check account status
    if (account.status !== 'active') {
        return createErrorResponse("ACCOUNT_INACTIVE", "Account is not active");
    }
    
    // Step 2b: Daily transaction limits
    const dailyLimit = getDailyLimit(account.accountType);
    const todaysTransactions = metadata.todaysTotal || 0;
    
    if (todaysTransactions + sanitizedAmount > dailyLimit) {
        return createErrorResponse(
            "DAILY_LIMIT_EXCEEDED", 
            `Transaction would exceed daily limit of $${dailyLimit}`
        );
    }
    
    // Step 2c: Account type specific rules
    const typeSpecificCheck = validateAccountTypeRules(account, transactionType, sanitizedAmount);
    if (!typeSpecificCheck.success) {
        return typeSpecificCheck;
    }
    
    console.log("✓ Business rules passed");
    
    // PHASE 3: BALANCE CALCULATIONS AND PROCESSING
    console.log("Phase 3: Processing transaction...");
    
    const originalBalance = account.balance;
    let newBalance;
    let feeApplied = 0;
    
    // Step 3a: Calculate fees if applicable
    if (shouldApplyFee(account, transactionType, sanitizedAmount)) {
        feeApplied = calculateTransactionFee(account, transactionType, sanitizedAmount);
        console.log(`💰 Fee calculated: $${feeApplied}`);
    }
    
    // Step 3b: Process based on transaction type
    switch (transactionType) {
        case 'deposit':
            newBalance = originalBalance + sanitizedAmount - feeApplied;
            break;
        case 'withdrawal':
            const potentialBalance = originalBalance - sanitizedAmount - feeApplied;
            if (potentialBalance < 0 && !account.overdraftProtection) {
                return createErrorResponse(
                    "INSUFFICIENT_FUNDS", 
                    `Insufficient funds. Balance: $${originalBalance}, Required: $${sanitizedAmount + feeApplied}`
                );
            }
            newBalance = potentialBalance;
            break;
        case 'transfer':
            if (!metadata.targetAccount) {
                return createErrorResponse("MISSING_TARGET", "Target account required for transfer");
            }
            newBalance = originalBalance - sanitizedAmount - feeApplied;
            break;
        case 'fee':
            newBalance = originalBalance - sanitizedAmount;
            break;
    }
    
    console.log(`💳 Balance change: $${originalBalance} → $${newBalance}`);
    
    // PHASE 4: FRAUD DETECTION AND SECURITY CHECKS
    console.log("Phase 4: Security validation...");
    
    const fraudCheck = performFraudDetection(account, transactionType, sanitizedAmount, metadata);
    if (fraudCheck.riskLevel === 'HIGH') {
        return createErrorResponse(
            "FRAUD_DETECTED", 
            `Transaction flagged for manual review: ${fraudCheck.reason}`
        );
    }
    
    // PHASE 5: FINAL PROCESSING AND LOGGING
    console.log("Phase 5: Finalizing transaction...");
    
    const transactionId = generateTransactionId();
    const timestamp = new Date().toISOString();
    
    const transactionRecord = {
        id: transactionId,
        timestamp: timestamp,
        accountNumber: account.accountNumber,
        type: transactionType,
        amount: sanitizedAmount,
        fee: feeApplied,
        balanceBefore: originalBalance,
        balanceAfter: newBalance,
        status: 'completed',
        metadata: {
            ...metadata,
            fraudScore: fraudCheck.score,
            processingTimeMs: Date.now() - metadata.startTime
        }
    };
    
    console.log("=== TRANSACTION COMPLETED SUCCESSFULLY ===");
    
    return {
        success: true,
        transaction: transactionRecord,
        newBalance: newBalance,
        message: `${transactionType} of $${sanitizedAmount} processed successfully`
    };
}