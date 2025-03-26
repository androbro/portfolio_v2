# CSS-in-JavaScript Guidelines

CSS-in-JavaScript is a modern approach to styling React components where CSS is written directly in JavaScript files. This approach offers several advantages over traditional CSS files:

- **Scoped styles**: Styles are scoped to specific components, preventing naming collisions
- **Dynamic styling**: Styles can respond to props and state
- **Co-location**: Styles live alongside component logic
- **Type safety**: Some libraries offer TypeScript support
- **Dead code elimination**: Unused styles are automatically removed

## Recommended Libraries

### 1. Styled Components

The most popular choice with the largest community:

```tsx
// components/Button/styles.ts
import styled from 'styled-components';

export const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' && `
    background-color: #0070f3;
    color: white;
    border: none;
    
    &:hover {
      background-color: #0060df;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: #0070f3;
    border: 1px solid #0070f3;
    
    &:hover {
      background-color: rgba(0, 112, 243, 0.05);
    }
  `}
`;

// components/Button/Button.tsx
import { StyledButton } from './styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
```

### 2. Emotion

A flexible and performant library:

```tsx
// components/Card/styles.ts
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const cardStyles = css`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const CardContainer = styled.div`
  ${cardStyles}
  background-color: white;
`;

export const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #eaeaea;
`;

export const CardContent = styled.div`
  padding: 20px;
`;

// components/Card/Card.tsx
import { CardContainer, CardHeader, CardContent } from './styles';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <CardContainer>
      {title && (
        <CardHeader>
          <h3>{title}</h3>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}
```

### 3. Tailwind CSS with CSS Modules

For projects using Tailwind, you can combine it with CSS modules for component-specific styles:

```tsx
// components/Alert/Alert.module.css
.alert {
  @apply p-4 mb-4 rounded-md;
}

.success {
  @apply bg-green-50 text-green-800 border border-green-200;
}

.error {
  @apply bg-red-50 text-red-800 border border-red-200;
}

.warning {
  @apply bg-yellow-50 text-yellow-800 border border-yellow-200;
}

.info {
  @apply bg-blue-50 text-blue-800 border border-blue-200;
}

// components/Alert/Alert.tsx
import styles from './Alert.module.css';
import { cn } from '@/utils/cn';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type, children, className }: AlertProps) {
  return (
    <div className={cn(styles.alert, styles[type], className)}>
      {children}
    </div>
  );
}
```

## Best Practices for CSS-in-JavaScript

1. **Separate style definitions from components**
   - Put styles in a separate file (e.g., `styles.ts` or `styles.js`)
   - This keeps component logic clean and focused

2. **Use theme variables**
   - Define a theme object with colors, spacing, typography, etc.
   - Reference these variables in your styles for consistency

   ```tsx
   // theme.ts
   export const theme = {
     colors: {
       primary: '#0070f3',
       secondary: '#ff0080',
       text: '#333',
       background: '#fff',
     },
     space: {
       sm: '8px',
       md: '16px',
       lg: '24px',
     },
     borderRadius: {
       sm: '4px',
       md: '8px',
       lg: '16px',
     },
   };
   
   // styles.ts
   import styled from 'styled-components';
   import { theme } from '@/theme';
   
   export const Button = styled.button`
     background-color: ${theme.colors.primary};
     padding: ${theme.space.sm} ${theme.space.md};
     border-radius: ${theme.borderRadius.sm};
   `;
   ```

3. **Create reusable style helpers**
   - Extract common style patterns into reusable functions
   - This reduces duplication and promotes consistency

   ```tsx
   // styles/mixins.ts
   import { css } from 'styled-components';
   
   export const flexCenter = css`
     display: flex;
     align-items: center;
     justify-content: center;
   `;
   
   export const truncateText = css`
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
   `;
   
   // component styles
   import styled from 'styled-components';
   import { flexCenter, truncateText } from '@/styles/mixins';
   
   export const Container = styled.div`
     ${flexCenter}
     width: 100%;
   `;
   
   export const Title = styled.h2`
     ${truncateText}
     max-width: 200px;
   `;
   ```

4. **Use TypeScript with CSS-in-JS libraries**
   - Take advantage of type safety for props and theme values
   - This helps catch styling errors early

5. **Implement responsive styles**
   - Use media queries or responsive helpers provided by your CSS-in-JS library
   - Create a consistent approach to responsive design

   ```tsx
   // styles/media.ts
   const sizes = {
     mobile: '576px',
     tablet: '768px',
     desktop: '1024px',
   };
   
   export const media = {
     mobile: `@media (max-width: ${sizes.mobile})`,
     tablet: `@media (min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
     desktop: `@media (min-width: ${sizes.desktop})`,
   };
   
   // component styles
   import styled from 'styled-components';
   import { media } from '@/styles/media';
   
   export const Container = styled.div`
     display: grid;
     grid-template-columns: 1fr;
     
     ${media.tablet} {
       grid-template-columns: 1fr 1fr;
     }
     
     ${media.desktop} {
       grid-template-columns: repeat(3, 1fr);
     }
   `;
   ``` 