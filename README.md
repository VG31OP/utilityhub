# 🛠️ UtilityHub — The Ultimate All-in-One Online Toolkit

> **Every tool an online human needs, all in one place. No subscriptions, no telemetry, 100% fast, client-side, and free.**

![UtilityHub Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

UtilityHub is a modern, high-performance web platform featuring **100+ fully-functional interactive tools** across 11 major categories. Built with Next.js (App Router), Vanilla CSS design system, Lucide icons, and optimized for instant static execution.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to access the complete hub.

---

## 📦 100+ Built-in Tools by Category

### 1. 📝 Text Tools (12 Tools)
- **[Word & Character Counter](file:///e:/Project/utility/src/app/tools/text/word-counter/page.js)**: Words, characters, spaces, sentences, paragraphs, reading and speaking time.
- **[Case Converter](file:///e:/Project/utility/src/app/tools/text/case-converter/page.js)**: UPPERCASE, lowercase, Title Case, sentence case, camelCase, snake_case, kebab-case.
- **[Lorem Ipsum Generator](file:///e:/Project/utility/src/app/tools/text/lorem-ipsum/page.js)**: Paragraphs, sentences, and word counts.
- **[Text Diff Checker](file:///e:/Project/utility/src/app/tools/text/text-diff/page.js)**: Word-by-word and character difference highlighting.
- **[Markdown Editor](file:///e:/Project/utility/src/app/tools/text/markdown-editor/page.js)**: Live split-screen Markdown authoring and HTML preview.
- **[Find & Replace](file:///e:/Project/utility/src/app/tools/text/find-replace/page.js)**: Case-sensitive and regular expression replacements.
- **[Text to Slug](file:///e:/Project/utility/src/app/tools/text/slug-generator/page.js)**: URL-friendly permalink slugs with delimiter selection.
- **[Remove Duplicate Lines](file:///e:/Project/utility/src/app/tools/text/remove-duplicates/page.js)**: Strip repeated lines, maintain or sort order.
- **[Text Reverser](file:///e:/Project/utility/src/app/tools/text/text-reverser/page.js)**: Reverse full string, words, or individual lines.
- **[Sort Lines](file:///e:/Project/utility/src/app/tools/text/sort-lines/page.js)**: Alphabetical (A-Z, Z-A), natural number sorting, or line length.
- **[String Encoder/Decoder](file:///e:/Project/utility/src/app/tools/text/string-encoder/page.js)**: URL encoding/decoding and HTML entities.
- **[Text Statistics](file:///e:/Project/utility/src/app/tools/text/text-statistics/page.js)**: Readability levels, average word lengths, syllable metrics.

### 2. 👨‍💻 Developer Tools (15 Tools)
- **[JSON Formatter & Validator](file:///e:/Project/utility/src/app/tools/developer/json-formatter/page.js)**: Pretty print, error linting, tree preview.
- **[Base64 Encoder/Decoder](file:///e:/Project/utility/src/app/tools/developer/base64/page.js)**: UTF-8 safe text to Base64 and vice versa.
- **[Regex Tester](file:///e:/Project/utility/src/app/tools/developer/regex-tester/page.js)**: Live pattern matching with flag toggles (g, i, m, s).
- **[Code Beautifier](file:///e:/Project/utility/src/app/tools/developer/code-beautifier/page.js)**: Beautify JS, TypeScript, HTML, CSS, and SQL.
- **[Hash Generator](file:///e:/Project/utility/src/app/tools/developer/hash-generator/page.js)**: SHA-1, SHA-256, SHA-384, SHA-512 cryptographic digests.
- **[JWT Decoder](file:///e:/Project/utility/src/app/tools/developer/jwt-decoder/page.js)**: Inspect headers, claims, expiration timestamps, token expiry state.
- **[URL Parser](file:///e:/Project/utility/src/app/tools/developer/url-parser/page.js)**: Breakdown protocol, host, port, path, and editable query params table.
- **[HTTP Status Codes Reference](file:///e:/Project/utility/src/app/tools/developer/http-status/page.js)**: Filterable reference for 1xx, 2xx, 3xx, 4xx, 5xx statuses.
- **[Cron Expression Generator](file:///e:/Project/utility/src/app/tools/developer/cron-generator/page.js)**: Build and translate cron schedules into plain English.
- **[Unix Timestamp Converter](file:///e:/Project/utility/src/app/tools/developer/unix-timestamp/page.js)**: Live epoch clock, seconds/ms conversion, UTC/Local formatting.
- **[UUID Generator](file:///e:/Project/utility/src/app/tools/developer/uuid-generator/page.js)**: RFC4122 v4 UUIDs, bulk generation, case and hyphen toggles.
- **[HTML Entity Encoder/Decoder](file:///e:/Project/utility/src/app/tools/developer/html-entities/page.js)**: Character to entity name and numeric codes.
- **[CSS Minifier](file:///e:/Project/utility/src/app/tools/developer/css-minifier/page.js)**: Strip whitespace, comments, compression savings stats.
- **[JavaScript Minifier](file:///e:/Project/utility/src/app/tools/developer/js-minifier/page.js)**: Code minification, size reduction analytics.
- **[Code Diff Checker](file:///e:/Project/utility/src/app/tools/developer/diff-checker/page.js)**: Side-by-side split code comparison with highlighted modifications.

### 3. 🖼️ Image Tools (10 Tools)
- **[QR Code Generator](file:///e:/Project/utility/src/app/tools/image/qr-generator/page.js)**: Custom colors, size sliders, URL/WiFi/Email/Text presets, PNG download.
- **[Color Picker](file:///e:/Project/utility/src/app/tools/image/color-picker/page.js)**: HEX, RGB, HSL, luminance contrast, complementary and triadic harmonies.
- **[Image to Base64](file:///e:/Project/utility/src/app/tools/image/image-to-base64/page.js)**: Drag & drop image to data URI, raw base64, HTML tag, and CSS background.
- **[SVG Viewer & Optimizer](file:///e:/Project/utility/src/app/tools/image/svg-viewer/page.js)**: Live SVG code renderer, minifier, and cleaner.
- **[Favicon Generator](file:///e:/Project/utility/src/app/tools/image/favicon-generator/page.js)**: Multi-size export (16x16, 32x32, 64x64, 180x180) from emoji, shapes, or letters.
- **[Placeholder Image Generator](file:///e:/Project/utility/src/app/tools/image/placeholder-image/page.js)**: Custom dimensions, colors, social OG banner presets.
- **[Image Color Extractor](file:///e:/Project/utility/src/app/tools/image/color-extractor/page.js)**: Quantizes and extracts dominant color palettes from uploaded images.
- **[Aspect Ratio Calculator](file:///e:/Project/utility/src/app/tools/image/aspect-ratio/page.js)**: Proportional dimension scaling and GCD ratio detection.
- **[Image Comparison Slider](file:///e:/Project/utility/src/app/tools/image/image-compare/page.js)**: Interactive before/after split slider.
- **[Screenshot Mockup Generator](file:///e:/Project/utility/src/app/tools/image/screenshot-mockup/page.js)**: Wrap screenshots in Safari/Chrome browser frames or mobile phone shells.

### 4. 🔢 Math & Finance Tools (12 Tools)
- **[Scientific Calculator](file:///e:/Project/utility/src/app/tools/math/calculator/page.js)**: Trigonometry (sin, cos, tan), log, ln, sqrt, powers, history log.
- **[Unit Converter](file:///e:/Project/utility/src/app/tools/math/unit-converter/page.js)**: Length, mass, temperature, digital bytes, and speed.
- **[Percentage Calculator](file:///e:/Project/utility/src/app/tools/math/percentage-calc/page.js)**: What is X% of Y, X is what % of Y, and % increase/decrease.
- **[Loan/EMI Calculator](file:///e:/Project/utility/src/app/tools/math/loan-calculator/page.js)**: Monthly EMI payments, interest breakdown, principal schedule.
- **[Tip Calculator](file:///e:/Project/utility/src/app/tools/math/tip-calculator/page.js)**: Bill splitting, custom tip percentage presets, per-person totals.
- **[Age Calculator](file:///e:/Project/utility/src/app/tools/math/age-calculator/page.js)**: Exact age in years/months/days, days alive, next birthday countdown.
- **[BMI Calculator](file:///e:/Project/utility/src/app/tools/math/bmi-calculator/page.js)**: Metric and Imperial Body Mass Index with color-coded gauge.
- **[Discount Calculator](file:///e:/Project/utility/src/app/tools/math/discount-calculator/page.js)**: Original price, sales discount %, tax calculations, final savings.
- **[Number Base Converter](file:///e:/Project/utility/src/app/tools/math/number-base/page.js)**: Live Decimal, Binary, Hexadecimal, and Octal conversions.
- **[Statistics Calculator](file:///e:/Project/utility/src/app/tools/math/statistics-calc/page.js)**: Mean, median, mode, standard deviation, variance, and range.
- **[Fraction Calculator](file:///e:/Project/utility/src/app/tools/math/fraction-calc/page.js)**: Add, subtract, multiply, divide fractions with step simplification.
- **[Roman Numeral Converter](file:///e:/Project/utility/src/app/tools/math/roman-numeral/page.js)**: Integer to Roman (1 - 3999) and Roman to integer.

### 5. 🌐 SEO & Web Tools (10 Tools)
- **[Meta Tag Generator](file:///e:/Project/utility/src/app/tools/seo/meta-tag/page.js)**: Title, description, keywords, Open Graph, Twitter cards, character counter.
- **[Open Graph Preview](file:///e:/Project/utility/src/app/tools/seo/og-preview/page.js)**: Live social preview cards for Twitter, Facebook, LinkedIn.
- **[Sitemap Generator](file:///e:/Project/utility/src/app/tools/seo/sitemap-generator/page.js)**: Generate standard XML sitemap files from URL lists.
- **[Robots.txt Generator](file:///e:/Project/utility/src/app/tools/seo/robots-txt/page.js)**: Configure crawl rules, user-agents, disallows, AI bots, sitemap link.
- **[Schema Markup Generator](file:///e:/Project/utility/src/app/tools/seo/schema-markup/page.js)**: JSON-LD for Organization, Article, Product, and FAQPage.
- **[Keyword Density Checker](file:///e:/Project/utility/src/app/tools/seo/keyword-density/page.js)**: Frequency count, percentage density, stop-word filter.
- **[Page Speed Checklist](file:///e:/Project/utility/src/app/tools/seo/page-speed/page.js)**: Core Web Vitals optimization score calculator.
- **[Redirect Chain Checker](file:///e:/Project/utility/src/app/tools/seo/redirect-checker/page.js)**: Diagnose 301, 302 hops and protocol upgrades.
- **[Google SERP Preview](file:///e:/Project/utility/src/app/tools/seo/serp-preview/page.js)**: Realistic desktop & mobile Google search snippet simulation.
- **[Canonical URL Generator](file:///e:/Project/utility/src/app/tools/seo/canonical-url/page.js)**: Strip tracking params, trailing slash normalization, canonical links.

### 6. 📱 Social Media Tools (8 Tools)
- **[Hashtag Generator](file:///e:/Project/utility/src/app/tools/social/hashtag-generator/page.js)**: Topic-based high-engagement hashtag bundles.
- **[Social Bio Generator](file:///e:/Project/utility/src/app/tools/social/bio-generator/page.js)**: Professional, minimalist, creative, and witty bio creator.
- **[Post Character Counter](file:///e:/Project/utility/src/app/tools/social/char-counter/page.js)**: Limit meters for Twitter, LinkedIn, Instagram, TikTok.
- **[Social Image Sizes Guide](file:///e:/Project/utility/src/app/tools/social/image-size-guide/page.js)**: 2026 official resolutions and aspect ratios for all networks.
- **[Post Formatter](file:///e:/Project/utility/src/app/tools/social/post-formatter/page.js)**: Convert text to bold, italic, monospace, and script Unicode fonts.
- **[Engagement Rate Calculator](file:///e:/Project/utility/src/app/tools/social/engagement-calc/page.js)**: Interactions / follower ratio with benchmark grading.
- **[Content Calendar](file:///e:/Project/utility/src/app/tools/social/social-calendar/page.js)**: Weekly post planner across multiple channels.
- **[Username Checker](file:///e:/Project/utility/src/app/tools/social/username-checker/page.js)**: Direct profile lookup across 9 major social networks.

### 7. ⏱️ Productivity Tools (10 Tools)
- **[Pomodoro Timer](file:///e:/Project/utility/src/app/tools/productivity/pomodoro/page.js)**: 25/5/15 minute intervals, session tracking, focus modes.
- **[Todo List](file:///e:/Project/utility/src/app/tools/productivity/todo-list/page.js)**: Priority tags, active/completed filters, auto-save to localStorage.
- **[Quick Notes](file:///e:/Project/utility/src/app/tools/productivity/notes/page.js)**: Instant auto-saving scratchpad with Markdown export.
- **[Habit Tracker](file:///e:/Project/utility/src/app/tools/productivity/habit-tracker/page.js)**: 7-day weekly grid, habit completion %, streak metrics.
- **[Countdown Timer](file:///e:/Project/utility/src/app/tools/productivity/countdown/page.js)**: Target date/time countdown cards with days, hours, mins, secs.
- **[Stopwatch](file:///e:/Project/utility/src/app/tools/productivity/stopwatch/page.js)**: Millisecond precision timer with recorded laps.
- **[Meeting Cost Calculator](file:///e:/Project/utility/src/app/tools/productivity/meeting-cost/page.js)**: Real-time dollar expense per minute based on attendance and salary.
- **[Daily Planner](file:///e:/Project/utility/src/app/tools/productivity/daily-planner/page.js)**: 7:00 AM to 8:00 PM time-blocking schedule.
- **[Eisenhower Matrix](file:///e:/Project/utility/src/app/tools/productivity/eisenhower/page.js)**: 4-quadrant task prioritization (Do, Schedule, Delegate, Eliminate).
- **[SMART Goal Setter](file:///e:/Project/utility/src/app/tools/productivity/smart-goals/page.js)**: Guided framework for structured, actionable goals.

### 8. 📄 File & Data Tools (10 Tools)
- **[CSV to JSON](file:///e:/Project/utility/src/app/tools/file/csv-to-json/page.js)**: Convert CSV to JSON arrays with automatic number parsing.
- **[JSON to CSV](file:///e:/Project/utility/src/app/tools/file/json-to-csv/page.js)**: Convert JSON object collections to comma-separated files.
- **[File Size Converter](file:///e:/Project/utility/src/app/tools/file/file-size/page.js)**: Convert Bytes, KB, MB, GB, TB in Binary (1024) and Decimal (1000).
- **[XML to JSON](file:///e:/Project/utility/src/app/tools/file/xml-to-json/page.js)**: DOM-based XML hierarchy to JSON converter.
- **[YAML to JSON](file:///e:/Project/utility/src/app/tools/file/yaml-to-json/page.js)**: Convert YAML configurations to formatted JSON.
- **[Markdown to HTML](file:///e:/Project/utility/src/app/tools/file/md-to-html/page.js)**: Convert headings, lists, code blocks, and formatting to HTML.
- **[HTML to Markdown](file:///e:/Project/utility/src/app/tools/file/html-to-md/page.js)**: Reverse HTML markup back to clean Markdown syntax.
- **[TSV to JSON](file:///e:/Project/utility/src/app/tools/file/tsv-to-json/page.js)**: Convert tab-separated data into structured JSON objects.
- **[SQL Formatter](file:///e:/Project/utility/src/app/tools/file/sql-formatter/page.js)**: Beautify queries with capitalized keywords and clause indentation.
- **[Mock Data Generator](file:///e:/Project/utility/src/app/tools/file/mock-data/page.js)**: Generate random test data rows (Names, emails, cities, salaries) in JSON/CSV.

### 9. 🔒 Security Tools (8 Tools)
- **[Password Generator](file:///e:/Project/utility/src/app/tools/security/password-generator/page.js)**: Cryptographically secure random passwords (8-64 chars) with rule filters.
- **[Password Strength Checker](file:///e:/Project/utility/src/app/tools/security/password-strength/page.js)**: Entropy assessment, brute-force crack time estimator, checklist.
- **[Text Encryption (AES-256)](file:///e:/Project/utility/src/app/tools/security/encryption/page.js)**: Web Crypto API AES-GCM encryption with PBKDF2 passphrase derivation.
- **[RSA Key Generator](file:///e:/Project/utility/src/app/tools/security/rsa-keygen/page.js)**: Generate 2048-bit & 4096-bit Public/Private PEM key pairs.
- **[SSL Certificate Decoder](file:///e:/Project/utility/src/app/tools/security/ssl-decoder/page.js)**: Inspect X.509 PEM certificates, validity, SAN, and algorithms.
- **[CORS Header Generator](file:///e:/Project/utility/src/app/tools/security/cors-generator/page.js)**: Ready-to-use snippets for Next.js, Express, and Nginx.
- **[CSP Generator](file:///e:/Project/utility/src/app/tools/security/csp-generator/page.js)**: Directives builder for Content Security Policy HTTP headers and meta tags.
- **[Bcrypt Hash Generator](file:///e:/Project/utility/src/app/tools/security/bcrypt-generator/page.js)**: Generate and verify bcrypt password hashes with custom cost factors.

### 10. 🎨 Color & Design Tools (10 Tools)
- **[Palette Generator](file:///e:/Project/utility/src/app/tools/color/palette-generator/page.js)**: 5-color harmonious schemes, color locking, CSS variables export.
- **[Gradient Maker](file:///e:/Project/utility/src/app/tools/color/gradient-maker/page.js)**: Linear & Radial CSS gradients with angle controls and multi-stop support.
- **[Box Shadow Generator](file:///e:/Project/utility/src/app/tools/color/box-shadow/page.js)**: X/Y offsets, blur, spread, opacity, inset, and real-time CSS.
- **[Border Radius Generator](file:///e:/Project/utility/src/app/tools/color/border-radius/page.js)**: 8-point organic blob and rounded corner generator.
- **[Flexbox Playground](file:///e:/Project/utility/src/app/tools/color/flexbox-generator/page.js)**: Direction, alignment, justification, gap, and item count sandbox.
- **[CSS Grid Generator](file:///e:/Project/utility/src/app/tools/color/grid-generator/page.js)**: Visual grid matrix with customizable rows, columns, and gaps.
- **[Glassmorphism Generator](file:///e:/Project/utility/src/app/tools/color/glassmorphism/page.js)**: Frosted glass backdrop blur, translucency, and border reflection.
- **[Neumorphism Generator](file:///e:/Project/utility/src/app/tools/color/neumorphism/page.js)**: Soft UI embossed and debossed inset shadow effects.
- **[Color Contrast Checker](file:///e:/Project/utility/src/app/tools/color/contrast-checker/page.js)**: WCAG 2.1 AA/AAA compliance ratios for normal, large, and UI text.
- **[Tailwind Color Converter](file:///e:/Project/utility/src/app/tools/color/tailwind-colors/page.js)**: Find nearest matching Tailwind CSS class name from any HEX color.

### 11. 🤖 AI-Powered Tools (5 Tools)
- **[Text Summarizer](file:///e:/Project/utility/src/app/tools/ai/text-summarizer/page.js)**: Extractive frequency-based condensation with customizable length ratios.
- **[Paraphraser](file:///e:/Project/utility/src/app/tools/ai/paraphraser/page.js)**: Rephrase sentences into Professional, Casual, Concise, or Creative voices.
- **[Grammar & Spell Checker](file:///e:/Project/utility/src/app/tools/ai/grammar-checker/page.js)**: Detect typos, capitalization errors, repeated words, and auto-fix all.
- **[Content Idea Generator](file:///e:/Project/utility/src/app/tools/ai/content-ideas/page.js)**: Generate high-performing angles and hooks for any niche or topic.
- **[AI Writing Assistant](file:///e:/Project/utility/src/app/tools/ai/ai-writer/page.js)**: Structured draft generator for emails, blog introductions, and announcements.

---

## 🎨 Design Philosophy
- **Rich Dark Aesthetic**: Curated dark palette (`#0F0F1A` base) accented with vibrant gradients.
- **Zero Latency**: Client-side computation ensures instant results with no server roundtrips.
- **Privacy First**: Sensitive data, passwords, and private keys never leave the browser.
