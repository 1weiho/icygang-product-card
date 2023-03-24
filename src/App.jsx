import { useRef, useState } from "react"
import html2canvas from "html2canvas"

const App = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [canvasPreview, setCanvasPreview] = useState("")
  const [inputText, setInputText] = useState("⌨️ 點擊以編輯")
  const [darkTheme, setDarkTheme] = useState(false)
  const [storeName, setStoreName] = useState("ICYGANG")
  const divRef = useRef(null)
  const inputFileRef = useRef(null)

  const handleExport = () => {
    html2canvas(divRef.current, {
      backgroundColor: null,
    }).then((screenshotCanvas) => {
      let canvas = document.createElement("canvas")
      let ctx = canvas.getContext("2d")
      canvas.width = screenshotCanvas.width + 80
      canvas.height = screenshotCanvas.height + 80
      ctx.shadowBlur = 50
      if (darkTheme === false) {
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)"
      } else {
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)"
      }
      ctx.drawImage(screenshotCanvas, 40, 40)
      const dataURL = canvas.toDataURL()
      setCanvasPreview(dataURL)
    })
  }

  const handleTheme = () => {
    if (darkTheme === false) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setDarkTheme(!darkTheme)
    // FIXME: handleExport() use the old `darkTheme` state to set the shadow color.
    handleExport()
  }

  const onImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const onImageUploadBtnClick = () => {
    inputFileRef.current.click()
  }

  const handleStoreNameChange = () => {
    if (storeName === "ICYGANG") {
      setStoreName("ONLY4GOAT")
    } else {
      setStoreName("ICYGANG")
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center space-y-8 pt-24">
        <div className="flex flex-col items-center space-y-2">
          <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="icygang logo" className="h-16 w-16" />
          <h1 className="text-2xl text-slate-900 dark:text-white tracking-widest">商品卡片產生器</h1>
        </div>
        <div className="p-3 border-gray-400 border-2 border-dashed rounded-lg w-80 h-28 flex justify-center items-center">
          {canvasPreview ? (
            <img src={canvasPreview} alt="preview" className="max-h-full" />
          ) : (
            <span className="text-gray-400 text-sm tracking-widest">圖片預覽區</span>
          )}
        </div>
        <div ref={divRef}>
          <div className="bg-white dark:bg-slate-800 py-1 pl-3 rounded-lg flex max-w-xs h-20 items-center overflow-hidden">
            <input type="file" hidden ref={inputFileRef} accept="image/*" onChange={onImageChange} />
            <img
              src={imageUrl ? imageUrl : process.env.PUBLIC_URL + "/image/upload.png"}
              alt="Product"
              className={imageUrl ? "h-full" : "h-2/3"}
              onClick={onImageUploadBtnClick}
            />
            <div className="flex flex-col items-center w-full mx-6">
              <span
                className="font-semibold tracking-wider text-slate-900 dark:text-white"
                onClick={handleStoreNameChange}
              >
                {storeName}
              </span>
              <span
                contentEditable="true"
                className="font-normal tracking-wider text-slate-500 dark:text-slate-400 text-center leading-4 break-all"
                onClick={() => setInputText("")}
              >
                {inputText}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="border-slate-500 dark:border-white border-2 rounded-lg px-3 py-2 text-slate-500 dark:text-white tracking-widest hover:bg-slate-500 dark:hover:bg-white hover:text-white dark:hover:text-slate-500 duration-300"
          >
            產生圖片
          </button>
          <button
            onClick={handleTheme}
            className="border-slate-500 dark:border-white border-2 rounded-lg px-3 py-2 text-slate-500 dark:text-white tracking-widest hover:bg-slate-500 dark:hover:bg-white hover:text-white dark:hover:text-slate-500 duration-300"
          >
            切換顏色
          </button>
        </div>
      </div>
    </>
  )
}

export default App
