import { useRef, useState } from "react";
import html2canvas from "html2canvas";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [canvasPreview, setCanvasPreview] = useState("");
  const [inputText, setInputText] = useState("編輯");
  const [darkTheme, setDarkTheme] = useState(false);
  const [storeName, setStoreName] = useState("ICYGANG");
  const divRef = useRef(null);
  const inputFileRef = useRef(null);

  const drawCanvas = (screenshotCanvas) => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = screenshotCanvas.width + 200;
    canvas.height = screenshotCanvas.height + 200;
    ctx.shadowBlur = 80;
    // if (darkTheme === false) {
    //   ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    // } else {
    //   ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    // }
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    ctx.drawImage(screenshotCanvas, 100, 100);
    const dataURL = canvas.toDataURL();
    setCanvasPreview(dataURL);
  };

  const handleExport = async () => {
    const screenshotCanvas = await html2canvas(divRef.current, {
      backgroundColor: null,
    });
    drawCanvas(screenshotCanvas);
  };

  const handleTheme = () => {
    if (darkTheme === false) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDarkTheme(!darkTheme);
    // FIXME: handleExport() use the old `darkTheme` state to set the shadow color.
  };

  const onImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onImageUploadBtnClick = () => {
    inputFileRef.current.click();
  };

  const handleStoreNameChange = () => {
    if (storeName === "ICYGANG") {
      setStoreName("ONLY4GOAT");
    } else {
      setStoreName("ICYGANG");
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-slate-100 flex flex-col items-center space-y-8 pt-24">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={process.env.PUBLIC_URL + "/logo512.png"}
            alt="icygang logo"
            className="h-16 w-16"
          />
          <h1 className="text-2xl text-slate-900 tracking-widest">
            商品卡片產生器
          </h1>
        </div>
        <div className="p-1 border-gray-400 border-2 border-dashed rounded-lg w-60 h-36 flex justify-center items-center">
          {canvasPreview ? (
            <img src={canvasPreview} alt="preview" className="max-h-full" />
          ) : (
            <span className="text-gray-400 text-sm tracking-widest">
              圖片預覽區
            </span>
          )}
        </div>
        <div ref={divRef}>
          <div className="bg-white dark:bg-slate-800 rounded-lg flex w-56 h-24 overflow-hidden">
            <input
              type="file"
              hidden
              ref={inputFileRef}
              accept="image/*"
              onChange={onImageChange}
            />
            <div className="w-1/2 h-full overflow-y-hidden flex items-center" onClick={onImageUploadBtnClick}>
              <img
                src={
                  imageUrl
                    ? imageUrl
                    : process.env.PUBLIC_URL + "/image/upload.png"
                }
                alt="product"
                className="w-full"
              />
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-center px-2">
              <span className="font-semibold tracking-wider text-slate-900 dark:text-white">
                {storeName}
              </span>
              <span
                contentEditable="true"
                className="font-normal tracking-wider text-slate-900 dark:text-slate-200 text-center leading-4 break-all text-sm"
                onClick={() => setInputText("")}
              >
                {inputText}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleTheme}
            className="border-slate-500 border-2 rounded-lg px-3 py-2 text-slate-500 tracking-widest hover:bg-slate-500  hover:text-white  duration-300"
          >
            切換顏色
          </button>
          <button
            onClick={handleExport}
            className="border-slate-500 border-2 rounded-lg px-3 py-2 text-slate-500 tracking-widest hover:bg-slate-500  hover:text-white dark:hover:text-slate-500 duration-300"
          >
            產生圖片
          </button>
          <button
            onClick={handleStoreNameChange}
            className="border-slate-500 border-2 rounded-lg px-3 py-2 text-slate-500 tracking-widest hover:bg-slate-500  hover:text-white dark:hover:text-slate-500 duration-300"
          >
            切換商店
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
