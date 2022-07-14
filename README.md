
# PDF development and generation toolkit

PDF generation utility. Create and generate pdf using **JSX**

## Installation

```bash
yarn add @digimuza/pdf-tools
```

## Make your first PDF

Create simple tsx file with default export. This will generate PDF with 2 pages.

You can use page function from [`@digimuza/pdf-components`]('asd') this function will provide JSX and tailwind support


```tsx
// sample.tsx
import { page } from '@digimuza/pdf-components'
export default [
    page({
        content: <div class="bg-red-600">[PAGE 1] You can use tailwind for pdf styling</div>,
    }),
    page({
        content: <div class="bg-red-600">[PAGE 1] You can use tailwind for pdf styling</div>,
        // default format will be A4
    }),
    page({
        content: <div class="bg-red-600">[PAGE 2] You can export multiple pages</div>,
        format: 'A5',
    }),
    page({
        content: <div class="bg-red-600">[PAGE 2] You can export multiple pages</div>,
        // Define custom pdf dimensions in millimeters
        format: { height: 200, width: 200 },
    }),
    { content: "This is my pdf. Page 2", format: "A4", landscape: true }
]
```

Develop your PDF with live reloading

```bash
yarn pdf-tools --watch --file sample.tsx
```

When you finished with you pdf
```typescript
import { generate } from '@digimuza/pdf-tools'

async function generatePDF() {
    const file = await generate([{ content: "this is my pdf" }])
}
generatePDF()

```

Or build pdf with CLI tool

```bash
yarn pdf-tools --file sample.tsx --out sample.pdf
```
