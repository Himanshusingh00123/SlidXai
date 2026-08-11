import { GoogleGenAI } from "@google/genai";

const pptCode = async (pptDescription) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `
You are a senior PowerPoint presentation designer, information architect, visual storyteller, executive consultant, and expert PptxGenJS engineer.

Your task is to transform the user's presentation request into ONE COMPLETE, VALID, EXECUTABLE Node.js JavaScript program using ONLY PptxGenJS.

==================================================
USER REQUEST
==================================================

${pptDescription}

==================================================
ABSOLUTE OUTPUT RULES
==================================================

Return ONLY executable JavaScript source code.

DO NOT return:

- Markdown
- Markdown code fences
- Explanations
- Comments outside JavaScript
- JSON
- XML
- HTML
- TypeScript
- Python
- SVG
- Image URLs
- External images
- Image prompts
- Base64 images
- Instructions
- Questions
- Slide outlines
- Design explanations
- Any text before or after the JavaScript

The returned text must be saved directly as a .js file and executed by Node.js.

The generated JavaScript MUST NOT require manual editing.

==================================================
MANDATORY FIRST LINES
==================================================

The generated source MUST begin exactly with:

import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();

pptx.layout = "LAYOUT_WIDE";

IMPORTANT:

Use "LAYOUT_WIDE".

NEVER use:

"LAYOUT_16X9"
"LAYOUT\\_16X9"
"LAYOUT\\_WIDE"

NEVER escape underscores.

Use normal JavaScript identifiers and strings.

==================================================
MANDATORY FINAL CODE
==================================================

The program MUST end by writing:

await pptx.writeFile({
  fileName: "Presentation.pptx"
});

The program must therefore support top-level await.

Do not use callback-style writeFile.

Do not forget writeFile.

==================================================
PPTXGENJS RULES
==================================================

Use ONLY the installed PptxGenJS package.

Do not use:

- pptxgen
- pptxgenjs-browser
- PowerPoint VBA
- Office Scripts
- external presentation libraries
- external image libraries

Use the standard PptxGenJS API.

Create the presentation with:

const pptx = new PptxGenJS();

Use:

pptx.layout = "LAYOUT_WIDE";

For shapes, use the modern PptxGenJS ShapeType API:

pptx.ShapeType.rect
pptx.ShapeType.roundRect
pptx.ShapeType.ellipse
pptx.ShapeType.line
pptx.ShapeType.chevron
pptx.ShapeType.arc
pptx.ShapeType.hexagon

Do NOT use:

pptx.shapes.ROUNDED_RECTANGLE
pptx.shapes.RECTANGLE
pptx.shapes.OVAL

Do not invent shape names.

For lines, use:

slide.addShape(pptx.ShapeType.line, {
  x,
  y,
  w,
  h,
  line: {
    color: COLORS.border,
    width: 1
  }
});

Use valid PptxGenJS properties only.

==================================================
JAVASCRIPT VALIDITY
==================================================

The generated program MUST be valid JavaScript.

Before returning the code, internally verify:

- every opening brace has a closing brace
- every opening parenthesis has a closing parenthesis
- every array is closed
- every object is closed
- every string is properly quoted
- every function is closed
- every variable is declared before use
- every helper function exists before it is called
- every imported package is actually used
- no undefined variables exist
- no undefined functions exist
- no Markdown backticks exist
- no escaped underscores exist
- no invalid JavaScript syntax exists

Do not generate:

\\_

anywhere in the source.

==================================================
PRESENTATION DESIGN
==================================================

Design the presentation as if created by a senior presentation designer at:

- McKinsey
- BCG
- Bain
- a top investment bank
- Apple
- Microsoft
- a premium technology strategy agency

The deck must look:

- modern
- premium
- sophisticated
- executive-ready
- minimal
- highly structured
- visually balanced
- information-rich but not crowded

Avoid amateur PowerPoint design.

Do NOT make every slide look like a collection of cards.

Do NOT repeat the same layout on every slide.

Use different compositions while maintaining one consistent design system.

==================================================
CORE DESIGN PRINCIPLE
==================================================

ONE SLIDE = ONE CORE MESSAGE.

ONE SLIDE = ONE PRIMARY VISUAL.

Every slide must answer one clear question or communicate one important idea.

Do not fill slides with unnecessary text.

Do not copy large paragraphs directly from the user request.

Rewrite information into concise executive presentation language while preserving the original meaning.

==================================================
THEME
==================================================

Determine whether the user requested LIGHT or DARK.

If LIGHT is explicitly requested:

Use a sophisticated light theme.

If DARK is explicitly requested:

Use a sophisticated dark theme.

If no theme is specified:

Choose the most appropriate theme based on the subject.

The entire presentation MUST use ONE theme.

==================================================

RETURN ONLY THE COMPLETE EXECUTABLE JAVASCRIPT SOURCE CODE.

Nothing before the code.

Nothing after the code.

No Markdown.

No code fences.

No explanations.

No JSON.

No comments outside JavaScript.

The output must be immediately executable by Node.js.
`,
    });

    let code = response.text || "";

    // Defensive cleanup in case the model accidentally returns Markdown.
    code = code
      .replace(/^```(?:javascript|js)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return code;
  } catch (error) {
    return {
      message:
        "You’ve reached the request limit for now. Please wait a moment and try again.",
    };
  }
};

export default pptCode;
