# 🌊 Hinnavaru Blue — Technical Maintenance Guide

This guide is designed for the non-developer or a new developer to manage and update the Hinnavaru Blue platform.

## 🚀 How to Update Content (CMS)

Almost everything is managed in **[src/data/cms.js](file:///src/data/cms.js)**.

### Common Tasks

1. **Changing Bulletins:** Edit the `LATEST_BULLETINS` array. Add a new item to the top to see it on the Home-page "Notice Board".
2. **Adding History Milestones:** Add a new object to the `PROJECT_ARCHIVE` array.
3. **Updating Case Studies/Corals:** Update `CORAL_REGISTRY`. Change a survival percentage or status here, and it will update the map, the counters, and the tables automatically.
4. **Official Terms:** Edit `CMS_CONFIG` for the current Year, Registration Number, or Atoll codes.
5. **Media Sync Folder:** In `CMS_CONFIG`, update the `drive_id` to point to a new Google Drive folder.

## 🔑 1. Google Drive & API Setup
To enable the automated media pipeline, you need to connect the website to your Google Cloud Project (**adhu-492602**).

### **Step A: Generate Your Key**
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts?project=adhu-492602).
2.  Find your existing service account (or create a new one: `hbi-media-sync`).
3.  Click on the **Actions (three dots)** for that account and select **Manage Keys**.
4.  Click **Add Key** > **Create New Key** > **JSON**.
5.  A file will download to your computer.

### **Step B: Apply the Key**
**Option 1: The Local File Method (Quickest)**
*   Rename the downloaded file to `service-account-key.json`.
*   Place it in the project root folder: `c:\Users\Surface\OneDrive\Documents\hinnavaru-blue\`.

**Option 2: The Security Method (Best for GitHub)**
*   Open the downloaded JSON file and copy all its text.
*   Set a local environment variable named `GOOGLE_SERVICE_ACCOUNT_JSON` with that text as the value.
*   *For GitHub Actions:* Add this as a **Secret** named `GOOGLE_SERVICE_ACCOUNT_JSON`.

### **Step C: Share the Folder**
*   Open your Google Drive.
*   Right-click your Media Folder (`1RButp5B8quSmH1NEA6E9N8YD_uIkxtE_`).
*   Click **Share** and add the **Email Address** of your Service Account (found in the JSON file) as a **Viewer**.
3. Paste this ID into **[src/data/cms.js](file:///src/data/cms.js)** under `media_automation.drive_id`.
4. The background sync script will automatically begin using the new folder during its next run.

### To Trigger a Manual Sync

If you have node installed, run this in your terminal:

```bash
node scripts/sync-media.js
```

## 🛠️ Architecture Overview

- **Framework:** React + Vite
- **Styling:** CSS Variables (Global Design System in `index.css`)
- **Map Engine:** Leaflet.js
- **Routing:** React Router (SPA-mode for seamless transitions)

## 📐 Design Parameters ("The Blue Kit")

To maintain the cinematic look:

- **Glassmorphism:** Use `backdrop-filter: blur(12px)`.
- **Gradients:** Use `-webkit-background-clip: text` with `linear-gradient(135deg, var(--blue-light), var(--teal))` for that "Ocean Glow".
- **Animations:** Wrap new sections in the `animate-reveal` class.

## 🔗 Technical Dependencies

- **React-Router-Dom:** For page navigation.
- **Leaflet:** For the Live Lagoon Map.

## 📧 Professional Email Setup (Google Workspace + Squarespace)

To activate `hello@hinnavarublueinitiative.org` and `founder@...`, follow these steps:

### 1. Sign Up (Google for Nonprofits)

1. Go to [google.com/nonprofits](https://www.google.com/nonprofits/).
2. Apply using your NGO registration details. Once approved, you get Google Workspace (Gmail, Drive) for **free**.

### 2. Update DNS in Squarespace

Log into your **Squarespace** account → **Domains** → **DNS Settings** → **Custom Records**. Add these 5 MX Records:

| Type | Host | Data (Points to) | Priority |
| :--- | :--- | :--- | :--- |
| MX | @ | **ASPMX.L.GOOGLE.COM** | 1 |
| MX | @ | **ALT1.ASPMX.L.GOOGLE.COM** | 5 |
| MX | @ | **ALT2.ASPMX.L.GOOGLE.COM** | 5 |
| MX | @ | **ALT3.ASPMX.L.GOOGLE.COM** | 10 |
| MX | @ | **ALT4.ASPMX.L.GOOGLE.COM** | 10 |

### 3. Domain Verification

Google will provide a **Verification Code**. Add it to Squarespace:

- **Type:** TXT
- **Host:** @
- **Value:** (Paste your `google-site-verification=...` code here)

## 🎥 Video & Asset Specifications

To ensure the website remains fast and continues to deploy successfully, please follow these guidelines for the **Pulse** video or any new media:

### 1. Video Limits (The Pulse)

- **Max File Size:** **100 MB** (GitHub strict limit).
- **Optimal Web Size:** **10 MB – 20 MB** (for fast loading on mobile).
- **Format:** `.mp4` (H.264 / H.265 encoding).
- **Resolution:** 1080p or 720p (Vertical 9:16 for Pulse).
- **Duration:** 15–30 seconds loop.

> [!WARNING]
> The previous 530MB video was removed because it was physically impossible for GitHub to host it. Before uploading a new video, use a tool like [Handbrake](https://handbrake.fr/) or [Canva's video compressor](https://www.canva.com/features/video-compressor/) to bring it under **20MB**.

### 2. Image Optimization

- **Max Size:** Keep under **2 MB** per image.
- **Format:** `.webp` is best for the web; `.jpg` is backup.

---

*Maintained by the Hinnavaru Blue Initiative.*
