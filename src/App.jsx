import { useRef, useState } from "react"
import html2canvas from "html2canvas"

const MyComponent = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [canvasPreview, setCanvasPreview] = useState("")
  const [inputText, setInputText] = useState("⌨️ 點擊以編輯")
  const divRef = useRef(null)
  const inputFileRef = useRef(null)

  const handleExport = () => {
    html2canvas(divRef.current, {
      backgroundColor: null,
    }).then((canvas) => {
      const dataURL = canvas.toDataURL()
      setCanvasPreview(dataURL)
    })
  }

  const onImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const onImageUploadBtnClick = () => {
    inputFileRef.current.click()
  }

  return (
    <>
      <div className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center space-y-8">
        <div className="p-3 border-gray-400 border-2 border-dashed rounded-lg w-96 h-28 flex justify-center items-center">
          {canvasPreview ? (
            <img src={canvasPreview} alt="preview" className="max-h-full" />
          ) : (
            <span className="text-gray-400 text-sm tracking-widest">圖片預覽區</span>
          )}
        </div>
        <div ref={divRef}>
          <div className="bg-white px-5 py-3 rounded-lg flex w-96 h-20 items-center space-x-4">
            <input type="file" hidden ref={inputFileRef} accept="image/*" onChange={onImageChange} />
            <img
              src={imageUrl ? imageUrl : process.env.PUBLIC_URL + "/image/upload.png"}
              alt="Product"
              className="h-full"
              onClick={onImageUploadBtnClick}
            />
            <span contentEditable="true" className="tracking-widest overflow-hidden" onClick={() => setInputText("")}>
              {inputText}
            </span>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="border-white border-2 rounded-lg px-3 py-2 text-white tracking-widest hover:bg-white hover:text-black duration-300"
        >
          產生圖片
        </button>
      </div>
    </>
  )
}

export default MyComponent
