import { GoogleGenAI } from "@google/genai";

const pptCode = async (pptDescription) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: `
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

Never mix light and dark slide backgrounds.

Create ONE centralized theme object:

const COLORS = {
  background: "...",
  surface: "...",
  surfaceAlt: "...",
  text: "...",
  muted: "...",
  primary: "...",
  secondary: "...",
  success: "...",
  warning: "...",
  danger: "...",
  border: "..."
};

All slides must use these theme constants.

Do not randomly introduce colors.

Use semantic colors only when they communicate meaning.

==================================================
TYPOGRAPHY
==================================================

Use PowerPoint-safe fonts only.

Preferred:

Aptos
Arial
Calibri

Recommended sizes:

Hero title: 34–44 pt
Slide title: 28–34 pt
Section label: 10–13 pt
Subtitle: 16–22 pt
Body: 14–18 pt
Small label: 9–12 pt

Never make normal body text smaller than 12 pt.

If content does not fit:

1. shorten the text
2. restructure the slide
3. split the content
4. use a better visual layout

NEVER solve overflow by using extremely small fonts.

==================================================
SLIDE 1
==================================================

Slide 1 MUST ALWAYS be the title/introduction slide.

It must contain:

1. Strong presentation title
2. Concise subtitle
3. Clear value proposition or context
4. One sophisticated native PowerPoint visual

The title must be directly derived from the user's request.

Do not use generic titles such as:

"Presentation"
"AI Presentation"
"Business Presentation"
"Overview"

Create a premium hero composition.

The hero visual MUST use native PowerPoint shapes only.

Examples:

- geometric system
- abstract network
- layered architecture
- data flow
- connected nodes
- strategic framework
- elegant geometric composition

Do NOT use external images.

==================================================
NATIVE VISUALS ONLY
==================================================

Do not use external images.

Do not use:

- image URLs
- remote images
- stock images
- downloaded images
- image prompts
- SVG files
- base64 images

Create visuals using:

- shapes
- text
- lines
- arrows
- connectors
- charts
- tables
- diagrams
- native PowerPoint objects

Every visual must communicate information.

Do not add decorative shapes without purpose.

==================================================
CONTENT → VISUAL MAPPING
==================================================

Use the appropriate visual for the content.

SYSTEM / ARCHITECTURE
→ architecture diagram

PROCESS / WORKFLOW
→ connected process flow

TIMELINE
→ horizontal timeline

ROADMAP
→ milestone roadmap

COMPARISON
→ side-by-side comparison

BEFORE / AFTER
→ transformation layout

NUMERICAL DATA
→ KPI, chart, or data visualization

MULTIPLE DIMENSIONS
→ matrix

HIERARCHY
→ layered diagram

STRATEGY
→ strategic framework

FUNNEL
→ funnel visualization

CYCLE
→ circular process

RELATIONSHIPS
→ connected-node diagram

CONCLUSION
→ strong executive takeaway

Do not create charts when the user did not provide numerical data.

Never invent statistics.

==================================================
DATA INTEGRITY
==================================================

The user's request is the source of truth.

Preserve:

- names
- dates
- numbers
- terminology
- technical concepts
- factual meaning

NEVER invent:

- statistics
- percentages
- market sizes
- revenue
- financial figures
- dates
- research findings
- company facts
- citations
- scientific claims

If information is missing, use conceptual visuals rather than fabricated data.

==================================================
SLIDE COUNT
==================================================

If the user explicitly specifies the number of slides:

Generate EXACTLY that number.

If no slide count is specified:

Choose a reasonable number based on the complexity of the request.

Do not create unnecessary slides.

Every slide must contribute to the narrative.

==================================================
SLIDE STRUCTURE
==================================================

Create a logical narrative:

Slide 1:
Introduction / title

Following slides:
Context
Problem
Insight
Evidence
Framework
Process
Comparison
Strategy
Recommendation
Conclusion

Use only the slides that are appropriate for the user's topic.

Do not mechanically use this exact sequence.

==================================================
LAYOUT VARIETY
==================================================

Use a variety of professional layouts.

Possible layouts:

- title + hero visual
- split screen
- large statistic
- KPI dashboard
- comparison
- before/after
- process flow
- architecture
- framework
- matrix
- timeline
- roadmap
- funnel
- layered model
- executive takeaway
- conclusion

Do not repeat the same composition more than necessary.

==================================================
SPACING AND GRID
==================================================

Use a consistent 16:9 slide grid.

Keep generous margins.

Recommended safe area:

left margin: approximately 0.6–0.8
right margin: approximately 0.6–0.8
top margin: approximately 0.4–0.6
bottom margin: approximately 0.4–0.6

Keep all content inside the slide.

Standard widescreen dimensions are approximately:

13.333 x 7.5

Never place objects outside these boundaries.

Avoid object overlap.

==================================================
REUSABLE HELPERS
==================================================

Create reusable helper functions when useful.

Examples:

setBackground()
addHeader()
addFooter()
addSectionLabel()
addKpi()
addCard()
addBadge()
addDiagramNode()
addArrow()
addTimelineItem()
addCallout()
addTextBlock()

Every helper MUST:

- be fully defined
- use valid PptxGenJS APIs
- receive valid parameters
- be called correctly

Do not create unused helpers unnecessarily.

==================================================
TEXT
==================================================

Use concise executive language.

Prefer:

short statements
short labels
clear hierarchy
strong keywords
meaningful numbers

Avoid:

large paragraphs
repetitive sentences
unnecessary explanations
wall-of-text slides

Use bold text strategically.

==================================================
CARDS
==================================================

Cards may be used when appropriate.

Do NOT create a card for every piece of information.

Avoid repetitive:

card
card
card
card

Use cards only when they improve grouping or comparison.

==================================================
SHADOWS
==================================================

Use shadows sparingly.

Avoid excessive shadows.

==================================================
FOOTERS
==================================================

Use subtle professional footers where useful.

Possible footer:

Presentation title | Section | Page number

Keep footer text small and unobtrusive.

==================================================
CHARTS
==================================================

Only create charts when real numerical data is provided.

Use native PptxGenJS charts.

Do not fabricate data.

Do not create meaningless charts.

==================================================
TABLES
==================================================

Use tables only when they improve comparison or structured information.

Keep tables clean.

Avoid dense spreadsheet-like slides.

==================================================
DIAGRAMS
==================================================

For processes and systems, prefer diagrams over paragraphs.

Use:

- nodes
- arrows
- connectors
- labels
- stages
- grouping
- hierarchy

Make the flow direction immediately obvious.

==================================================
EXECUTIVE QUALITY CHECK
==================================================

Before returning the source code, internally verify every requirement.

Verify:

1. First line is exactly:
   import PptxGenJS from "pptxgenjs";

2. Second line creates:
   const pptx = new PptxGenJS();

3. Layout is exactly:
   pptx.layout = "LAYOUT_WIDE";

4. No LAYOUT_16X9 exists.

5. No escaped underscore exists.

6. No Markdown code fences exist.

7. No external images exist.

8. No image URLs exist.

9. No undefined variables exist.

10. No undefined functions exist.

11. No unsupported APIs are used.

12. All shapes use valid pptx.ShapeType values.

13. All slides fit inside 13.333 x 7.5.

14. No intentional object overlap exists.

15. Text remains readable.

16. Theme is consistent.

17. Slide 1 is a premium introduction.

18. Every slide has one core message.

19. Every slide has an appropriate visual.

20. No statistics are invented.

21. Requested slide count is respected.

22. JavaScript syntax is valid.

23. The presentation creates a real PPTX.

24. The final writeFile call exists.

25. The generated source can be saved directly as:
   presentation.js

26. The generated source can be executed directly with:
   node presentation.js

==================================================
FINAL REQUIREMENT
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

    let code = interaction.output_text;

    // Defensive cleanup in case the model accidentally returns Markdown.
    code = code
      .replace(/^```(?:javascript|js)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return code;
  } catch (error) {
    return {
      error: error,
      message:
        "You’ve reached the request limit for now. Please wait a moment and try again.",
    };
  }
};

export default pptCode;
