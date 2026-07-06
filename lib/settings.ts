import fs from 'fs';
import path from 'path';

export interface SiteSettings {
  announce_opening: boolean;
  store_open: boolean;
}

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

export function getSiteSettings(): SiteSettings {
  try {
    const fileContents = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(fileContents) as SiteSettings;
  } catch (error) {
    console.error('Error reading settings.json:', error);
    // Return safe defaults if file is missing
    return {
      announce_opening: false,
      store_open: true,
    };
  }
}

export function saveSiteSettings(newSettings: SiteSettings): void {
  try {
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving settings.json:', error);
    throw new Error('Failed to save settings');
  }
}
