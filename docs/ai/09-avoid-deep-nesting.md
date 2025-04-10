# AI Development Rule: Avoid Deep Nesting

**Goal:** Improve code readability and maintainability by minimizing nested code blocks.

**Principle:**

Deeply nested code (e.g., multiple nested `if` statements, complex logic within loops or callbacks) makes it difficult for readers to follow the logic and increases the mental overhead required to understand the code's purpose.

As highlighted in "The 3 Laws of Writing Readable Code" [1], avoiding deep nesting is crucial for clean programming.

**Guidelines:**

1.  **Use Early Returns (Guard Clauses):** Check for invalid conditions or edge cases at the beginning of a function and return early. This prevents the main logic from being nested within multiple `if` statements.

    *Example (from [1]):*
    ```typescript
    function processData(data) {
      if (!data) {
        return null; // Early return for invalid input
      }
      if (!data.isValid) {
         throw new Error("Invalid data"); // Early exit on error condition
      }

      // --- Main logic proceeds here without extra nesting --- 
      const result = data.value * 2;
      return result;
    }
    ```

2.  **Extract Complex Logic into Functions:** If a block of code within a loop, conditional, or callback becomes complex, extract it into a separate, well-named function. This improves readability and promotes reusability.

    *Example (Conceptual):*
    ```typescript
    // Instead of:
    items.map(item => {
      if (item.conditionA) {
        // Complex logic A...
        if (item.conditionB) {
           // More complex logic B...
           return complexResultB;
        }
        return complexResultA;
      }
      return defaultResult;
    });

    // Prefer:
    function processSingleItem(item) {
       if (!item.conditionA) return defaultResult;
       
       if (item.conditionB) {
          // Logic B...
          return complexResultB;
       }
       // Logic A...
       return complexResultA;
    }

    items.map(processSingleItem);
    ```

3.  **Extract Components (React/UI):** In UI components (like React), if JSX within a `map` or conditional rendering becomes deeply nested or contains significant logic, extract it into a dedicated child component. Pass necessary data and callbacks as props.

    *See the refactoring of `ProjectsClient.tsx` into `ProjectItemCard.tsx` as an example of this.* 

4.  **Limit Indentation Levels:** As a general guideline, try to keep the maximum indentation level low (e.g., ideally no more than 2-3 levels deep). If you find yourself exceeding this, it's often a sign that refactoring is needed.

**Benefits:**

*   **Improved Readability:** Flatter code structure is easier to follow.
*   **Reduced Complexity:** Breaks down complex operations into smaller, manageable units.
*   **Easier Maintenance:** Changes are localized to smaller functions or components.
*   **Increased Testability:** Smaller, focused functions are easier to unit test.

**References:**

[1] JenuelDev Blog. "The 3 Laws of Writing Readable Code: A Guide to Clean Programming". [https://blog.jenuel.dev/blog/The-3-Laws-of-Writing-Readable-Code-A-Guide-to-Clean-Programming](https://blog.jenuel.dev/blog/The-3-Laws-of-Writing-Readable-Code-A-Guide-to-Clean-Programming) 