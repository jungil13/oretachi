import { NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/settings';

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Read current settings to merge with
    const currentSettings = getSiteSettings();
    
    const newSettings = {
      ...currentSettings,
      ...body
    };
    
    saveSiteSettings(newSettings);
    
    return NextResponse.json(newSettings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
