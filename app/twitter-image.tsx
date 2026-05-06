import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LZ Three Gallery Twitter card'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#151515',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: 64,
          width: '100%',
        }}
      >
        <div style={{ borderBottom: '2px solid rgba(255,255,255,0.18)', display: 'flex', fontSize: 24, fontWeight: 700, justifyContent: 'space-between', letterSpacing: 6, paddingBottom: 28, textTransform: 'uppercase' }}>
          <span>LineZero Studio</span>
          <span style={{ color: '#e21c39' }}>Effects</span>
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -8, lineHeight: 0.84, maxWidth: 920 }}>
          Small WebGL effects. Blunt grades.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.56)', display: 'flex', fontSize: 24, fontWeight: 700, gap: 36, letterSpacing: 5, textTransform: 'uppercase' }}>
          <span>A/B keepers</span>
          <span>C prototypes</span>
          <span>D/F archive</span>
        </div>
      </div>
    ),
    size,
  )
}
