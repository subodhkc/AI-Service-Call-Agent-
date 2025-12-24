# Daily.co Video Recording Setup

Complete guide to record AI-powered demo videos using Daily.co + OpenAI.

---

## 🔑 Required API Keys

### 1. OpenAI API Key
**Already set**: ✅
```
OPENAI_API_KEY=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
```

### 2. Daily.co API Key
**Get it here**: https://dashboard.daily.co/developers

**Steps**:
1. Sign up at https://daily.co (free tier available)
2. Go to https://dashboard.daily.co/developers
3. Copy your API key
4. Set environment variable:
   ```powershell
   $env:DAILY_API_KEY="your-daily-api-key-here"
   ```

---

## 🚀 Quick Start

### Step 1: Set API Keys
```powershell
# OpenAI (already set)
$env:OPENAI_API_KEY="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"

# Daily.co (get from dashboard)
$env:DAILY_API_KEY="your-daily-api-key"
```

### Step 2: Run Recording Script
```powershell
cd ai-demo-call
npx ts-node scripts/recordDemoWithDaily.ts
```

### Step 3: Follow On-Screen Instructions
The script will:
1. ✅ Generate AI narration for all 8 slides (using OpenAI TTS)
2. ✅ Create a Daily.co room
3. ✅ Start cloud recording
4. ⏸️ Wait for you to record (instructions provided)
5. ✅ Stop recording
6. ✅ Download final video
7. ✅ Clean up

---

## 📋 What Gets Generated

### Audio Files
```
ai-demo-call/recordings/audio/
├── slide-1.mp3  (The Problem - 60s)
├── slide-2.mp3  (Industry Reality - 45s)
├── slide-3.mp3  (Old Solutions - 45s)
├── slide-4.mp3  (THE SOLUTION - 90s)
├── slide-5.mp3  (How It Works - 120s)
├── slide-6.mp3  (Why Different - 60s)
├── slide-7.mp3  (One More Thing - 90s)
└── slide-8.mp3  (Real Results - 60s)
```

### Video File
```
ai-demo-call/recordings/video/
└── demo-[timestamp].mp4
```

---

## 🎬 Recording Process

### Automated Steps
1. **AI Narration Generation** (~2 min)
   - OpenAI TTS generates voice for each slide
   - Saved as MP3 files
   - Professional "alloy" voice
   - 0.9x speed for clarity

2. **Daily Room Creation** (~5 sec)
   - Creates private room
   - Enables cloud recording
   - Returns room URL

3. **Recording Start** (~2 sec)
   - Starts cloud recording
   - Returns recording ID

### Manual Steps (You Do This)
4. **Join Room & Record** (~15 min)
   - Open provided room URL in browser
   - Share screen showing http://localhost:3000/demo
   - Play audio files in order:
     - Start demo presentation
     - Play slide-1.mp3 for Slide 1
     - Advance to Slide 2
     - Play slide-2.mp3 for Slide 2
     - ... repeat for all 8 slides
   - Press Enter in terminal when done

### Automated Steps (Continued)
5. **Recording Stop** (~2 sec)
   - Stops cloud recording
   - Begins processing

6. **Video Processing** (~1-2 min)
   - Daily processes recording
   - Generates download link

7. **Video Download** (~30 sec)
   - Downloads MP4 file
   - Saves to recordings/video/

8. **Cleanup** (~2 sec)
   - Deletes Daily room
   - Completes

---

## 💰 Cost Estimate

### OpenAI TTS
- **Model**: tts-1-hd
- **Cost**: $0.030 per 1,000 characters
- **Estimate**: ~$0.50-1.00 for full demo

### Daily.co
- **Free Tier**: 10,000 minutes/month
- **Recording**: Included in free tier
- **Cost**: $0 (within free tier)

**Total**: ~$0.50-1.00 per recording

---

## 🎯 Output Quality

### Audio
- **Format**: MP3
- **Quality**: HD (tts-1-hd model)
- **Voice**: Alloy (professional, neutral)
- **Speed**: 0.9x (slightly slower for clarity)

### Video
- **Format**: MP4
- **Resolution**: 1280x720 (HD)
- **Frame Rate**: 30 fps
- **Duration**: ~10-15 minutes
- **Size**: ~50-100 MB

---

## 🔧 Troubleshooting

### "OPENAI_API_KEY not set"
```powershell
$env:OPENAI_API_KEY="sk-proj-..."
```

### "DAILY_API_KEY not set"
1. Get key from https://dashboard.daily.co/developers
2. Set environment variable:
   ```powershell
   $env:DAILY_API_KEY="your-key"
   ```

### "Recording processing timed out"
- Check Daily dashboard: https://dashboard.daily.co/recordings
- Recording may still be processing
- Download manually from dashboard

### "Module not found"
```powershell
npm install openai @daily-co/daily-js
```

---

## 📊 Alternative: Simplified Recording

If you want to skip the video call and just generate audio:

```powershell
# Generate audio only (no video)
npx ts-node scripts/generateAudioOnly.ts
```

This will:
- Generate all 8 audio files
- Skip Daily.co integration
- Cost: ~$0.50 (OpenAI TTS only)

---

## 🚀 Next Steps After Recording

### 1. Review Video
```powershell
# Open video file
start ai-demo-call/recordings/video/demo-*.mp4
```

### 2. Copy to Frontend
```powershell
# Copy video to public folder
Copy-Item "ai-demo-call/recordings/video/demo-*.mp4" "frontend/public/videos/demo.mp4"
```

### 3. Add to Website CTA
Update your homepage/CTA to include:
```tsx
<video controls>
  <source src="/videos/demo.mp4" type="video/mp4" />
</video>
```

---

## 📞 Support

**Daily.co Documentation**: https://docs.daily.co/
**OpenAI TTS Documentation**: https://platform.openai.com/docs/guides/text-to-speech

**Issues?**
- Check Daily dashboard for recording status
- Verify API keys are set correctly
- Ensure localhost:3000/demo is running
- Check console for error messages

---

**Ready to record?** Run:
```powershell
$env:OPENAI_API_KEY="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"
$env:DAILY_API_KEY="your-daily-key"
cd ai-demo-call
npx ts-node scripts/recordDemoWithDaily.ts
```
