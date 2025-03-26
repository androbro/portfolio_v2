# Testing Guidelines

## Test Structure

- Use Jest and React Testing Library for tests
- Place test files alongside the component/function to test (e.g., `Button.tsx` and `Button.test.tsx`)
- Follow the Arrange-Act-Assert pattern
- Use descriptive test names

## Component Testing

For React components, focus on testing behavior, not implementation details:

```tsx
// components/ui/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders with default props", () => {
    // Arrange
    render(<Button>Click me</Button>);
    
    // Act
    const button = screen.getByRole("button", { name: /click me/i });
    
    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });
  
  test("applies custom className", () => {
    // Arrange
    render(<Button className="test-class">Click me</Button>);
    
    // Assert
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });
  
  test("calls onClick handler when clicked", () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    // Act
    fireEvent.click(screen.getByRole("button"));
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test("renders as disabled when disabled prop is true", () => {
    // Arrange
    render(<Button disabled>Click me</Button>);
    
    // Assert
    expect(screen.getByRole("button")).toBeDisabled();
  });
  
  test("applies variant classes correctly", () => {
    // Arrange
    render(<Button variant="destructive">Delete</Button>);
    
    // Assert
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
```

## Hook Testing

For testing custom hooks:

```tsx
// hooks/useToggle.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  test("should initialize with default value (false)", () => {
    // Arrange & Act
    const { result } = renderHook(() => useToggle());
    
    // Assert
    expect(result.current[0]).toBe(false);
  });
  
  test("should initialize with the provided value", () => {
    // Arrange & Act
    const { result } = renderHook(() => useToggle(true));
    
    // Assert
    expect(result.current[0]).toBe(true);
  });
  
  test("should toggle the value when toggle function is called", () => {
    // Arrange
    const { result } = renderHook(() => useToggle(false));
    
    // Act
    act(() => {
      result.current[1]();
    });
    
    // Assert
    expect(result.current[0]).toBe(true);
    
    // Act again
    act(() => {
      result.current[1]();
    });
    
    // Assert again
    expect(result.current[0]).toBe(false);
  });
});
```

## Utility Function Testing

For testing utility functions:

```tsx
// utils/formatDate.test.ts
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  test("formats date in the expected format", () => {
    // Arrange
    const date = new Date("2023-01-15T12:30:00Z");
    
    // Act
    const result = formatDate(date);
    
    // Assert
    expect(result).toBe("Jan 15, 2023");
  });
  
  test("handles string date input", () => {
    // Act
    const result = formatDate("2023-01-15T12:30:00Z");
    
    // Assert
    expect(result).toBe("Jan 15, 2023");
  });
  
  test("returns 'Invalid date' for invalid input", () => {
    // Act
    const result = formatDate("not-a-date");
    
    // Assert
    expect(result).toBe("Invalid date");
  });
});
```

## Testing API Calls

Mock API calls with Jest:

```tsx
// services/api.test.ts
import { fetchProjects } from "./api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test("fetchProjects returns data on successful fetch", async () => {
    // Arrange
    const mockProjects = [
      { id: "1", title: "Project 1" },
      { id: "2", title: "Project 2" }
    ];
    
    // Mock fetch implementation
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });
    
    // Act
    const result = await fetchProjects();
    
    // Assert
    expect(result).toEqual(mockProjects);
    expect(global.fetch).toHaveBeenCalledWith("/api/projects");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  
  test("fetchProjects throws error on fetch failure", async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found"
    });
    
    // Act & Assert
    await expect(fetchProjects()).rejects.toThrow("HTTP error! Status: 404");
    expect(global.fetch).toHaveBeenCalledWith("/api/projects");
  });
});
```

## Integration Testing

Use integration tests to test how multiple components work together:

```tsx
// features/projects/ProjectList.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectList } from "./ProjectList";
import * as api from "@/services/api";

// Mock the API module
jest.mock("@/services/api");

describe("ProjectList", () => {
  const mockProjects = [
    { id: "1", title: "Project 1", description: "Description 1" },
    { id: "2", title: "Project 2", description: "Description 2" }
  ];
  
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test("renders loading state initially", () => {
    // Arrange
    (api.fetchProjects as jest.Mock).mockResolvedValueOnce(mockProjects);
    
    // Act
    render(<ProjectList />);
    
    // Assert
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  
  test("renders projects after loading", async () => {
    // Arrange
    (api.fetchProjects as jest.Mock).mockResolvedValueOnce(mockProjects);
    
    // Act
    render(<ProjectList />);
    
    // Assert
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(api.fetchProjects).toHaveBeenCalledTimes(1);
  });
  
  test("renders error message when API call fails", async () => {
    // Arrange
    const errorMessage = "Failed to fetch projects";
    (api.fetchProjects as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
    // Act
    render(<ProjectList />);
    
    // Assert
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
```

## Test Best Practices

1. **Focus on user behavior**
   - Test from the user's perspective
   - Use `getByRole`, `getByLabelText`, etc. instead of `getByTestId`
   - Write tests that verify behavior, not implementation details

2. **Keep tests independent**
   - Each test should be self-contained
   - Avoid shared state between tests
   - Reset mocks between tests

3. **Use meaningful assertions**
   - Test the right aspects of the component/function
   - Include positive and negative test cases
   - Test edge cases and error paths

4. **Maintain test readability**
   - Use descriptive test names
   - Follow the Arrange-Act-Assert pattern
   - Extract repeated setup code into helper functions

5. **Run tests as part of CI/CD**
   - Run tests automatically on each commit
   - Include test coverage metrics
   - Fail builds when tests fail 