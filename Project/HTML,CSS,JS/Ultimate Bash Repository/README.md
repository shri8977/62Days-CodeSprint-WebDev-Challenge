<div align="center">
    
# 💻 Ultimate Bash Repository 📖

> An interactive static website for learning and browsing structured Bash scripts — with syntax-highlighted code, rendered markdown guides, and a clean, searchable layout.

</div>

<p align="center">
    <img src="https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white" alt="Bash">
    <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT License">
</p>

<img width="1617" height="922" alt="Image" src="https://github.com/user-attachments/assets/df68e3d9-64ee-4368-a60d-d06c7b0e8d5e" />

<img width="1617" height="922" alt="Image" src="https://github.com/user-attachments/assets/78d3b4ff-13e3-4444-b801-620debf77fc5" />

---

<img width="1617" height="922" alt="Image" src="https://github.com/user-attachments/assets/0edff704-58ce-40b3-888e-58f192f87493" />

---

<img width="1617" height="922" alt="Image" src="https://github.com/user-attachments/assets/cda84275-5874-4046-b760-57779bde596c" />

---

<img width="1617" height="922" alt="Image" src="https://github.com/user-attachments/assets/d838f6ab-e84c-4b31-9017-8ed6a111a875" />
---

## ✨ About

This website serves as a **visual, interactive documentation platform** for Bash shell scripts. Instead of browsing raw files on GitHub, you get:

- **Syntax-highlighted code** (`.sh`) rendered directly from the source files
- **Rendered Markdown guides** for conceptual topics
- **Accordion sidebar navigation** with expandable folders
- **Dropdown topic menus** for jumping between subjects
- **Brutalist dark UI** with scanline animations

---

## 🛠️ Tech Stack

This project uses web technologies to present Bash script content.

| Technology | Purpose |
|---|---|
| **Bash** | The scripting language being documented and displayed. |
| **HTML5/CSS3** | Page structure and styling for the viewer website. |
| **JavaScript (Vanilla)** | Core application logic — routing, sidebar, content fetching and rendering. |
| **Python** | `generate_manifest.py` — walks the repo and produces `tree_manifest.json`. |
| marked.js | Markdown → HTML parsing for `.md` overview files. |
| Prism.js | Syntax highlighting for `.sh` source code files. |
| **`tree_manifest.json`** | A flat-array file tree used by the frontend to render the sidebar and content. |

---

## 🗂️ Project Structure

The repository is organized around Bash scripting topics. Each top-level topic has an overview `.md` file and folders containing the standalone code examples shown in the sidebar on the website.

Top-level topics and their subtopics are:

- **Bash Fundamentals**
   - Basic Syntax
- **Scripting Constructs**
   - Conditional Logic
   - Loops
   - Functions
- **Practical Examples**
   - File Management
   - System Information

Each topic folder contains either:
- Single code files (e.g., `.sh`) which are rendered with syntax highlighting.
- A `.md` file (rendered as HTML)
- Multiple files in subdirectories (shown as expandable sidebar groups)

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone <repo-url>
cd "Ultimate-Bash-Repository"
```

### 2. Regenerate the File Manifest (Optional)

If you add, remove, or rename files, regenerate the tree index:

```bash
python3 generate_manifest.py
```

This overwrites `tree_manifest.json` so the frontend knows about the new structure.

### 3. Serve the Site Locally

The frontend fetches files from the repo, so serve over HTTP when testing locally.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🧩 How It Works

1. **Manifest Generation** — `generate_manifest.py` walks the repository directory tree and writes a flat array of `{ path, type }` objects to `tree_manifest.json`. Each entry is either `"blob"` (file) or `"tree"` (directory).

2. **Initialization** — On page load, `script.js`:
   - Fetches `tree_manifest.json`
   - Builds the dropdown navigation from `topicsData` (the map of topic names → subtopics)
   - Listens for URL hash changes

3. **Navigation** — Clicking a topic or subtopic:
   - Sets `window.location.hash` to `TopicName:SubTopicPath`
   - `checkUrlHashRoute()` parses the hash and calls `triggerContentLoad()` or `triggerParentTopicLoad()`
   - The sidebar and main content area are rebuilt via `resolveAndBuildContent()`

4. **Content Rendering** — For each file in the current subtree:
   - `.sh` → fetched with `fetch()`, displayed inside a `<pre><code>` block, then highlighted with `Prism.highlightElement()`
   - `.md` → fetched and parsed with `marked.parse()`, rendered as HTML
   - Folders → recursively expanded with accordion controls

5. **Navigation State** — The browser's hashchange event keeps the URL in sync, enabling bookmarking and back/forward navigation.

---

## ✏️ Adding New Content

1. **Add a new subtopic folder** (e.g., `NewTopic/SubFolder/`) with your `.sh` files.
2. **Register the subtopic** in `script.js` under the `topicsData` object, specifying the parent topic and optionally a `preferredOrder` array for sidebar sorting.
3. **Regenerate the manifest:**

```bash
python3 generate_manifest.py
```

4. **Update the topic overview `.md` file** if needed.
5. **Serve and verify** — the new content appears in the sidebar and is rendered on click.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

Project added by [**rhalbhavi**](github.com/rhalbhavi)
