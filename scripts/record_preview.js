const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');

(async () => {
    // 1. Launch Browser
    const browser = await puppeteer.launch({
        headless: false, // Must be false to capture video properly sometimes
        args: ['--window-size=400,800', '--autoplay-policy=no-user-gesture-required']
    });
    const page = await browser.newPage();

    // Set viewport to mobile size
    await page.setViewport({ width: 375, height: 667 });

    // 2. Setup Recorder
    const recorder = new PuppeteerScreenRecorder(page, {
        fps: 30,
        videoFrame: { width: 375, height: 667 },
        aspectRatio: '9:16',
    });

    // 3. Navigate to Preview
    // We use the local file path
    const fileUrl = 'file://' + path.resolve(__dirname, '../public/marketing_preview.html');
    console.log(`🎥 Opening Preview: ${fileUrl}`);
    await page.goto(fileUrl);

    // 4. Start Recording
    console.log("🔴 Recording Started...");
    await recorder.start('./daily_fortune.mp4');

    // 5. Trigger Play and Wait
    // Click the play button programmatically
    await page.click('#playBtn');

    // Wait for video duration (approx 16s + buffer)
    await new Promise(r => setTimeout(r, 18000));

    // 6. Stop Recording
    await recorder.stop();
    console.log("✅ Recording Saved: daily_fortune.mp4");

    await browser.close();
})();
