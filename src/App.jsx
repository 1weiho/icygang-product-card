import { useRef, useState } from "react"
import html2canvas from "html2canvas"

const App = () => {
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
      <div className="h-screen w-screen bg-slate-800 flex flex-col items-center space-y-8 pt-24">
        <div className="flex flex-col items-center space-y-2">
          <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="icygang logo" className="h-16 w-16" />
          <h1 className="text-2xl text-white tracking-widest">商品卡片產生器</h1>
        </div>
        <div className="p-3 border-gray-400 border-2 border-dashed rounded-lg w-80 h-28 flex justify-center items-center">
          {canvasPreview ? (
            <img src={canvasPreview} alt="preview" className="max-h-full" />
          ) : (
            <span className="text-gray-400 text-sm tracking-widest">圖片預覽區</span>
          )}
        </div>
        <div ref={divRef}>
          <div className="bg-white py-1 pl-3 rounded-lg flex min-w-fit max-w-xs h-20 items-center overflow-hidden">
            <input type="file" hidden ref={inputFileRef} accept="image/*" onChange={onImageChange} />
            <img
              src={imageUrl ? imageUrl : process.env.PUBLIC_URL + "/image/upload.png"}
              alt="Product"
              className={imageUrl ? "h-full" : "h-2/3"}
              onClick={onImageUploadBtnClick}
            />
            <div className="flex flex-col items-center w-full mx-6">
              <span className="font-semibold tracking-wider">ICYGANG</span>
              <span
                contentEditable="true"
                className="font-normal tracking-wider text-gray-700 text-center leading-4 break-all"
                onClick={() => setInputText("")}
              >
                {inputText}
              </span>
            </div>
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

export default App
