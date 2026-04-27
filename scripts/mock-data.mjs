import { mkdirSync, copyFileSync, readdirSync, rmSync, existsSync } from "fs";
import { join } from "path";

rmSync(join(process.cwd(), "public", "images", "wedding"), { recursive: true, force: true });
rmSync(join(process.cwd(), "public", "images", "pre-wedding"), { recursive: true, force: true });
rmSync(join(process.cwd(), "public", "images", "baby"), { recursive: true, force: true });
rmSync(join(process.cwd(), "public", "images", "events"), { recursive: true, force: true });

const ROOT = join(process.cwd(), "public", "images");

// The user has uploaded files directly to 'public/'. We must group them by category and use them safely.
const sources = {
    wedding: [
        "public/wedding-2-DVtaG-9p.jpg",
        "public/wedding-3-DNbq7QJY.jpg",
        "public/wedding-ceremony-IK_03SAI.jpg",
        "public/wedding-collage-CpdDKBNo.jpg",
        "public/wedding-couple-By2WaDyA.jpg"
    ],
    prewedding: [
        "public/pre-wedding-D9AyVlV8.jpg",
        "public/hero-couple-08X6eT3G.jpg"
    ],
    baby: [
        "public/baby-shoot-AS9JeDcT.jpg"
    ],
    events: [
        "public/cafe-shoot-1tq1PQnd.jpg",
        "public/event-coverage-DvL_vBaW.jpg"
    ]
};

function createClient(category, client, events, sourceKey) {
  const images = sources[sourceKey] || sources.wedding;
  
  for (const event of events) {
    const dir = join(ROOT, category, client, event);
    mkdirSync(dir, { recursive: true });
    
    // Distribute actual uploaded images across the folder
    images.forEach((imgFile, index) => {
        if (existsSync(imgFile)) {
            copyFileSync(imgFile, join(dir, `photo-${index + 1}.jpg`));
        }
    });
  }
}

// 1. Weddings
const WEDDING_EVENTS = ["prewedding", "haldi", "wedding", "reception"];
createClient("wedding", "ananya-rohit", WEDDING_EVENTS, "wedding");
createClient("wedding", "priya-karan", WEDDING_EVENTS, "wedding");
createClient("wedding", "snehal-rahul", WEDDING_EVENTS, "wedding");
createClient("pre-wedding", "neha-vikas", WEDDING_EVENTS, "prewedding");

// 2. Baby Shoot
const BABY_EVENTS = ["maternity", "newborn", "cake-smash", "1st-birthday"];
createClient("baby", "aarav-sharma", BABY_EVENTS, "baby");
createClient("baby", "kiara-mehta", BABY_EVENTS, "baby");
createClient("baby", "little-reyaan", BABY_EVENTS, "baby");

// 3. Corporate / Events
const CORP_EVENTS = ["conference", "team-building", "awards-night", "gala-dinner"];
createClient("events", "tech-summit-2024", CORP_EVENTS, "events");
createClient("events", "startup-launch", CORP_EVENTS, "events");
createClient("events", "annual-meetup", CORP_EVENTS, "events");

console.log("Mock data created using ACTUAL user uploads!");
