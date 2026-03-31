<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/18bd928e-7654-47b0-8252-c9ab6f8f5fe8

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Project Name

**VoiceClone Alert**

---

## Problem Statement

AI voice cloning tools are now freely accessible online. Scammers record as little as 10–30 seconds of a person's voice from social media or YouTube, clone it using tools like ElevenLabs or Resemble AI, and call elderly relatives pretending to be in an emergency — requesting urgent UPI or bank transfers.

India has seen a **2000% rise in AI voice scam cases between 2022–2024**. There is currently no free, accessible tool that ordinary people — especially the elderly — can use to verify whether a voice on a call is real or AI-generated.

The problem is especially severe in Kerala and across rural India where:
- Elderly people are frequently targeted
- Digital literacy is still growing
- Scammers exploit emotional urgency ("I had an accident, send money now")

---

## Project Description

**VoiceClone Alert** is a web application that analyzes audio clips of suspicious phone calls and detects whether the voice is AI-generated or real.

### How It Works

1. **User uploads** a recorded audio clip of a suspicious call (WhatsApp voice message or call recording)
2. **Audio preprocessing** — noise removal and normalization
3. **4-layer AI detection engine** analyzes the clip:
   - **Spectral Fingerprinting** — detects unnaturally smooth frequency patterns using MFCC extraction
   - **Prosody & Rhythm Analysis** — identifies robotic pause patterns and unnatural breath timing
   - **GAN Artifact Detection** — finds invisible synthesis fingerprints left by voice cloning tools
   - **Urgency Language Analysis** — transcribes audio and scans for scam trigger phrases in Malayalam, Hindi, and English
4. **Risk Score (0–100)** is generated with a detailed explanation of why the voice was flagged
5. **One-tap Share Warning** — generates a WhatsApp-ready alert card to send to family members
6. **Family Alert System** — pre-registered family members receive an instant notification with the caller's number, time, risk score, and reason flags

### What Makes It Useful

- Works entirely in the **browser** — no app installation needed
- Audio analysis is **privacy-first** — no audio is ever sent to a server
- Supports **Malayalam, Hindi, and English** — built for real Indian users
- Designed for **elderly users** — large text, simple flow, one-tap actions
- **Community scam database** — reported scam numbers are flagged for future callers

---

## Google AI Usage

### Tools / Models Used

| Tool | Purpose |
|------|---------|
| **Gemini API (Google AI Studio)** | NLP analysis of call transcripts for urgency language and scam pattern detection |
| **Gemini 2.0 Flash** | Generating human-readable explanations of why a call was flagged |
| **Google Cloud Speech-to-Text** | Transcribing call audio in Malayalam, Hindi, and English |

### How Google AI Was Used

**1. Scam Language Detection via Gemini API**

The call audio is first transcribed to text. The transcript is then sent to the Gemini API with a structured prompt that instructs it to:
- Identify urgency trigger phrases such as "send money now", "don't tell anyone", "accident happened", "OTP"
- Detect emotional manipulation tactics
- Classify the intent as Safe / Suspicious / High Risk
- Return a structured JSON response with flagged phrases and a confidence score

This NLP layer runs alongside the audio spectral analysis and contributes up to 15 additional points to the final Risk Score.

**2. Plain-Language Explanation Generation**

Once the risk score is computed, Gemini generates a simple explanation of the findings written in terms that a non-technical elderly user or their family member can understand. Example:

> "This voice sounds like it was made by a computer. The way the person speaks is too smooth, and there are no natural breathing sounds between sentences. The message also uses urgent language to pressure you into acting quickly. We recommend you hang up and call your family member directly."

**3. Multilingual Support**

Gemini's multilingual capability allows the app to analyze transcripts in Malayalam and Hindi — critical for the Kerala and North India user base — without needing separate language models.

---

## Proof of Google AI Usage

---

## Screenshots



---

## Demo Video
https://drive.google.com/file/d/1QPSVAu9SMqgpkwb-doyUjQpQlA57vDPU/view?usp=sharing

[Watch Demo](#)

---

## Installation Steps

```bash
# Clone the repository
git clone <your-repo-link>

# Go to project folder
cd voiceclone-alert

# Install dependencies
npm install

# Run the project
npm run dev
```

Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key before running.

---

## How the Risk Score Works

| Score | Verdict | Action |
|-------|---------|--------|
| 0 – 30 | Safe | Call proceeds normally |
| 31 – 60 | Suspicious | Warning shown to user |
| 61 – 74 | High Risk | User advised to disconnect |
| 75 – 100 | Fake Voice Confirmed | Family alerted automatically |

### Score Breakdown

- Unnatural pitch / spectral anomaly → up to 30 points
- Missing breath and prosody patterns → up to 25 points
- GAN synthesis artifacts detected → up to 30 points
- Urgency language detected via Gemini → up to 15 bonus points

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js + Tailwind CSS |
| AI / NLP | Gemini API (Google AI Studio) |
| Audio Analysis | Web Audio API + MFCC extraction |
| Speech-to-Text | Google Cloud Speech-to-Text |
| Notifications | Firebase Cloud Messaging |
| Deployment | Vercel |

---

## Team

Built at **Build with AI — Ernakulam**
Organized by **GDG On Campus × µLearn ASI**
Adi Shankara Institute of Engineering and Technology, Kerala

Track: **AI for Cybersecurity & Digital Trust**
