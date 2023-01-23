import { useRef, useState } from "react"
import html2canvas from "html2canvas"

const MyComponent = () => {
  // const [imgPreview, setImgPreview] = useState("")
  const divRef = useRef(null)

  const handleExport = () => {
    html2canvas(divRef.current, {
      backgroundColor: null,
    }).then((canvas) => {
      canvas.toBlob((blob) => navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]))
      // const dataURL = canvas.toDataURL()
      // setImgPreview(dataURL)
      // const link = document.createElement("a")
      // link.download = "my-div.png"
      // link.href = dataURL
      // link.click()
    })
  }

  return (
    <>
      <div className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center space-y-8">
        {/* <img src={imgPreview} alt="preview" className="w-96 h-20" /> */}
        <div ref={divRef}>
          <div className="bg-white px-5 py-3 rounded-lg flex w-96 h-20 items-center space-x-4">
            <img src="/test-logo.png" alt="Product" className="h-full" />
            <span contentEditable="true">icygang logo</span>
          </div>
        </div>
        <button onClick={handleExport} className="border-white border-2 rounded-lg px-3 py-2 text-white">
          Export
        </button>
      </div>
    </>
  )
}

export default MyComponent
