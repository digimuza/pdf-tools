
# PDF development and generation toolkit

This library helps with PDF generation tasks

## Installation

```bash
yarn add @digimuza/pdf-tools
```

## Make your first PDF

Developing PDF

```typescript
pdf.test.ts

export default [
    { content: "This is my pdf. Page 1", format: "A4" },
    { content: "This is my pdf. Page 2", format: "A4", landscape: true }
]
```

Watch PDF in browser environment

```bash
pdf --watch pdf.test.ts
```

```typescript
import { generate } from '@digimuza/pdf-tools'

async function generatePDF() {
    const file = await generate([{ content: "this is my pdf" }])
}
generatePDF()

```


## PDF development

This package ships with cli tool that helps pdf development


1. Create file sample.tsx

```ts
export default [{ content: "this is my pdf" }]
```

* Watch PDF generation with `yarn pdf-tools --watch sample.tsx`
* Build PDF with `yarn pdf-tools sample.tsx` define output `yarn pdf-tools --out ./sample.pdf sample.tsx`


To develop pdf you additionally can install `@digimuza/pdf-components` library to develop pdf using JSX

```tsx
import { page } from '@digimuza/pdf-components'
export default [
    page({
        content: <div class="bg-red-600">[PAGE 1] You can use tailwind for pdf styling</div>
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
    page({
        content: <div class="bg-red-600">[PAGE 2] Landscape mode</div>,
        format: 'A4',
        // Landscape mode
        landscape: true
    })
]
```

You can use PDF generation service


```tsx
import { page } from '@digimuza/pdf-components'

// pdf.template.tsx

export function myPdfTemplate() {
    return [
        page({
            content: <div class="bg-red-600">[PAGE 1] You can use tailwind for pdf styling</div>
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
        page({
            content: <div class="bg-red-600">[PAGE 2] Landscape mode</div>,
            format: 'A4',
            // Landscape mode
            landscape: true
        })
    ]
}
```


Run docker container

```shell
docker run @digimuza/pdf-service -p 3900 -v app:app
```


```ts
import axios from 'axios'
import { myPdfTemplate } from 'pdf.template'



async function main() {
    const file = await axios.post("http://localhost:3900", {
        data: myPdfTemplate(),
        name: "report/sample"
    })

    // Readable stream output
}
main()
```