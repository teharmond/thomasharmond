import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    // Check if it's X.com/Twitter and handle specially
    const urlObj = new URL(url)
    if (urlObj.hostname === 'x.com' || urlObj.hostname === 'twitter.com') {
      // X.com blocks scraping, so return basic info
      const username = urlObj.pathname.split('/')[1]
      return NextResponse.json({
        title: username ? `@${username} on X` : 'X (Twitter)',
        description: 'View profile on X (formerly Twitter)',
        image: null,
        siteName: 'X',
        favicon: 'https://abs.twimg.com/favicons/twitter.3.ico',
        url,
        blocked: true
      })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    })

    if (!response.ok) {
      console.error(`Fetch failed for ${url}: ${response.status} ${response.statusText}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Extract OpenGraph and meta tags
    const ogImage = extractMetaContent(html, ['og:image', 'twitter:image'])
    const title = extractMetaContent(html, ['og:title', 'twitter:title']) || extractTitle(html)
    const description = extractMetaContent(html, ['og:description', 'twitter:description', 'description'])
    const siteName = extractMetaContent(html, ['og:site_name'])
    const favicon = extractFavicon(html, url)

    return NextResponse.json({
      title,
      description,
      image: ogImage,
      siteName,
      favicon,
      url
    })
  } catch (error) {
    console.error('Error fetching OpenGraph data for', url, ':', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch OpenGraph data',
        details: error instanceof Error ? error.message : 'Unknown error',
        url 
      },
      { status: 500 }
    )
  }
}

function extractMetaContent(html: string, properties: string[]): string | null {
  for (const property of properties) {
    const ogRegex = new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*?)["']`, 'i')
    const match = html.match(ogRegex)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

function extractTitle(html: string): string | null {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return titleMatch ? titleMatch[1].trim() : null
}

function extractFavicon(html: string, baseUrl: string): string | null {
  // Try to find favicon in various formats
  const faviconPatterns = [
    /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*?)["']/i,
    /<link[^>]*href=["']([^"']*?)["'][^>]*rel=["'](?:shortcut )?icon["']/i,
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']*?)["']/i,
    /<link[^>]*rel=["']icon["'][^>]*type=["']image\/svg\+xml["'][^>]*href=["']([^"']*?)["']/i,
    /<link[^>]*rel=["']mask-icon["'][^>]*href=["']([^"']*?)["']/i
  ]
  
  for (const pattern of faviconPatterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      const faviconUrl = match[1]
      
      // If it's a relative URL, make it absolute
      if (faviconUrl.startsWith('//')) {
        return `https:${faviconUrl}`
      } else if (faviconUrl.startsWith('/')) {
        const urlObj = new URL(baseUrl)
        return `${urlObj.protocol}//${urlObj.host}${faviconUrl}`
      } else if (faviconUrl.startsWith('http')) {
        return faviconUrl
      } else {
        const urlObj = new URL(baseUrl)
        return `${urlObj.protocol}//${urlObj.host}/${faviconUrl}`
      }
    }
  }
  
  // GitHub specific favicon
  try {
    const urlObj = new URL(baseUrl)
    if (urlObj.hostname === 'github.com') {
      return 'https://github.com/favicon.ico'
    }
  } catch {}
  
  // Fallback to default favicon location
  try {
    const urlObj = new URL(baseUrl)
    return `${urlObj.protocol}//${urlObj.host}/favicon.ico`
  } catch {
    return null
  }
}