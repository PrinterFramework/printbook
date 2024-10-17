import type { Metadata } from 'next'

export const Name = 'Printbook'
export const ShortName = 'Printbook'
export const Description =
  'Share your prints effortlessly with Printbook, your go-to platform for managing and showcasing your creative works.'
export const Icon = '/assets/img/logo.png'
export const IconType = 'image/png'
export const Keywords = ['Printer', 'Printbook', 'Sharing', 'Creativity']
export const URL = 'https://printbook.ai'
export const OGImage = 'https://printbook.ai/assets/img/og.jpg'

export interface GenerateMetadataInterface {
  title?: string
  description?: string
  icon?: string
  keywords?: string[]
  ogImage?: string
  ogUrl?: string
  type?: string
}

export function GenerateMetadata({
  title = Name,
  description = Description,
  icon = Icon,
  keywords = Keywords,
  ogImage = OGImage,
  ogUrl = URL
}: GenerateMetadataInterface): Metadata {
  return {
    title,
    description,
    keywords,
    icons: {
      icon
    },
    openGraph: {
      title,
      siteName: ShortName,
      description,
      locale: 'en_US',
      url: ogUrl,
      images: ogImage,
      type: 'website'
    },
    twitter: {
      title,
      description,
      images: ogImage,
      creator: '@printbook',
      card: 'summary_large_image'
    }
  }
}
