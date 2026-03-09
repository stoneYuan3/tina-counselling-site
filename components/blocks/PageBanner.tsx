export function PageBanner({ page_banner_img, page_banner_title }: any) {
  return (
    <div className="relative w-full h-96">
      {page_banner_img && (
        <img 
          src={page_banner_img} 
          alt={page_banner_title || "Banner"} 
          className="w-full h-full object-cover"
        />
      )}
      {page_banner_title && (
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black/30">
          {page_banner_title}
        </h1>
      )}
    </div>
  )
}