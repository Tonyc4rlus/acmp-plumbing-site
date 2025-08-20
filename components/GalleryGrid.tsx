export default function GalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt="gallery" className="rounded shadow" />
      ))}
    </div>
  )
}